import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

function ForgotPassword() {

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    
    const [email, setEmail] = useState("");


    const postData = async (obj) => {
        try {
            let response = await axios.post("/teacher/forgotPassword", obj);
            response = response.data;
            if(response.success) {
                setLinkSent(true);
            }
        } catch (error) {
            const errorResponse = error.response.data;
            setErrorMessage(errorResponse.message);
        } finally {
            setLoading(false);
        }
    }
    

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (email.trim() === "") {
            return setErrorMessage("Email Id is required!")
        } else {
            setLoading(true)
            postData({email})
        }
    }


    // const updateFormValue = ({ updateType, value }) => {
    //     setErrorMessage("")
    //     setUserObj({ ...userObj, [updateType]: value })
    // }


    useEffect(() => {
        console.log("email ---> ", email)
    }, [email])

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-1/4 max-w-2xl  shadow-xl">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>

                        {
                            linkSent &&
                            <>
                                <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success' /></div>
                                <p className='my-4 text-xl font-bold text-center'>Link Sent</p>
                                <p className='mt-4 mb-8 font-semibold text-center'>Check your email to reset password</p>
                                <div className='text-center mt-4'><Link to="/teacher/login"><button className="btn btn-block gradiant-btn ">Login</button></Link></div>

                            </>
                        }

                        {
                            !linkSent &&
                            <>
                                <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p>
                                <form onSubmit={(e) => submitForm(e)}>

                                    <div className="mb-4">

                                        <label className="label label-text text-base-content"> Email </label>
                                        <input className="input input-bordered w-full" type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {/* <InputText type="emailId" defaultValue={userObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/> */}


                                    </div>

                                    <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                                    <button  type="submit" className={"btn mb-2 w-full gradiant-btn"}>Send Reset Link</button>

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/teacher/register"><button className="inline-block blue-link">Register</button></Link></div>
                                </form>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword