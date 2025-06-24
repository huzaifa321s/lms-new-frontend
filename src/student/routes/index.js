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

const EnrolledCourses = lazy(() => import('../pages/protected/EnrolledCourses'))
const CourseDetails = lazy(() => import('../pages/protected/CourseDetails'))
const InvoiceHistory = lazy(() => import('../pages/protected/InvoiceHistory'))
const PayInvoice = lazy(() => import('../pages/protected/PayInvoice'))

const TrainingWheelGame = lazy(() => import('../pages/protected/games/trainingwheelgame/TrainingWheelGame'))

export const privateRoutes = [
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
    subscriptionRequired: false
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
    subscriptionRequired: true
  },
  {
    path: '/enrolled-courses', // the url
    component: EnrolledCourses, // view rendered
    subscriptionRequired: true
  },
  {
    path: '/enrolled-courses/:id', // the url
    component: CourseDetails, // view rendered
    subscriptionRequired: true
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
    subscriptionRequired: false
  },
  {
    path: '/settings-billing',
    component: Bills,
    subscriptionRequired: false
  },
  {
    path: '/settings-invoice',
    component: InvoiceHistory,
    subscriptionRequired: false
  },
  {
    path: '/training-wheel-game',
    component: TrainingWheelGame,
    subscriptionRequired: true
  },

  {
    path: '/pay-invoice',  // Route for the invoice payment page
    component: PayInvoice,
    requiresSubscription: false,
  },


  // {
  //   path: '/subscription-plans',
  //   component: SubscriptionPlans,
  // },
  // {
  //   path: '/resubscription-plans',
  //   component: SubscriptionPlans,
  // },






  // Not in used.
  {
    path: '/leads',
    component: Leads,
    subscriptionRequired: true
  },
  {
    path: '/settings-team',
    component: Team,
    subscriptionRequired: true
  },
  {
    path: '/calendar',
    component: Calendar,
    subscriptionRequired: true
  },
  {
    path: '/transactions',
    component: Transactions,
    subscriptionRequired: true
  },
  {
    path: '/getting-started',
    component: GettingStarted,
    subscriptionRequired: true
  },
  {
    path: '/features',
    component: DocFeatures,
    subscriptionRequired: true
  },
  {
    path: '/components',
    component: DocComponents,
    subscriptionRequired: true
  },
  {
    path: '/integration',
    component: Integration,
    subscriptionRequired: true
  },
  {
    path: '/charts',
    component: Charts,
    subscriptionRequired: true
  },
  {
    path: '/404',
    component: Page404,
    subscriptionRequired: true
  },
  {
    path: '/blank',
    component: Blank,
    subscriptionRequired: true
  },
];
// export default routes
