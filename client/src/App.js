import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Main from "./shared/App"
import Admin from './admin/App';
import Teacher from './teacher/App';
import Student from './student/App';
import initializeApp from './app/init';

const App = () => {  
  initializeApp();
  
  return (
    <div>
      {/* <Router>
        <Routes>
          <Route path="/*" element={<Main/>} />
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/teacher/*" element={<Teacher/>}/>
          <Route path="/student/*" element={<Student/>}/>
        </Routes>
      </Router> */}
      <Toaster containerStyle={{ top: '75px' }} position='top-right' reverseOrder={false}/>
      <Outlet/>
    </div>
  )
}

export default App