import './App.css';
import './index.css';
import React, { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { themeChange } from 'theme-change'
// import checkAuth from '../../dump/teacher/Auth';
import initializeApp from '../app/init';
import PrivateRoutes from './middleware/PrivateRoutes';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))
initializeApp()



function App() {


    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/documentation" element={<Documentation />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="*" element={<Layout />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
