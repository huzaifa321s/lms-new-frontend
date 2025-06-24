// Public routes
import Home from "../pages/Home";
import Courses from "../pages/Courses";

// Private routes
import QuizPage from "../pages/QuizPage";
import PrivateTemp from "../pages/PrivateTemp";



export const publicRoutes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/courses',
        component: <Courses />
    }
];


export const privateRoutes = [
    {
        path: '/priv-temp',
        component: <PrivateTemp />
    },
    {
        path: '/quiz',
        component: <QuizPage />
    }
];