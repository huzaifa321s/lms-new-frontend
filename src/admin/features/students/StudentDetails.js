import React, { useCallback, useEffect, useState } from 'react'
import { setPageTitle } from '../common/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Show } from '../../../shared/utils/Show';
import { formatDate, unixToLocaleStr } from '../../../shared/utils/helperFunction';
import { calculateDateAfter30Days } from '../../../shared/utils/helperFunction';

// Contants
const defaultProfile = "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg?w=826";

// const enrolledCourses = [
//   {
//     id: 1,
//     title: 'Introduction to Cosmos',
//     description: 'An introduction to cosmical entitles',
//     instructor: 'Karl Anthony',
//     category: 'Space Science',
//     enrolledDate: '2023-02-14',
//   },
//   {
//     id: 2,
//     title: 'Life on Mars',
//     description: 'Can human live on mars? A brief study on planet red.',
//     instructor: 'Howard Stark',
//     category: 'Space Science',
//     enrolledDate: '2023-04-09',
//   },
//   {
//     id: 3,
//     title: 'Data Science',
//     description: 'Begginer friendly course.',
//     instructor: 'David Gambel',
//     category: 'Computer Science',
//     enrolledDate: '2023-06-19',
//   },
//   {
//     id: 4,
//     title: 'Exploring Black Holes',
//     description: 'A journey into the mysterious world of black holes.',
//     instructor: 'Stephen Hawking',
//     category: 'Astrophysics',
//     enrolledDate: '2023-08-10',
//   },
// ];




const StudentDetails = () => {


  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  // Courses pagination
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // API methods
  const getStudent = useCallback(async () => {
    try {
      let response = await axios.get(`/admin/student/getStudent/${id}`, {});
      response = response.data;

      if (response.success) {
        const { student, activePlan } = response.data;
        setStudent(student);
        if (activePlan) {
          setCurrentPlan(activePlan)
        }
      }

    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error(errorMessage);
    }
  },[axios,id])

  const getEnrolledCourses = useCallback(async (pageNumber = 1) => {
    setPage(pageNumber);

    let queryStr = `page=${pageNumber}&studentId=${id}`;
    if (q !== "") queryStr += `&q=${q}`;

    try {
      let response = await axios.get(`/admin/student/get-enrolled-courses?${queryStr}`);
      response = response.data;
      if (response.success) {
        const { courses, totalPages } = response.data;
        setEnrolledCourses(courses)
        setTotalPages(totalPages)
      }
    } catch (error) {
      console.log("Registration Error -> ", error);
    }
  },[id,axios]);


  // Search & Pagination (get from teacherdetails file)
  const search = () => {
    getEnrolledCourses();
  }

  const handlePageChange = (page) => {
    getEnrolledCourses(page);
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
    getStudent();
    getEnrolledCourses();
  }, [])

  return (
    <div>

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          Student Details
        </div>
        <button className='btn' onClick={() => navigate('/admin/students')}>
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
                  <img src={student?.profile ? `${process.env.REACT_APP_STORAGE_BASE_URL}/student/profile/${student.profile}` : defaultProfile} />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold">{student?.firstName} {student?.lastName}</h2>
              <p>
                {student?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
              </p>
            </div>
          </div>

          <div className='card w-full bg-base-100 shadow-xl'>
            <div className="card-body">
              <div className='flex justify-center'>
                <h2 className="card-title font-bold">Current Plan</h2>
              </div>
              <div className='mt-4'>
                <div>
                  <Show>
                    <Show.When isTrue={currentPlan && currentPlan?.status === 'active'}>
                      <div className='flex justify-between w-full'>
                        <span className='flex gap-2 text-[18px] items-center font-bold'>
                          <span style={{ backgroundColor: currentPlan?.color }} className={`badge text-white p-3 rounded-none`}>
                            {currentPlan?.name}
                          </span>
                          Plan
                        </span>
                        <span className='text-3xl font-bold'> {currentPlan?.price}</span>
                      </div>

                      <div className='text-gray-500 font-semibold text-[15px]'>
                        Member since {formatDate(currentPlan?.createdAt, 'month-year')}
                      </div>

                      <div className='mt-4 text-gray-500 text-[15px] font-semibold'>
                        Next Payment
                      </div>
                      <div className='text-[18px] font-semibold'>
                        {unixToLocaleStr(currentPlan?.currentPeriodEnd)}
                        {/* {formatDate(currentPlan?.nextInvoiceDate)} */}
                      </div>



                    </Show.When>

                    <Show.Else>
                      No Subscription plan is taken right now.
                    </Show.Else>
                  </Show>
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
                  <div className='w-1/2 '>{student?.email || '—'}</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Phone</div>
                  <div className='w-1/2 '>{student?.phone || '421-2212-21'}</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 font-semibold'>Age</div>
                  <div className='w-1/2 '> {student?.age || '36'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className='card w-full bg-base-100 shadow-xl h-[500px]'>
            <div className="card-body">

              <div className='flex justify-between'>
                <h2 className="card-title font-bold">Enrolled Courses</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70" onClick={() => search()} >
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>

              <div className="overflow-x-auto mt-4">
                <Show>
                  <Show.When isTrue={enrolledCourses.length > 0}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Instructor</th>
                          <th>Category</th>
                          <th>Enrolled Date</th>
                          <th>Actions</th>
                        </tr>
                        
                      </thead>
                      <tbody>
                        {enrolledCourses.map((ec, k) => {
                          return (
                            <tr key={k}>
                              <th>{((page - 1) * 4) + k + 1}</th>
                              <td>{ec.name?.length > 40 ? ec.name.substring(0, 40) + "..." : ec.name}</td>
                              <td>{ec.description?.length > 40 ? ec.description.substring(0, 40) + "..." : ec.description}</td>
                              <td>{ec.instructor}</td>
                              <td>{ec.category}</td>
                              <td>{formatDate(ec.enrolledDate)}</td>
                              <td>
                                <button className="btn btn-ghost" onClick={() => navigate(`/admin/courses/${ec._id}`)}>
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
                    No enrolled courses.
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



    </div>
  )
}

export default StudentDetails