import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/helperFunction';
import { Show } from '../../../shared/utils/Show';

const Courses = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [queryParameters] = useSearchParams()

  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")));
  const [searchInput, setSearchInput] = useState(queryParameters.get("q") || "");



  // Search & Pagination
  const searchCourses = () => {
    if (searchInput !== "") {
      navigate(`/admin/courses?page=1&q=${searchInput}`)
    } else {
      navigate(`/admin/courses?page=1`)
    }
  }

  const handlePageChange = (page) => {
    if (searchInput !== "") {
      navigate(`/admin/courses?page=${page}&q=${searchInput}`)
    } else {
      navigate(`/admin/courses?page=${page}`)
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
  const getCourses = useCallback(async () => {
    const pageNumber = queryParameters.get("page");
    const searchQuery = queryParameters.get("q");

    let queryStr = `page=${pageNumber}`
    if (searchQuery) {
      queryStr += `&q=${searchQuery}`;
    }

    try {
      let response = await axios.get(`/admin/course/get?${queryStr}`);
      response = response.data;
      if (response.success) {
        
        const { courses, totalPages } = response.data;
        setCourses(courses)
        setTotalPages(totalPages)
      }
    } catch (error) {
      console.log("Registration Error -> ", error);
    }
  },[queryParameters])


  useEffect(() => {
    getCourses();
    setCurrentPage(Number(queryParameters.get("page")) || 1);
  }, [location.search]);

  return (
    <div>

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold'>
          Courses
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

      <div className='card  w-full bg-base-100 shadow-xl h-[80vh]'>
        <div className="card-body" style={{ position: "relative" }}>
          <div className="overflow-x-auto w-full">
            <Show>
              <Show.When isTrue={courses.length > 0}>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="">Name</th>
                      <th className="">Description</th>
                      <th className="">Instructor</th>
                      <th className="">Category</th>
                      <th className="">Created At</th>
                      <th className="text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((l, k) => {
                      return (
                        <tr key={k}>
                          <td>{l.name}</td>
                          <td>{l.description.length > 50 ? l.description.substring(0, 50) + "..." : l.description}</td>
                          <td>{l.instructor.firstName} {l.instructor.lastName}</td>
                          <td>{l.category.name}</td>
                          <td>{formatDate(l.createdAt)}</td>
                          <td className='text-right'>
                            <button className="btn btn-ghost" onClick={() => navigate(`/admin/courses/${l._id}`)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>

                            </button>
                          </td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
              </Show.When>
              <Show.Else>
                <div className='m-4'>No blogs to show.</div>
              </Show.Else>
            </Show>
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

    </div>
  )
}

export default Courses