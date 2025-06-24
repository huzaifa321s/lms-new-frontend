import axios from "axios"
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const TOKEN = useSelector((state) => state.teacherAuth.token);
    const credentials = useSelector((state) => state.teacherAuth.credentials);


    if (TOKEN && credentials) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
        
        axios.interceptors.request.use(function (config) {
            document.body.classList.add('loading-indicator');
            return config
        }, function (error) {
            return Promise.reject(error);
        });
        
        axios.interceptors.response.use(function (response) {
            document.body.classList.remove('loading-indicator');
            return response;
        }, function (error) {
            document.body.classList.remove('loading-indicator');
            return Promise.reject(error);
        });
        
        return <Outlet />
    } 
    
    return <Navigate to="/teacher/login" />
};

export default PrivateRoutes;
