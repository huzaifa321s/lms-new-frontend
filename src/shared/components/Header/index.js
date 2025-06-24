import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { handleLogout } from '../../../student/features/user/studentAuthSlice';
import { Show } from '../../utils/Show';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const  logoutUser = useCallback(() =>{
        // window.location.href = '/teacher/login'
        dispatch(handleLogout());
        navigate('/student/login');
    },[])

    const credentials = useSelector((state) => state.studentAuth.credentials);
    const isLoggedIn = useSelector((state) => state.studentAuth.token) ? true : false;

    return (
        <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">


            {/* Menu toogle for mobile view or small screen */}
            <div className="flex-1">
                <label htmlFor="left-sidebar-drawer" className="btn gradiant-btn float-right drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5" /></label>
                {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
            </div>



            <div className="flex-none mr-3">
                {/* Profile icon, opening menu on click */}
                <Show>
                    <Show.When isTrue={isLoggedIn}>
                        <ul className='flex gap-4 items-center font-semibold'>
                            <li><NavLink to={'/quiz'}>Quiz</NavLink></li>
                            <li><NavLink to={'/courses'}>Courses</NavLink></li>
                            <li>
                                <button className='btn btn-accent' onClick={() => navigate('/student/welcome')}>
                                    Go to Dashboard
                                </button>
                            </li>
                            <li className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        <img src={credentials?.profile ? `${process.env.REACT_APP_STORAGE_BASE_URL}/student/profile/${credentials?.profile}` : 'https://placeimg.com/80/80/people'} alt="profile" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={logoutUser}>Logout</a></li>
                                </ul>
                            </li>

                        </ul>
                    </Show.When>

                    <Show.Else>
                        <ul className='flex gap-4  font-semibold'>
                            <li><NavLink to={'/courses'}>Courses</NavLink></li>
                            <li><NavLink to={'/student/login'}>Login</NavLink></li>
                            <li><NavLink to={'/student/register'}>Register</NavLink></li>
                        </ul>
                    </Show.Else>
                </Show>


            </div>
        </div>
    )
}

export default Header