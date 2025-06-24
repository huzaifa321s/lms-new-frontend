import axios from 'axios';
import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SubscriptionPlans = lazy(() => import('../../pages/SubscriptionPlans'))

const SubscriptionPlansRoute = () => {

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
    if (credentials.subscription) {

      const { status } = credentials.subscription;

      // // Scenario 2: Payment failed
      // if (status === 'past_due') {
      //     return <Navigate to="/student/welcome" replace />
      // }

      // // Scenario 3: Subscription activated
      // if (status === 'active') {
      //   return <Navigate to="/student/welcome" replace />
      // }

      return <Navigate to="/student/welcome" replace />
    }

    // Scenario 4: Not subscribed + Resubscribing
    if (credentials.customerId) {
      return <Navigate to="/student/resubscription-plans" replace />
    }

    // Scenario 5: Not subscribed + Subscribe (for the first time)
    return <SubscriptionPlans />
  }

  return <Navigate to="/student/login" />

  // axios.interceptors.request.use(function (config) {
  //   if (config.skipInterceptors) { return config; }
  //   document.body.classList.add('loading-indicator');
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });

  // axios.interceptors.response.use(function (response) {
  //   if (response.config.skipInterceptors) { return response; }
  //   document.body.classList.remove('loading-indicator');
  //   return response;
  // }, function (error) {
  //   if (error.config.skipInterceptors) { return Promise.reject(error); }
  //   document.body.classList.remove('loading-indicator');
  //   return Promise.reject(error);
  // });

  // axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;


  // if (!credentials) {
  //   return <Navigate to="/student/login" replace />;
  // }

  // if (credentials.subscription && credentials.subscription.status === 'active') {
  //   return <Navigate to="/student/welcome" replace />;
  // }

  // if (credentials.subscription && credentials.subscription.status !== 'active') {
  //   return <Navigate to="/student/failed-subscription" replace />;
  // }

  // if (credentials.customerId && !credentials.subscription) {
  //   return <Navigate to="/student/resubscription-plans" replace />;
  // }

  // return <SubscriptionPlans />;
};

export default SubscriptionPlansRoute;
