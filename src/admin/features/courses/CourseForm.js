import React, { useCallback } from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast from 'react-hot-toast';

import { objectToFormData } from "../../../shared/utils/helperFunction";
import { useNavigate, useParams } from 'react-router-dom'
import { Show } from '../../../shared/utils/Show'

const defaultCover = `${process.env.REACT_APP_STORAGE_BASE_URL}/defaults/course-cover.png`;

const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [cover, setCover] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);

  // Only while updating course
  const [removedMaterial, setRemovedMaterial] = useState([]);

  const TEMPLATE_UPDATE_OBJ = {
    coverImage: null,
    name: "",
    description: "",
    category: "",
    material: [{ title: "", description: "", media: "" }],
  }

  const [courseObj, setCourseObj] = useState(TEMPLATE_UPDATE_OBJ);


  // Handle Changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCourseObj({ ...courseObj, [name]: value });
  },[courseObj])

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    // Set display picture.
    const reader = new FileReader();
    reader.onload = (e) => setCover(e.target.result);
    reader.readAsDataURL(file);
    // Set the image file in registerObject
    setCourseObj((obj) => ({ ...obj, coverImage: file }));
  },[]);




  // Materials
  const [numberOfMaterials, setNumberOfMaterials] = useState(1);

  const addMaterial = useCallback(() => {
    const newMaterials = Array.from({ length: numberOfMaterials }, () => (
      { title: "", description: "", media: "" })
    );
    setCourseObj((obj) => ({ ...obj, material: [...obj.material, ...newMaterials] }));
  },[numberOfMaterials]);

  const removeMaterial = useCallback((i) => {
    const updatedMaterials = [...courseObj.material];
    // While updating course
    if (id && updatedMaterials[i]._id) {
      console.log('rm up id obj', updatedMaterials[i])
      const removed = updatedMaterials[i];
      setRemovedMaterial((prev) => ([...prev, removed]))
    }
    updatedMaterials.splice(i, 1);
    setCourseObj((obj) => ({ ...obj, material: updatedMaterials }));
  },[id]);

  const handleMaterialChange = useCallback((i, e) => {

    const { name, value } = e.target;
    const updatedMaterials = [...courseObj.material];
    updatedMaterials[i][name] = value;
    setCourseObj((obj) => ({ ...obj, material: updatedMaterials }));
  },[courseObj]);

  const handleMaterialFileUpload = useCallback((i, e) => {
    const file = e.target.files[0];
    const updatedMaterials = [...courseObj.material];
    updatedMaterials[i].media = file;
    setCourseObj((obj) => ({ ...obj, material: updatedMaterials }));
  },[courseObj]);


  const isCreateButtonDisabled = useCallback(() => {
    if (courseObj.name.trim() === "" || courseObj.description.trim() === "") {
      return true;
    }
    if (courseObj.material.length === 0) {
      return true;
    }
    return courseObj.material.some((m) => m.title.trim() === "" || m.description.trim() === "" || !m.media);
  },[courseObj]);



  // API Methods
  const update = useCallback(async () => {
    courseObj['material_length'] = courseObj.material.length;
    courseObj['removed_material'] = removedMaterial;
    courseObj['removed_material_length'] = removedMaterial.length;

    var formdata = objectToFormData(courseObj);

    try {
      let response = await axios.put(`/admin/course/edit/${id}`, formdata);
      response = response.data;
      if (response.success) {
        toast.success(response.message);
      };
    } catch (error) {
      const errorResponse = error.response.data;
      toast.error(errorResponse.message);

    }
  },[courseObj,removedMaterial,toast]);


  const getCourseCategories = useCallback(async () => {
    try {
      let response = await axios.get("/admin/course-category/getAll");
      response = response.data;
      if (response.success) {
        setCourseCategories(response.data)
      }
    } catch (error) {
      console.log("Registration Error -> ", error);
    }
  },[])

  const getCourse = useCallback(async (id) => {
    try {
      let response = await axios.get(`/admin/course/getCourse/${id}`, {});
      response = response.data;

      if (response.success) {
        let courseDetail = response.data;
        courseDetail = {
          ...courseDetail,
          category: courseDetail.category._id
        }
        setCourseObj(courseDetail);

        if (courseDetail.coverImage) {
          setCover(`${process.env.REACT_APP_STORAGE_BASE_URL}/courses/cover-images/${courseDetail.coverImage}`);
        }
      }

    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error(errorMessage);
    }
  },[])

  useEffect(() => {
      getCourse(id);

    getCourseCategories();
  }, [id])

  return (
    <div>

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          Course Details
        </div>
        <button className='btn' onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </div>

      <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>

        {/* ------------- Course Fields ------------- */}
        <div className="w-1/2 mb-3 flex gap-4">
          <div className="form-control w-full">
            <label className="label label-text text-base-content"> Name </label>
            <input className="input input-bordered w-full" type="text" name='name' value={courseObj.name} onChange={handleChange} />
          </div>

          <div className="w-2/3 mb-3 flex">
            <div className="form-control w-full">
              <label className="label label-text text-base-content"> Category </label>
              <select
                className="select select-bordered w-full" value={courseObj.category}
                onChange={(e) => { setCourseObj(prevState => ({ ...prevState, category: e.target.value, })) }}
              >
                <option> Select category </option>
                {courseCategories.length > 0 && courseCategories.map((category) => (
                  <option key={category._id} value={category._id}> {category.name} </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="">
          <div className="form-control w-full">
            <label className="label label-text text-base-content"> Description </label>
            <textarea className="textarea textarea-bordered w-full" type="text" name='description' value={courseObj.description} onChange={handleChange}></textarea>
          </div>
        </div>



        {/* ------------- Course Cover ------------- */}

        <div className="divider mt-14" ></div>

        <div className="mt-4 mb-2 flex gap-4">
          <div className="flex flex-col gap-3 justify-center">
            <div> Add a cover photo for the course. </div>
            <div>
              <label htmlFor="imageInput" className="btn">{id ? "Change Cover" : "Upload Cover"}</label>
              <input id="imageInput" type="file" className="file-input file-input-bordered file-input-accent" style={{ display: "none" }} onChange={(e) => handleImageUpload(e)} />
            </div>
          </div>

          <img src={cover || defaultCover} alt="Dashwind Admin Template" className="w-10/12 h-96 inline-block rounded-md" />
        </div>





        {/* ------------- Materials ------------- */}
        <div className="divider mt-14" ></div>

        <div className="mb-4 mx-1 flex justify-between">
          <div>
            <span className='font-semibold'>Material</span> (At least one material is required)
          </div>
          <div className='flex gap-2 items-centerjustify-end'>
            <input
              type="number"
              className='number-of-materials input input-bordered input-sm w-24'
              value={numberOfMaterials}
              onChange={(e) => setNumberOfMaterials(Math.max(1, parseInt(e.target.value, 10)))}
            />
            <button className="btn gradiant-btn float-right text-white hover:bg-blue-900  btn-sm" onClick={addMaterial}> Add </button>
          </div>
        </div>

        {courseObj.material.map((material, index) => (
          <div key={index} className="mt-4">
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className="form-control w-full">
                <label className="label label-text text-base-content">Title</label>
                <input className="input input-bordered w-full" type="text" name="title" value={material.title} onChange={(e) => handleMaterialChange(index, e)} />
              </div>

              <div className='flex items-end'>
                <div className='flex items-center gap-2'>
                  <label htmlFor={`material-media-${index}`} className="btn btn-neutral"> {material?.media ? 'Selected' : 'Upload file'} </label>
                  <input id={`material-media-${index}`} type="file" className="file-input file-input-bordered file-input-accent w-1/2 max-w-xs" style={{ display: "none" }} onChange={(e) => handleMaterialFileUpload(index, e)} />
                  <p className="text-sm mt-1">
                    {
                      material.media.length === 0 ? (
                        <>No File Choosen</>
                      ) : (
                        <>
                          {typeof material.media === "string" && (material.media.split('-')[1])}
                          {material.media.name && material.media.name}
                        </>
                      )
                    }

                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-between '>
              <div className={`form-control ${courseObj.material.length !== 1 ? "w-11/12" : "w-full"}`}>
                <label className="label label-text text-base-content"> Description </label>
                <textarea className="textarea textarea-bordered w-full" type="text" name="description" value={material.description} onChange={(e) => handleMaterialChange(index, e)}></textarea>
              </div>
              {courseObj.material.length !== 1 && (<button className="btn btn-outline btn-error self-end ml-2" onClick={() => removeMaterial(index)}> Remove </button>)}
            </div>

            {index !== courseObj.material.length - 1 && <div className='flex justify-center'>  <div className="divider mt-14 w-1/2" ></div>  </div>}
          </div>
        ))}



        <div className="mt-12">
          <button
            className="btn gradiant-btn float-right"
            disabled={isCreateButtonDisabled()}
            onClick={() => update()}
          >
            Update Details
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateForm