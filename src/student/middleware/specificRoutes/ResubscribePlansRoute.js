import axios from 'axios';
import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ResubscribePlans = lazy(() => import('../../pages/ResubscribePlans'))

const ResubscribePlansRoute = () => {

  const TOKEN = useSelector((state) => state.studentAuth.token);
  const credentials = useSelector((state) => state.studentAuth.credentials);

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
  axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;



  if (!credentials) {
    return <Navigate to="/student/login" replace />;
  }

  if (credentials.subscription && credentials.subscription.status === 'active') {
    return <Navigate to="/student/welcome" replace />;
  }

  // Scenario 2: Subscription isn't active.
  if (credentials.subscription && credentials.subscription.status !== 'active') {
    return <Navigate to="/student/failed-subscription" replace />;
  }

  if (!credentials.customerId && !credentials.subscription) {
    return <Navigate to="/student/subscription-plans" replace />;
  }

  // Resubscribe scenario


  return <ResubscribePlans />;
};

export default ResubscribePlansRoute;
