/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon'
import GlobeAmericasIcon from '@heroicons/react/24/outline/GlobeAmericasIcon'


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/teacher/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/teacher/courses',
    icon: <BookOpenIcon className={iconClasses} />,
    name: 'Courses',
  },
  {
    path: '/teacher/training-wheel-game',
    icon: <PuzzlePieceIcon className={iconClasses} />,
    name: 'Training Wheel Game', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu: [
      {
        path: '/teacher/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Profile Setting', // name that appear in Sidebar
      },
    ]
  },




  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <PuzzlePieceIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Games', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/teacher/training-wheel-game', //url
  //       icon: <GlobeAmericasIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Training Wheel Game', // name that appear in Sidebar
  //     },
  //   ]
  // },
  // {
  //   path: '/teacher/leads', // url
  //   icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
  //   name: 'Leads', // name that appear in Sidebar
  // },
  // {
  //   path: '/teacher/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
  //   name: 'Transactions', // name that appear in Sidebar
  // },
  // {
  //   path: '/teacher/charts', // url
  //   icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },
  // {
  //   path: '/teacher/integration', // url
  //   icon: <BoltIcon className={iconClasses}/>, // icon component
  //   name: 'Integration', // name that appear in Sidebar
  // },
  // {
  //   path: '/teacher/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu : [
  //     // {
  //     //   path: '/login',
  //     //   icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //     //   name: 'Login',
  //     // },
  //     // {
  //     //   path: '/register', //url
  //     //   icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //     //   name: 'Register', // name that appear in Sidebar
  //     // },
  //     // {
  //     //   path: '/forgot-password',
  //     //   icon: <KeyIcon className={submenuIconClasses}/>,
  //     //   name: 'Forgot Password',
  //     // },
  //     {
  //       path: '/teacher/blank',
  //       icon: <DocumentIcon className={submenuIconClasses}/>,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/teacher/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
  //       name: '404',
  //     },
  //   ]
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/teacher/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/teacher/features',
  //       icon: <TableCellsIcon className={submenuIconClasses}/>, 
  //       name: 'Features',
  //     },
  //     {
  //       path: '/teacher/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
  //       name: 'Components',
  //     }
  //   ]
  // },

]

export default routes


