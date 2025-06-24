import React from 'react';
import { featureData } from '../data/data';

const Feature = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
      {featureData.map((item, index) => (
        <div
          key={index}
          className="p-6 shadow-lg shadow-slate-100 dark:shadow-slate-800 transition duration-500 rounded-2xl"
        >
          <div className="size-16 bg-violet-600/5 text-violet-600 rounded-2xl flex align-middle justify-center items-center shadow-sm">
            <i className={`text-3xl ${item.icon}`}></i>
          </div>

          <div className="content mt-6">
            <a
              href="#!"
              className="text-lg hover:text-violet-600 dark:text-white dark:hover:text-violet-600 transition-all duration-500 ease-in-out font-semibold"
            >
              {item.title}
            </a>
            <p className="text-slate-400 mt-3">{item.desc}</p>

            <div className="mt-3">
              <a
                href="#!"
                className="hover:text-violet-600 dark:hover:text-violet-600 after:bg-violet-600 dark:text-white transition duration-500"
              >
                Read More <i className="mdi mdi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
