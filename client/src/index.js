import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import { Provider } from 'react-redux'
import SuspenseContent from './shared/container/SuspenseContent';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './shared/App'
import Admin from './admin/App';
import Teacher from './teacher/App';
import Student from './student/App';
import Home from './shared/pages/Home';
import Courses from './shared/pages/Courses';
import getCoursesData from './student/utils/getCourses';


// Load Stripe.js outside of your component
const stripePromise = loadStripe('pk_test_51P5zAtEdtHnRsYCMJUdZJ5Q6m6KA1LQfPxXsnKweKFvWiSsYMpEG4yRmG5jmzaBo0VBUeQSS5DTSBDDfnzLsiWGu00U3zAzcBU');
const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "",
            loader:getCoursesData,
            element: <Home />,
          },
          {
            path: "/courses",
            element: <Courses />,
            
          }
        ]
      },
      {
        path: "/admin/*",
        element: <Admin />
      },
      {
        path: "/teacher/*",
        element: <Teacher />
      },
      {
        path: "/student/*",
        element: <Student />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Suspense fallback={<SuspenseContent />}>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </Provider>
  </Suspense>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
