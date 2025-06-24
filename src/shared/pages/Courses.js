import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Show } from '../utils/Show';
import axios from 'axios';
import { isActiveSubscription, checkSubscriptionStatus } from '../utils/helperFunction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { handleCourseEnrollment } from '../../student/features/user/studentAuthSlice';

const defaultCover = "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg";

const Courses = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [queryParameters] = useSearchParams()

    const [createdCourses, setCreatedCourses] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")));
    const [searchInput, setSearchInput] = useState(queryParameters.get("q") || "");

    // Check if Student LoggedIn
    const credentials = useSelector((state) => state.studentAuth.credentials);
    const isLoggedIn = useSelector((state) => state.studentAuth.token) ? true : false;


    // Search & Pagination
    const searchCourses = () => {
        if (searchInput !== "") {
            navigate(`/courses?page=1&q=${searchInput}`)
        } else {
            navigate(`/courses?page=1`)
        }
    }
    const handlePageChange = (page) => {
        if (searchInput !== "") {
            navigate(`/courses?page=${page}&q=${searchInput}`)
        } else {
            navigate(`/courses?page=${page}`)
        }
    }
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 4;
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (startPage > 1) {
            buttons.push(
                <button key="first" className="join-item btn" onClick={() => handlePageChange(1)}>1</button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis-1" className="btn">...</span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis-2" className="btn">...</span>
                );
            }
            buttons.push(
                <button key="last" className="join-item btn" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            );
        }

        return buttons;
    };
    // API Methods
    const getCourses = async () => {
        const pageNumber = queryParameters.get("page");
        const searchQuery = queryParameters.get("q");

        let queryStr = `page=${pageNumber}`
        if (searchQuery) {
            queryStr += `&q=${searchQuery}`;
        }

        try {
            let response = await axios.get(`/web/course/get?${queryStr}`);
            response = response.data;
            if (response.success) {

                const { courses, totalPages } = response.data;
                setCreatedCourses(courses)
                setTotalPages(totalPages)
            }
        } catch (error) {
            console.log("Registration Error -> ", error);
        }
    }

    const enrollCourse = async (id) => {
        if (credentials && !isActiveSubscription(credentials.subscription)) {

            if (checkSubscriptionStatus(credentials.subscription) === 'past_due') {
                toast.error('Subscription expired!');
                return navigate('/student/pay-invoice');
            }

            toast.error('You have no subscription, subscribe some plan to enroll the course!');
            return navigate('/student/subscription-plans');
        } else if (credentials && credentials.remainingEnrollmentCount === 0) {
            return toast.error('You have exceed the limnit of enrolling courses!')
        } else {
            try {
                let response = await axios.post("/student/course/enroll", { courseId: id });
                response = response.data;
                if (response.success) {
                    toast.success('Course enrolled!');
                    const { remainingEnrollmentCount } = response.data;
                    dispatch(handleCourseEnrollment({ id, remainingEnrollmentCount }));
                };
            } catch (error) {
                console.log("Registration Error -> ", error);
            }

        }

    }

    useEffect(() => {
        getCourses();
        setCurrentPage(Number(queryParameters.get("page")) || 1);
    }, [location.search]);




    return (
        <div className='p-6'>
            <div>
                <div className='mb-4 w-full flex justify-between'>
                    <div className='text-2xl font-semibold'>
                        Available Courses
                    </div>
                    <div className='flex gap-4'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                            <kbd className="kbd kbd-sm" onClick={searchCourses}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </kbd>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <Show>
                        <Show.When isTrue={createdCourses.length > 0}>
                            {createdCourses.map((i, k) => {
                                const coverImageUrl = i.coverImage ? `${process.env.REACT_APP_STORAGE_BASE_URL}/courses/cover-images/${i.coverImage}` : defaultCover;
                                return (
                                    <div className="card card-compact bg-base-100 shadow-xl" key={k}>
                                        <figure className="h-[100px]">
                                            <img src={coverImageUrl} alt="Shoes" className="h-[100px] w-full object-cover" />
                                        </figure>
                                        <div className="card-body">
                                            <div className="h-[100px]">
                                                <h2 className="card-title text-2xl">{i.name.length > 40 ? i.name.substring(0, 40) + "..." : i.name}</h2>
                                                <p>{i.description.length > 40 ? i.description.substring(0, 40) + "..." : i.description}</p>
                                            </div>
                                            {(isLoggedIn && !credentials.enrolledCourses.some((c) => c === i._id)) && (<div>
                                                <button onClick={() => enrollCourse(i._id)} className="btn btn-accent float-right">
                                                    Enroll Now
                                                </button>
                                            </div>)}
                                        </div>
                                    </div>
                                )
                            })}
                        </Show.When>
                        <Show.Else>
                            <p>No courses found!</p>
                        </Show.Else>
                    </Show>
                </div>


                <div className='flex justify-center w-11/12' style={{ position: "fixed", bottom: "70px" }}>
                    <div className="join">
                        {currentPage > 1 && <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage - 1)}>«</button>}
                        {renderPaginationButtons()}
                        {currentPage < totalPages && <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage + 1)}>»</button>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Courses