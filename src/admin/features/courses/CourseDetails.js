import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { setPageTitle } from '../common/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteCourseModal from './components/DeleteCourseModal';
import toast from 'react-hot-toast';


const baseMaterial = `${process.env.REACT_APP_STORAGE_BASE_URL}/courses/material`;
const defaultCover = `${process.env.REACT_APP_STORAGE_BASE_URL}/defaults/course-cover.png`;


const CourseDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const TEMPLATE_COURSE_DETAILS = {
    coverImage: null,
    name: "",
    description: "",
    category: "",
    instructor: {},
    material: [{ title: "", description: "", media: "" }],
  }

  const [courseObj, setCourseObj] = useState(TEMPLATE_COURSE_DETAILS);
  const [cover, setCover] = useState(null);


  // Handle Modal 
  const openModal = () => {
    document.getElementById('DeleteCourseModal').showModal();
  };

  const closeModal = () => {
    document.getElementById('DeleteCourseModal').close(); // Close the modal
  };


  // API methods
  const getCourse = useCallback(async (id) => {
    try {
      let response = await axios.get(`/admin/course/getCourse/${id}`, {});
      response = response.data;

      if (response.success) {
        const courseDetail = response.data;
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

  const deleteCourse = useCallback(async () => {
    try {
      let response = await axios.delete(`/admin/course/delete/${id}`);
      response = response.data;
      if (response.success) {
        toast.success(response.message);
        navigate('/admin/courses');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  },[id,toast])

  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, [id])



  return (
    <div>

      <DeleteCourseModal ModalId={"DeleteCourseModal"} deleteCourse={deleteCourse} closeModal={closeModal} />


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


      <div className='card w-full bg-base-100 shadow-xl mt-2' >


        <figure style={{ position: 'relative' }}>
          <img src={cover || defaultCover} alt="Dashwind Admin Template" className="w-full h-96 inline-block rounded-t-md object-cover object-center" />
          <div className="badge badge-primary text-[16px] p-3" style={{ position: 'absolute', right: '8px', bottom: '8px' }}>{courseObj?.category.name}</div>
        </figure>

        <div className='p-6'>
          <div>
            <div className='flex justify-between'>
              <span className='font-semibold text-4xl'>{courseObj?.name}</span>
              <div className='flex gap-2'>
                <p>
                  <span className='font-semibold'>Instructor:</span>
                  <button className="btn btn-link px-1" onClick={() => navigate(`/admin/teachers/${courseObj.instructor?._id}`)}>
                    {courseObj?.instructor?.firstName} {courseObj?.instructor?.lastName}
                  </button>
                </p>
                <div className='flex'>
                  <button onClick={() => navigate(`/admin/courses/edit/${id}`)} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button className="btn btn-ghost" onClick={() => openModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-4 text-lg'>{courseObj?.description}</div>
          </div>






          <div className='flex justify-center'> <div className='divider mt-6'></div> </div>

          <h2 className='font-semibold text-2xl mb-4'>Material</h2>

          <div>
            {courseObj.material.map((m, k) => {
              return (
                <div key={k} className="collapse collapse-arrow bg-base-200 mb-4">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    {m.title}
                  </div>
                  <div className="collapse-content">
                    <p><span className='font-semibold'>Description:</span> {m.description}</p>
                    <div className='btn-link mt-2'>
                      <a href={`${baseMaterial}/${m.media}`} download="default_cover.png" target='_blank'> {m.media} </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CourseDetail