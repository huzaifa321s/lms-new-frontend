import React from 'react';
import { teamData } from '../data/data';

const TeamSection = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
      {teamData.slice(0, 4).map((item, index) => (
        <div key={index} className="group text-center">
          <div className="relative inline-block mx-auto rounded-full overflow-hidden">
            <img src={item.image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>

            <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500 flex justify-center">
              {item.social.map((el, idx) => (
                <li key={idx} className="inline mx-[2px]">
                  <a
                    href="#!"
                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-violet-600 text-white rounded-full"
                    aria-label="btn"
                  >
                    <i data-feather={el} className="size-4"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="content mt-3">
            <a
              href="#!"
              className="text-lg font-medium hover:text-violet-600 duration-500"
            >
              {item.name}
            </a>
            <p className="text-slate-400">{item.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
