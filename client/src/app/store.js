import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../teacher/features/common/headerSlice'
import modalSlice from '../teacher/features/common/modalSlice'
import rightDrawerSlice from '../teacher/features/common/rightDrawerSlice'
import leadsSlice from '../teacher/features/leads/leadSlice'
import teacherAuthSlice from '../teacher/features/user/teacherAuthSlice'
import teacherCourseSlice from '../teacher/features/courses/coursesSlice'
// Admin
import adminAuthSlice from '../admin/features/user/adminAuthSlice'
// Student
import studentAuthSlice from '../student/features/user/studentAuthSlice'

const store = configureStore({
  reducer: {
    // Teacher
    header: headerSlice,
    rightDrawer: rightDrawerSlice,
    modal: modalSlice,
    lead: leadsSlice,
    teacherAuth: teacherAuthSlice,
    teacherCourses: teacherCourseSlice,
    // Admin
    adminAuth: adminAuthSlice,
    // Student
    studentAuth: studentAuthSlice,
  },
});


export default store;
