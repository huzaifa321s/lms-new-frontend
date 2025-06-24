import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import ResetPassword from '../features/user/ResetPassword'
import Login from '../features/user/Login'

function ExternalPage(){


    return(
        <div className="">
                <ResetPassword />
        </div>
    )
}

export default ExternalPage