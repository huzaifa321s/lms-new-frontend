import axios from "axios"
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const location = useLocation();
    const { pathname, search } = location;
    
    const TOKEN = useSelector((state) => state.studentAuth.token);
    const credentials = useSelector((state) => state.studentAuth.credentials);



    if (TOKEN && credentials) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

        axios.interceptors.request.use(function (config) {
            if (config.skipInterceptors) { return config; }
            document.body.classList.add('loading-indicator');
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            if (response.config.skipInterceptors) { return response; }
            document.body.classList.remove('loading-indicator');
            return response;
        }, function (error) {
            if (error.config.skipInterceptors) { return Promise.reject(error); }
            document.body.classList.remove('loading-indicator');
            return Promise.reject(error);
        });


        // Scenario 1: Subscribed
        if (credentials.subscription && credentials.subscription !== 'canceled') {

            const { status } = credentials.subscription;

            // // Scenario 2: Payment failed
            // if (status === 'past_due') {
            //     return <Navigate to="/student/welcome" replace />
            // }

            // // Scenario 3: Subscription activated
            // if (status === 'active') {
            //     return <Outlet />
            // }

            return <Outlet />;
        }

        // Scenario 4: Not subscribed + Resubscribing
        if (credentials.customerId) {
            return <Navigate to="/student/resubscription-plans" replace />
        }

        // Scenario 5: Not subscribed + Subscribe (for the first time)
        return <Navigate to="/student/subscription-plans" replace />
    }

    // return <Navigate to={`/student/login?redirectto=${pathname+search}`} />
    return <Navigate to='/student/login' />
};
// };

export default PrivateRoutes;