/** Icons are imported separatly to reduce build time */
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon'
import GlobeAmericasIcon from '@heroicons/react/24/outline/GlobeAmericasIcon'

import BellIcon from '@heroicons/react/24/outline/BellIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  {
    path: '/admin/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/admin/courses',
    icon: <BookOpenIcon className={iconClasses}/>, 
    name: 'Courses',
  },
  {
    path: '/admin/blogs',
    icon: <PencilSquareIcon className={iconClasses}/>, 
    name: 'Blogs',
  },
  {
    path: '/admin/teachers',
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Teachers',
  },
  {
    path: '/admin/students',
    icon: <UserGroupIcon className={iconClasses}/>, 
    name: 'Students',
  },
  {
    path: '/admin/training-wheel-game',
    icon: <PuzzlePieceIcon className={iconClasses}/>, 
    name: 'Training Wheel Game', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      // {
      //   path: '/admin/settings-profile', //url
      //   icon: <UserIcon className={submenuIconClasses}/>, // icon component
      //   name: 'Profile', // name that appear in Sidebar
      // },
      {
        path: '/admin/blog-category', //url
        icon: <PencilSquareIcon className={submenuIconClasses}/>, // icon component
        name: 'Blog Category', // name that appear in Sidebar
      },
      {
        path: '/admin/course-category', //url
        icon: <BookOpenIcon className={submenuIconClasses}/>, // icon component
        name: 'Course Category', // name that appear in Sidebar
      },
      {
        path: '/admin/game-category', //url
        icon: <PuzzlePieceIcon className={submenuIconClasses}/>, // icon component
        name: 'Game Category', // name that appear in Sidebar
      },
    ]
  },
  
]

export default routes


