import React, { useCallback, useEffect, useState } from 'react'
import CourseCategoryFormModal from './components/CourseCategoryFormModal'
import axios from 'axios'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Show } from '../../../../shared/utils/Show';


function CourseCategory() {

  const navigate = useNavigate();
  const location = useLocation();
  const [queryParameters] = useSearchParams()

  const [tempObj, setTempObj] = useState(null);
  const [categories, setCategories] = useState([]);

  const [actionType, setActionType] = useState("add");

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")));
  const [searchInput, setSearchInput] = useState(queryParameters.get("q") || "");


  const searchCourseCategories = () => {
    if (searchInput !== "") {
      navigate(`/admin/course-category?page=1&q=${searchInput}`)
    } else {
      navigate(`/admin/course-category?page=1`)
    }
  };


  // Handle Pagination
  const handlePageChange = (page) => {
    if (searchInput !== "") {
      navigate(`/admin/course-category?page=${page}&q=${searchInput}`)
    } else {
      navigate(`/admin/course-category?page=${page}`)
    }
  };

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

  // Handle Modal
  const openModal = (action, obj = null) => {
    if (action === "add") {
      setActionType("add");
      setTempObj({ name: "" })
    }
    if (action === "edit") {
      setActionType("edit");
      setTempObj(obj)
    }
    if (action === "del") {
      setActionType("del");
      setTempObj(obj)
    }
    if (action === "confirmDel") {
      setActionType("confirmDel");
      setTempObj({ ...obj, deleteConfirmed: "Yes" })
    }


    document.getElementById('CourseCategoryFormModal').showModal();
  };

  const closeModal = () => {
    document.getElementById('CourseCategoryFormModal').close(); // Close the modal
  };


  // API methods:
  const addCategory = useCallback(async (obj) => {
    if (obj.name.trim() === "") {
      return console.log("Enter Category!")
    } else {
      try {
        let response = await axios.post("/admin/course-category/add", obj);
        response = response.data;
        if (response.success) {
          getCourseCategories();
        };
      } catch (error) {
        console.log("Add Category Error -> ", error);
      } finally {
        closeModal();
      }
    }
  },[axios]);

  const editCategory = useCallback(async (obj) => {
    if (obj.name.trim() === "") {
      return console.log("Enter Category!")
    } else {
      try {
        let response = await axios.put(`/admin/course-category/edit/${obj._id}`, obj);
        response = response.data;
        if (response.success) {
          const updatedCategory = response.data;
          setCategories((prevCategories) => {
            const index = prevCategories.findIndex(c => c._id === obj._id);

            if (index !== -1) {
              const newCategories = [...prevCategories];
              newCategories[index] = updatedCategory;
              return newCategories;
            }

            return prevCategories;
          });
        };
      } catch (error) {
        console.log("Add Category err data-> ", error);
      } finally {
        closeModal();
      }
    }
  },[axios]);

  const deleteCategory = useCallback(async (obj) => {
    try {
      let response = await axios.delete(`/admin/course-category/delete/${obj._id}`, { data: obj });
      response = response.data;
      if (response.success) {
        getCourseCategories();
        closeModal();
      }
    } catch (error) {
      const errorResponse = error.response.data;
      if (errorResponse.message === 'This category contains courses, so cannot be deleted!') {
        closeModal();
        openModal("confirmDel", obj)
      }
    }
  },[axios]);


  // Get API
  const getCourseCategories = useCallback(async () => {
    const pageNumber = queryParameters.get("page");
    const searchQuery = queryParameters.get("q");

    let queryStr = `page=${pageNumber}`
    if (searchQuery) {
      queryStr += `&q=${searchQuery}`;
    }

    try {
      let response = await axios.get(`/admin/course-category/get?${queryStr}`);
      response = response.data;
      if (response.success) {
        const { courseCategories, totalPages } = response.data;
        setCategories(courseCategories)
        setTotalPages(totalPages)
      }
    } catch (error) {
      console.log("Registration Error -> ", error);
    }
  },[queryParameters,axios]);

  useEffect(() => {
    getCourseCategories();
    setCurrentPage(Number(queryParameters.get("page")) || 1);
  }, [location.search]);

  return (
    <div>
      {/* Modal */}
      <CourseCategoryFormModal
        ModalId={"CourseCategoryFormModal"}
        actionType={actionType}
        add={addCategory}
        edit={editCategory}
        del={deleteCategory}
        closeModal={closeModal}
        obj={tempObj}
      />

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          Course Categories
        </div>
        <div className='flex gap-4'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
            <kbd className="kbd kbd-sm" onClick={searchCourseCategories}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </kbd>
          </label>
          <button
            className="btn btn-active"
            onClick={() => openModal("add")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>

      <div className='card  w-full bg-base-100 shadow-xl h-[80vh]'>
        <div className="card-body" style={{ position: "relative" }}>
          <div className="overflow-x-auto w-full ">
            <Show>
              <Show.When isTrue={categories.length > 0}>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th >Name</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      categories.map((l, k) => {
                        return (
                          <tr key={k}>
                            <td className='w-full'>{l.name}</td>
                            <td className='flex'>
                              <button
                                className='btn btn-ghost'
                                onClick={() => openModal("edit", l)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                              <button
                                className='btn btn-ghost'
                                onClick={() => openModal("del", l)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
                <div className='m-4'>No blogs categories to show.</div>
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

export default CourseCategory