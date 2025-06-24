import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Dashboard() {

    const navigate = useNavigate();

    const [card, setCard] = useState({
        points: 0,
        myCoursesCount: 0,
        enrolledStudentsCount: 0,
        studentsEnrolledThisWeek: 0,
    })

    const [dounutData, setDounutData] = useState({
        courseLabels: [],
        studentsCount: [],
        borderColor: [],
        backgroundColor: []
    })

    const [monthlyEnrollments, setMonthlyEnrollments] = useState({
        monthlyCounts: [],
        pastSixMonths: []
    });

    // Methods
    const getCards = useCallback(async () => {
        try {
            let response = await axios.get(`/teacher/dashboard/cards`);
            response = response.data;
            if (response.success) {
                setCard(response.data)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[axios])

    const getCoursesByStudents = useCallback(async () => {
        try {
            let response = await axios.get(`/teacher/dashboard/courses-by-students`);
            response = response.data;
            if (response.success) {
                setDounutData(response.data)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[axios]);

    const getMonthlyEnrolledStudents = useCallback(async () => {
        try {
            let response = await axios.get(`/teacher/dashboard/monthly-enrolled-students`);
            response = response.data;
            if (response.success) {
                setMonthlyEnrollments(response.data)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[axios]);

    useEffect(() => {
        getCards();
        getCoursesByStudents();
        getMonthlyEnrolledStudents();
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
                        <div className='stat-figure'><CreditCardIcon className='w-8 h-8' /></div>
                        <div className="stat-title">Points</div>
                        <div className="stat-value">{card.points}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>Per enrollment you'll earn 10 points!</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 mt-6 md:grid-cols-2 grid-cols-1 gap-6 ">
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><BookOpenIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Created Courses</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.myCoursesCount}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>No. of Courses I Created</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><UserGroupIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Students</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.enrolledStudentsCount}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>No. of Students Enrolled</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-[#2279E3]`}><UserGroupIcon className='w-8 h-8' /></div>
                        <div className="stat-title dark:text-slate-300">Students this Week</div>
                        <div className={`stat-value dark:text-slate-300 text-[#2279E3]`}>{card.studentsEnrolledThisWeek}</div>
                        <div className={"stat-desc mt-2 font-bold text-green-700 dark:text-green-300"}>No. of Students Enrolled this Week</div>
                    </div>
                </div>
            </div>


            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <BarChart monthlyEnrollments={monthlyEnrollments} />
                <DoughnutChart dounutData={dounutData} />

            </div>

        </div>
    )
}

export default Dashboard