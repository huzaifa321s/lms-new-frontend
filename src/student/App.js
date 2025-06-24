import './App.css';
import './index.css';
import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import initializeApp from '../app/init';
import { useSelector } from 'react-redux';
// Middlewares
import PrivateRoutes from './middleware/PrivateRoutes';
import SubscriptionPlansRoute from './middleware/specificRoutes/SubscriptionPlansRoute';
import ResubscribePlansRoute from './middleware/specificRoutes/ResubscribePlansRoute';
// import InvoicesRoute from './middleware/specificRoutes/PaymentFailedRoute';

// import checkAuth from '../../dump/Auth';
// import isSubscribed from '../../dump/Subs';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))
// const Invoices = lazy(() => import('./pages/Invoices'))





// Initializing different libraries
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


                <Route path="/subscription-plans" element={<SubscriptionPlansRoute />} />
                <Route path="/resubscription-plans" element={<ResubscribePlansRoute />} />
                {/* <Route path="/failed-subscription" element={<InvoicesRoute />} /> */}

                {/* <Route path="*" element={<Layout />} /> */}
                <Route element={<PrivateRoutes />}>
                    <Route path="*" element={<Layout />} />
                </Route> 




                {/* ---- To test payment element ----
                <Route path="/payment" element={<Payment />} />
                <Route path="/completion" element={<Completion />} /> */}


            </Routes>
        </>
    )
}

export default App