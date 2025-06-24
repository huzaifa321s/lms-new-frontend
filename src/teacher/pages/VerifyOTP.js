import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import VerifyOTP from '../features/user/VerifyOTP'
import Login from '../features/user/Login'

function ExternalPage(){


    return(
        <div className="">
                <VerifyOTP />
        </div>
    )
}

export default ExternalPage