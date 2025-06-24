import React from 'react';
import { Link } from 'react-router-dom'; // using React Router instead of svelte-routing

const CourseGrid = ({ data, grid }) => {
  console.log('data ===>',data);
  return (
    <div className={grid}>
      {data.map((item, index) => (
        <div
          key={index}
          className="group bg-white dark:bg-slate-900 rounded-md shadow-md hover:shadow-lg shadow-slate-100 dark:shadow-slate-800 transition duration-500"
        >
          <div className="p-3 pb-0 relative">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/courses/cover-images/${item.coverImage}`}
                className="group-hover:scale-105 duration-500 w-full"
                alt="fds"
              />
            </div>
            <div className="absolute start-6 top-6 space-x-1">
              <span className="bg-violet-600 text-white text-[12px] px-2.5 py-1 rounded-md h-4">New</span>
              <span className="bg-violet-600 text-white text-[12px] px-2.5 py-1 rounded-md h-4">Popular</span>
            </div>

            
          </div>

          <div className="p-6">
            <div className="flex mb-3">
              <span className="text-slate-400 text-sm flex items-center">
                <i data-feather="book" className="text-slate-900 dark:text-white size-[14px] me-1"></i>
                {item.lessons} Lessons
              </span>
              <span className="text-slate-400 text-sm flex items-center ms-3">
                <i data-feather="users" className="text-slate-900 dark:text-white size-[14px] me-1"></i>
                {item.students} Students
              </span>
            </div>

            <Link to={`course-detail/${item.id}`} className="text-lg hover:text-violet-600 font-medium">
              {item.title}
            </Link>

            <p className="text-slate-400 mt-2">{item.description.substring(0,50) + '...'}</p>

            <div className="flex justify-between mt-3">
              <span className="flex items-center">
                {/* <img
                  src={item.user}
                  className="h-8 w-8 rounded-full shadow shadow-slate-100 dark:shadow-slate-800 me-2"
                  alt=""
                /> */}
                <Link to="" className="hover:text-violet-600 font-medium">{item.name}</Link>
              </span>
              <Link
                to={`course-detail/${item.id}`}
                className="h-8 px-3 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-violet-600/10 hover:bg-violet-600 text-violet-600 hover:text-white text-sm"
              >
                Explore <i className="mdi mdi-arrow-right align-middle ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
