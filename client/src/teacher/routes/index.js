// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))

const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))

// Courses
const Courses = lazy(() => import('../pages/protected/courses/Courses'))
const CourseForm = lazy(() => import('../pages/protected/courses/CreateForm'))
const CourseDetails = lazy(() => import('../pages/protected/courses/CourseDetails'))
const CourseStudents = lazy(() => import('../pages/protected/courses/CourseStudents'))

// Games
const TrainingWheelGame = lazy(() => import('../pages/protected/games/TrainingWheelGame'))
const TrainingWheelGameForm = lazy(() => import('../pages/protected/games/TrainingWheelGameForm'))


const routes = [
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/courses', // the url
    component: Courses, // view rendered
  },
  {
    path: '/courses/create', // the url
    component: CourseForm, // view rendered
  },
  {
    path: '/courses/:id', // the url
    component: CourseDetails, // view rendered
  },
  {
    path: '/courses/get-enrolled-students', // the url
    component: CourseStudents, // view rendered
  },
  {
    path: '/courses/edit/:id', // the url
    component: CourseForm, // view rendered
  },
  {
    path: '/training-wheel-game', // the url
    component: TrainingWheelGame, // view rendered
  },
  {
    path: '/training-wheel-game/create', // the url
    component: TrainingWheelGameForm, // view rendered
  },
  {
    path: '/training-wheel-game/edit/:id', // the url
    component: TrainingWheelGameForm, // view rendered
  },















  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
