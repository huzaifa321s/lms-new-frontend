import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { useDispatch } from 'react-redux'
import { handleLogin } from './studentAuthSlice'

function ResetPassword() {


    const navigate = useNavigate();
    const { id, token } = useParams();


    const RESET_PASSWORD_OBJ = { password: "", confirmPassword: "" };

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [resetPasswordObj, setResetPasswordObj] = useState(RESET_PASSWORD_OBJ)


    const postData = async (obj) => {
        try {
            let response = await axios.post(`/student/resetPassword/${id}/${token}`, obj);
            response = response.data;

            if(response.success) navigate('/student/login');
            console.log("Registration response -> ", response);

        } catch (error) {

            const errorResponse = error.response.data;
            setErrorMessage(errorResponse.message);

            console.log("Registration data -> ", error.response.data);
        } finally {
            setLoading(false);
        }
    }



    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (resetPasswordObj.password.trim() === "") {
            return setErrorMessage("Email Id is required! (use any value)")
        } else if (resetPasswordObj.confirmPassword.trim() === "") {
            return setErrorMessage("Password is required! (use any value)")
        } else if (resetPasswordObj.password !== resetPasswordObj.password) {
            return setErrorMessage("Password does not match!")
        } else {
            setLoading(true);
            postData(resetPasswordObj);
        }
    }



    const handleChange = (e) => {
        setErrorMessage("")
        const { name, value } = e.target;
        setResetPasswordObj({ ...resetPasswordObj, [name]: value });
    }



    useEffect(() => {
        console.log('login obj -->  ', resetPasswordObj)
    }, [resetPasswordObj])


    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-1/4 max-w-2xl  shadow-xl">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Reset Password</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <label className="label label-text text-base-content"> Password </label>
                                <input className="input input-bordered w-full" type="password" name='password' value={resetPasswordObj.password} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Confirm Password </label>
                                <input className="input input-bordered w-full" type="password" name='confirmPassword' value={resetPasswordObj.confirmPassword} onChange={handleChange} />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full gradiant-btn" + (loading ? " loading" : "")}>Reset</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/student/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword




// // ResetPassword.js
// import React, { useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';

// const ResetPassword = () => {
//   const { userId, token } = useParams();
//   const history = useHistory();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async () => {
//     try {
//       // Implement your API call to reset the password here
//       // Send userId, token, and the new password to the server

//       // Example:
//       // const response = await fetch('/api/reset-password', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({ userId, token, password }),
//       // });
      
//       // Check response status and handle accordingly
//       // if (response.ok) {
//       //   // Password reset successful
//       //   history.push('/login'); // Redirect to login page
//       // } else {
//       //   const data = await response.json();
//       //   setError(data.message || 'Password reset failed');
//       // }

//       // Replace the above example with your actual API call
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setError('Password reset failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <div>
//         <label>Confirm Password:</label>
//         <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button onClick={handleResetPassword}>Reset Password</button>
//     </div>
//   );
// };

// export default ResetPassword;
