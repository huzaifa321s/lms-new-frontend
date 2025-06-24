import React from 'react'
// Components
import Header from "./components/Header"
import { Routes, Route, Outlet } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
// Middleware
import PrivateRoutes from './middlewares/PrivateRoutes'
// Initialize Axios Configrations
import InitializeAxios from './utils/InitializeAxios'

const App = () => {
    InitializeAxios();
   

    return (
        <>
            <Header />
            {/* <Routes >
                {publicRoutes.map((r, k) => <Route key={k} path={r.path} element={r.component} />)}

                <Route element={<PrivateRoutes />}>
                    {privateRoutes.map((r, k) => <Route key={k} path={r.path} element={r.component} />)}
                </Route>
            </Routes> */}
            <Outlet/>
        </>
    )
}

export default App