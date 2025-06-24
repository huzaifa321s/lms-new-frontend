import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react'
import { setPageTitle } from '../common/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteCourseModal from './components/DeleteCourseModal'
import { HeroDeleteIcon, HeroEditIcon } from '../../../shared/utils/icons';


const defaultCover = `${process.env.REACT_APP_STORAGE_BASE_URL}/defaults/course-cover.png`;
const baseMaterial = `${process.env.REACT_APP_STORAGE_BASE_URL}/courses/material`;

const CourseDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  console.log('id ===>', id);
  const credentials = useSelector((state) => state.teacherAuth.credentials);

  const TEMPLATE_COURSE_DETAILS = {
    coverImage: null,
    name: "",
    description: "",
    instructor: credentials?._id,
    studentsEnrolled: 0,
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



  // API Methods
  const getCourse = useCallback(async (id) => {
    try {
      let response = await axios.get(`/teacher/course/getCourse/${id}`, {});
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
  }, [axios]);

  const deleteCourse = useCallback(async () => {
    try {
      let response = await axios.delete(`/teacher/course/delete/${id}`);
      response = response.data;
      if (response.success) {
        toast.success(response.message);
        navigate('/teacher/courses');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  }, [axios, id, toast]);



  // Handle clicks
  const handleEditClick = () => {
    navigate(`/teacher/courses/edit/${id}`);
  };

  const handleDeleteClick = () => {
    openModal();
  }


  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, [id])



  return (

    <div>
      {/* Modal */}
      <DeleteCourseModal ModalId={"DeleteCourseModal"} deleteCourse={deleteCourse} closeModal={closeModal} />

      {/* Page */}
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


      <div className='card w-full bg-base-100 shadow-xl mt-2'>

        <img src={cover || defaultCover} alt="Dashwind Admin Template" className="w-full h-96 inline-block rounded-t-md object-cover object-center" />

        <div className='p-6'>
          <div>
            <div className='flex justify-between'>
              <span className='font-semibold text-4xl'>{courseObj?.name}</span>
              <div className='flex'>
                <button onClick={handleEditClick} className="btn btn-ghost">
                  <HeroEditIcon />
                </button>
                <button onClick={handleDeleteClick} className="btn btn-ghost">
                  <HeroDeleteIcon />
                </button>
              </div>
            </div>
            <div className='mt-4 text-lg'>{courseObj?.description}</div>

            <div className='mt-6 flex items-center gap-2'>
              <div className='badge badge-ghost flex gap-1'>
                <div className='font-semibold'>Enrolled Students #</div>
                {courseObj?.studentsEnrolled}
              </div>
              <div className=''>
                <button className="btn btn-xs" onClick={() => {
                  navigate(`/teacher/courses/get-enrolled-students?id=${id}`);
                }}>View Student List</button>
              </div>

            </div>

            {/* <div className="stat">
              <div className="stat-title">No. of Students:</div>
              <div className="stat-value">{courseObj?.studentsEnrolled}</div>
              <div className="stat-actions">
                <button className="btn btn-xs" onClick={() => {
                  navigate(`/teacher/courses/get-enrolled-students?id=${id}`);
                }}>View all</button>
              </div>
            </div> */}
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
    </div >
  )
}

export default CourseDetail