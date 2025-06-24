// All components mapping with path for internal routes

import { lazy } from 'react'


const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Team = lazy(() => import('../pages/protected/Team'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))

const Blogs = lazy(() => import('../pages/protected/Blogs'))
const BlogForm = lazy(() => import('../pages/protected/BlogForm'))
const BlogCategory = lazy(() => import('../pages/protected/settings/BlogCategory'))

const Courses = lazy(() => import('../pages/protected/Courses'))
const CourseDetails = lazy(() => import('../pages/protected/CourseDetails'))
const CourseForm = lazy(() => import('../pages/protected/CourseForm'))
const CourseCategory = lazy(() => import('../pages/protected/settings/CourseCategory'))

const Teachers = lazy(() => import('../pages/protected/Teachers'))
const TeacherDetails = lazy(() => import('../pages/protected/TeacherDetails'))

const Students = lazy(() => import('../pages/protected/Students'))
const StudentDetails = lazy(() => import('../pages/protected/StudentDetails'))

const TrainingWheelGame = lazy(() => import('../pages/protected/games/TrainingWheelGame'))
const TrainingWheelGameForm = lazy(() => import('../pages/protected/games/TrainingWheelGameForm'))
const GameCategory = lazy(() => import('../pages/protected/settings/GameCategory'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/courses', // the url
    component: Courses, // view rendered
  },
  {
    path: '/courses/:id', // the url
    component: CourseDetails, // view rendered
  },
  {
    path: '/courses/edit/:id', // the url
    component: CourseForm, // view rendered
  },
  {
    path: '/blogs', // the url
    component: Blogs, // view rendered
  },
  {
    path: '/blogs/create', // the url
    component: BlogForm, // view rendered
  },
  {
    path: '/blogs/edit/:id', // the url
    component: BlogForm, // view rendered
  },
  {
    path: '/teachers', // the url
    component: Teachers, // view rendered
  },
  {
    path: '/teachers/:id', // the url
    component: TeacherDetails, // view rendered
  },
  {
    path: '/students', // the url
    component: Students, // view rendered
  },
  {
    path: '/students/:id', // the url
    component: StudentDetails, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/blog-category',
    component: BlogCategory,
  },
  {
    path: '/course-category',
    component: CourseCategory,
  },
  {
    path: '/game-category',
    component: GameCategory,
  },
  {
    path: '/settings-billing',
    component: Bills,
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
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
