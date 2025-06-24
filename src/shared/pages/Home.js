import React from 'react';
import CountUp from 'react-countup';
import { Link, useLoaderData } from 'react-router-dom';

import Navbar from '../components/Navbar';
import PartnerImg from '../components/Partner';
import AboutOne from '../components/About';
import AppFeature from '../components/Feature';
import GridCourse from '../components/Grid-course';
import ExpertTeam from '../components/Team';
import LatestBlog from '../components/Blog';
import FooterOne from '../components/Footer';

import bg from '../../assets/images/bg/bg.png';
import hero from '../../assets/images/hero/1.png';
import hero2 from '../../assets/images/hero/2.png';
import team1 from '../../assets/images/team/1.jpg';
import team2 from '../../assets/images/team/2.jpg';
import team3 from '../../assets/images/team/3.jpg';
import team4 from '../../assets/images/team/4.jpg';
import team5 from '../../assets/images/team/5.jpg';


const teamImg = [team1, team2, team3, team4, team5];

const Home = () => {
  const { data } = useLoaderData();
  
  return (
    <div >
      {/* <Navbar /> */}

      <section
        className="relative overflow-hidden md:h-screen flex items-center py-36 bg-violet-600/5 dark:bg-violet-600/20 bg-center bg-no-repeat bg-cover justify-center p-10"
        style={{ backgroundImage: `url(${bg})` }}
        id="home"
      >
        <div className="container relative">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center">
            <div>
              <h1 className="font-semibold lg:leading-normal leading-normal tracking-wide text-4xl lg:text-5xl mb-5">
                Best <span className="before:block before:absolute before:-inset-2 before:-skew-y-6 before:bg-gradient-to-tl before:from-violet-600 before:to-fuchsia-600 relative inline-block">
                  <span className="relative text-white font-bold">Online</span>
                </span> Courses <br /> From <span className="font-bold">Bruce LMS</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">
                Discover a world of knowledge and opportunities with our online education platform pursue a new career.
              </p>

              <div className="mt-6">
                <Link
                  to="/courses"
                  className="h-12 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-violet-600 text-white"
                >
                  View Courses <i className="mdi mdi-arrow-right align-middle ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="lg:ms-8">
              <div className="relative">
                <img src={hero} className="mx-auto" alt="hero" />

                <div className="overflow-hidden after:content-[''] after:absolute after:size-10 after:bg-violet-600/20 after:top-0 after:start-0 after:-z-1 after:rounded-lg after:animate-[spin_10s_linear_infinite]"></div>

                <div className="absolute md:bottom-16 bottom-12 md:-start-10 -start-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-56 z-2 mover">
                  <h5 className="text-lg font-medium mb-3">Our Instructors</h5>
                  <ul className="list-none relative flex">
                    {teamImg.map((item, index) => (
                      <li key={index} className="inline-block relative -ms-4 first:ms-0 mx-[2px]">
                        <a href="">
                          <img src={item} className="size-10 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt="team member" />
                        </a>
                      </li>
                    ))}
                    <li className="inline-block relative -ms-4">
                      <a href="" className="size-9 table-cell tracking-wide align-middle text-base text-center rounded-full bg-violet-600 text-white hover:z-1 hover:scale-105 transition-all duration-500">
                        <i className="mdi mdi-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="absolute md:top-36 top-28 md:-end-10 -end-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-52 m-3 mover-2">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-14 min-w-14 bg-violet-600/5 text-violet-600 text-center rounded-full me-3">
                      <i data-feather="monitor" className="h-6 w-6"></i>
                    </div>
                    <div className="flex-1">
                      <span className="text-slate-400">Online Course</span>
                      <p className="text-xl font-bold">
                        <CountUp end={100} className="counter-value inline-block" />+
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden absolute md:size-[500px] size-[400px] bg-gradient-to-tl from-violet-600 to-fuchsia-600 bottom-1/2 translate-y-1/2 md:start-0 start-1/2 md:translate-x-0 -translate-x-1/2 -z-1 shadow-md shadow-violet-600/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6">
        <PartnerImg />
      </section>

      <section className="relative md:py-24 py-16 flex-col flex items-center">
        <div className="container relative">
          <AboutOne />
        </div>

        <div className="container relative md:mt-24 mt-16 p-10">
          <div className="grid grid-cols-1 pb-6 text-center">
            <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Discover Powerful Features</h4>
            <p className="text-slate-400 max-w-xl mx-auto">Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
          </div>
          <AppFeature />
        </div>

        <div className="container relative md:mt-24 mt-16 p-10">
          <div className="grid grid-cols-1 pb-6 text-center">
            <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Explore Our Best Courses</h4>
            <p className="text-slate-400 max-w-xl mx-auto">Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
          </div>
          <GridCourse grid="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6" data={data.slice(0, 6)} />
          <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
            <div className="md:col-span-12 text-center">
              <Link to="/courses" className="text-slate-400 hover:text-violet-600 duration-500 ease-in-out">See More Courses <i className="mdi mdi-arrow-right align-middle"></i></Link>
            </div>
          </div>
        </div>

        <div className="container-fluid relative overflow-hidden md:mt-24 mt-16 w-full">
          <div className="bg-violet-600 md:pt-0 pt-16 bg-no-repeat bg-top bg-cover p-28" style={{ backgroundImage: `url(${bg})` }}>
            <div className="container relative">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-6 items-center">
                <div className="lg:col-span-8 md:col-span-7">
                  <div className="md:text-start text-center z-1">
                    <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-white">Subscribe to Newsletter!</h3>
                    <p className="text-white/50 max-w-xl mt-1">Subscribe to get latest updates and information.</p>
                  </div>
                  <div className="mt-4">
                    <form className="relative max-w-full md:max-w-2xl">
                      <input
                        type="email"
                        id="subscribe"
                        name="email"
                        className="pt-4 pe-40 pb-4 ps-6 w-full h-[30px]  md:h-[50px] outline-none text-white rounded-full bg-violet-700 shadow shadow-slate-100/20 dark:shadow-slate-800/20"
                        placeholder="Enter your email :"
                      />
                      <button
                        type="submit"
                        className="h-8 md:h-12  w-24 tracking-wide items-center justify-center font-medium bg-yellow-500 text-white rounded-full absolute text-center right-0"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
                <div className="lg:col-span-4 md:col-span-5">
                  <div className="relative">
                    <img src={hero2} className="mx-auto relative z-2" alt="hero2" />
                    <div className="absolute overflow-hidden size-[350px] bg-gradient-to-tl from-violet-600/20 to-fuchsia-600 bottom-0 translate-x-1/2 start-1/2 ltr:-translate-x-1/2 rtl:md:translate-x-0 rtl:translate-x-1/2 z-1 shadow-md shadow-red-500/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container relative md:mt-24 mt-16 p-10">
          <div className="grid grid-cols-1 pb-6 text-center">
            <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Expert Instructors</h4>
            <p className="text-slate-400 max-w-xl mx-auto">Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
          </div>
          <ExpertTeam />
        </div>

        <div className="container relative md:mt-24 mt-16 p-10">
          <div className="grid grid-cols-1 pb-6 text-center">
            <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Blogs</h4>
            <p className="text-slate-400 max-w-xl mx-auto">Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
          </div>
          <LatestBlog />
        </div>
      </section>

      <FooterOne />
    </div>
  );
};

export default Home;
