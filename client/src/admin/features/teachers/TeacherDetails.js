import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/helperFunction';
import { Show } from '../../../shared/utils/Show';


const defaultProfile = "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg?w=826";


const TeacherDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);

  // States: Search & pagination
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // API methods
  const getTeacher = useCallback(async () => {
    try {
      let response = await axios.get(`/admin/teacher/getTeacher/${id}`, {});
      response = response.data;

      if (response.success) {
        const teacherDetails = response.data;
        setTeacher(teacherDetails);
      }

    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error(errorMessage);
    }
  },[axios,id])

  const getCourses = useCallback(async (pageNumber = 1) => {
    setPage(pageNumber);

    let queryStr = `page=${pageNumber}&teacherId=${id}`;
    if (q !== "") queryStr += `&q=${q}`;

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
  },[id,axios])


  // Methods: Search & Pagination
  const search = () => {
    getCourses();
  }

  const handlePageChange = (page) => {
    getCourses(page);
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 4;
    const startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (startPage > 1) {
      buttons.push(<button key="first" className="join-item btn btn-xs" onClick={() => handlePageChange(1)}>1</button>);
      if (startPage > 2) buttons.push(<span key="ellipsis-1" className="btn btn-xs">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} className={`join-item btn btn-xs ${page === i ? 'btn-active' : ''}`} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-2" className="btn btn-xs">...</span>
        );
      }
      buttons.push(
        <button key="last" className="join-item btn btn-xs" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
      );
    }

    return buttons;
  };



  useEffect(() => {
    getTeacher();
    getCourses();
  }, [])

  return (
    <div>

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          Teacher Details
        </div>
        <button className='btn' onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </div>


      <div className='m-4 grid gird-col-1 gap-4 sm:grid-cols-12'>


        {/* Left side rows (with col-span-3) */}
        <div className='sm:col-span-3 min-h-[100px] rounded-lg'>
          <div className='card w-full bg-base-100 shadow-xl mb-4'>
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="w-40 rounded">
                  <img src={teacher?.profile ? `${process.env.REACT_APP_STORAGE_BASE_URL}/teacher/profile/${teacher.profile}` : defaultProfile} />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold">{teacher?.firstName} {teacher?.lastName}</h2>
              <p>
                {teacher?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
              </p>
            </div>
          </div>

          <div className='card w-full bg-base-100 shadow-xl'>
            <div className="card-body">
              <div className='flex justify-center'>
                <h2 className="card-title font-bold">Skills & Experties</h2>
              </div>
              <div className='mt-4 w-full'>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Qualification</div>
                  <div className='w-1/2 '>{teacher?.qualification || '—'}</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Skills</div>
                  <div className='w-1/2 '>{teacher?.skills || '—'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Right side rows (with col-span-9) */}
        <div className='sm:col-span-9 min-h-[100px] rounded-lg'>
          <div className='card w-full bg-base-100 shadow-xl min-h-[100px] mb-4'>
            <div className="card-body">
              <h2 className="card-title font-bold mb-3">Basic Info</h2>

              <div className='mt-4 w-1/4'>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Email</div>
                  <div className='w-1/2 '>{teacher?.email || '—'}</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Phone</div>
                  <div className='w-1/2 '>{teacher?.phone || '421-2212-21'}</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Age</div>
                  <div className='w-1/2 '> {teacher?.age || '36'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className='card w-full bg-base-100 shadow-xl h-[500px]' style={{ position: "relative" }}>
            <div className="card-body">
              <div className='flex justify-between'>
                <h2 className="card-title font-bold">Courses</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70" onClick={() => search()} >
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>

              <div className="overflow-x-auto mt-4">
                <Show>
                  <Show.When isTrue={courses.length > 0}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.map((c, k) => {
                          return (
                            <tr key={k}>
                              <th>{((page - 1) * 6) + k + 1}</th>
                              <td>{c.name}</td>
                              <td>{c.description}</td>
                              <td>{c.category.name || <div className='w-100 ml-8'>—</div>}</td>
                              <td>{formatDate(c.createdAt)}</td>
                              <td>
                                <button className="btn btn-ghost" onClick={() => navigate(`/admin/courses/${c._id}`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </Show.When>

                  <Show.Else>
                    <div> No courses created yet.</div>
                  </Show.Else>
                </Show>
              </div>
            </div>


            <div className='flex justify-center w-11/12' style={{ position: "absolute", bottom: "20px" }}>
              <div className="join">
                {page > 1 && <button className="join-item btn btn-xs bg-slate-300" onClick={() => handlePageChange(page - 1)}>«</button>}
                {renderPaginationButtons()}
                {page < totalPages && <button className="join-item btn btn-xs bg-slate-300" onClick={() => handlePageChange(page + 1)}>»</button>}
              </div>
            </div>
          </div>
        </div>

      </div>


    </div >
  )
}

export default TeacherDetails