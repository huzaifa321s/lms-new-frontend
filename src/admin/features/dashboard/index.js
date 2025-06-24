import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import DoughnutChart from './components/DoughnutChart';
import UserChannels from '../../../student/features/dashboard/components/UserChannels';


function Dashboard() {

    const navigate = useNavigate();

    const [card, setCard] = useState({
        totalBlogs: 0,
        totalCourses: 0,
        totalTeachers: 0,
        totalStudents: 0,
        teachersRegisteredLastWeek: 0,
        studentsRegisteredLastWeek: 0
    })

    // Methods
    const getCards = useCallback( async () => {
        try {
            let response = await axios.get(`/admin/dashboard/cards`);
            response = response.data;
            if (response.success) {
                setCard(response.data)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[axios]);




    useEffect(() => {
        getCards();
    }, []);

    return (
        <div>
            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Dashboard
                </div>
            </div>

            <div className="grid lg:grid-cols-4 mt-6 md:grid-cols-2 grid-cols-1 gap-6 ">
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><BookOpenIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Total Courses</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.totalCourses}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Total created Courses</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><UserGroupIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Total Users</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.totalTeachers + card.totalStudents}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Teachers + Students</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><UserGroupIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Total Blogs</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.totalBlogs}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Posted on Web</div>
                    </div>
                </div>
            </div>


            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">



                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Total Teachers</div>
                        <div className="stat-value">{card.totalTeachers}</div>
                        <div className="stat-actions">
                            <button className="btn btn-xs" onClick={() => navigate('/admin/teachers')} >View all</button>
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">This Week</div>
                        <div className="stat-value">{card.teachersRegisteredLastWeek}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Joined this week</div>
                    </div>
                </div>


                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Total Students</div>
                        <div className="stat-value">{card.totalStudents}</div>
                        <div className="stat-actions">
                            <button className="btn btn-xs" onClick={() => navigate('/admin/students')}>View all</button>
                        </div>
                    </div>

                    <div className="stat">
                    <div className="stat-title">This Week</div>
                        <div className="stat-value">{card.studentsRegisteredLastWeek}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Registered this week</div>
                    </div>
                </div>
            </div>




            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart totalTeachers={card.totalTeachers} totalStudents={card.totalStudents} />

            </div>




        </div>
    )
}

export default Dashboard