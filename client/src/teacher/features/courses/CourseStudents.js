import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Show } from '../../../shared/utils/Show';

const CourseStudents = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [queryParameters] = useSearchParams();

    const [enrolledStudents, setEnrolledStudents] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")));
    const [searchInput, setSearchInput] = useState(queryParameters.get("q") || "");


    // Search & Pagination
    const searchQuestions = () => {
        if (searchInput !== "") {
            navigate(`/teacher/courses/get-enrolled-students?id=${queryParameters.get("id")}&page=1&q=${searchInput}`)
        } else {
            navigate(`/teacher/courses/get-enrolled-students?id=${queryParameters.get("id")}&page=1`)
        }
    };

    const handlePageChange = (page) => {
        if (searchInput !== "") {
            navigate(`/teacher/courses/get-enrolled-students?id=${queryParameters.get("id")}&page=${page}&q=${searchInput}`)
        } else {
            navigate(`/teacher/courses/get-enrolled-students?id=${queryParameters.get("id")}&page=1`)
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



    // API methods
    const getCourseStudents = useCallback(async () => {
        const courseId = queryParameters.get("id");
        const pageNumber = queryParameters.get("page");
        const searchQuery = queryParameters.get("q");

        let queryStr = `page=${pageNumber}`
        if (searchQuery) {
            queryStr += `&q=${searchQuery}`;
        }

        try {
            let response = await axios.get(`/teacher/course/get-course-students?courseId=${courseId}&${queryStr}`);
            response = response.data;
            if (response.success) {
                const { enrolledStudents, totalPages } = response.data;
                setEnrolledStudents(enrolledStudents);
                setTotalPages(totalPages)
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    },[queryParameters,axios]);


    useEffect(() => {
        getCourseStudents();
        setCurrentPage(Number(queryParameters.get("page")) || 1);
    }, [location.search]);


    return (
        <div>

            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Enrolled Students
                </div>
                <div className='flex gap-4'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                        <kbd className="kbd kbd-sm" onClick={() => searchQuestions()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </kbd>
                    </label>
                    <button className="btn btn-active" onClick={() => navigate(`/teacher/courses/${queryParameters.get("id")}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='card  w-full bg-base-100 shadow-xl h-[80vh]'>
                <div className="card-body" style={{ position: "relative" }}>
                    <div className="overflow-x-auto w-full">
                        <Show>
                            <Show.When isTrue={enrolledStudents.length > 0}>
                                <table className="table w-full">
                                    <thead>
                                        <tr >
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            enrolledStudents.map((es, k) => {
                                                const { student } = es;

                                                return (
                                                    <tr key={k}>
                                                        <td>{student.firstName} {student.lastName}</td>
                                                        <td>{student.email}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Show.When>
                            <Show.Else>
                                <div>
                                    No enrolled students yet!
                                </div>
                            </Show.Else>
                        </Show>
                    </div>
                </div>




                <div className='flex justify-center w-11/12' style={{ position: "absolute", bottom: "20px" }}>
                    <div className="join">
                        {currentPage > 1 && (
                            <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                        )}
                        {renderPaginationButtons()}
                        {currentPage < totalPages && (
                            <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CourseStudents