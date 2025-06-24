import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react'
import { setPageTitle } from '../common/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const defaultCover = `${process.env.REACT_APP_STORAGE_BASE_URL}/defaults/course-cover.png`;

const baseMaterial = `${process.env.REACT_APP_STORAGE_BASE_URL}/courses/material`;

const CourseDetails = () => {

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


    // API Methods
    const getEnrolledCourse = useCallback( async (id) => {
        try {
            let response = await axios.get(`/student/course/get-enrolled-course/${id}`, {});
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
    },[axios])

    useEffect(() => {
        if (id) {
            getEnrolledCourse(id);
        }
    }, [id])


    return (
        <div>

            {/* Page */}
            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold flex items-center gap-2'>
                    Course Details
                </div>
                <button className='btn' onClick={() => navigate('/student/enrolled-courses')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
            </div>


            <div className='card w-full bg-base-100 shadow-xl mt-2'>

                <figure style={{ position: 'relative' }}>
                    <img src={cover || defaultCover} alt="Dashwind Admin Template" className="w-full h-96 inline-block rounded-t-md object-cover object-center" />
                    <div className="badge badge-primary text-[16px] p-3" style={{ position: 'absolute', right: '8px', bottom: '8px' }}>{courseObj?.category.name}</div>
                </figure>

                <div className='p-6'>
                    <div>
                        <div className='flex justify-between'>
                            <span className='font-semibold text-4xl'>{courseObj?.name}</span>
                            <div className='flex gap-4'>
                                <p><span className='font-semibold'>Instructor:</span> {courseObj?.instructor?.firstName} {courseObj?.instructor?.lastName}</p>


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

export default CourseDetails