import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { useDispatch } from 'react-redux'
import { handleLogin } from './studentAuthSlice'
import { isActiveSubscription } from '../../utils/helperFunctions'

function Login() {
    const location = useLocation();
    const searchObj = new URLSearchParams(location.search)

    const INITIAL_LOGIN_OBJ = { email: "", password: "" }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)


    const postData = async (obj) => {
        try {
            let response = await axios.post("/student/login", obj);
            response = response.data;
            if (response.success) {
                const redirectto = searchObj.get('redirectto');
                const { token, credentials } = response.data;
                dispatch(handleLogin({ token, credentials }));
                // const subscribed = isActiveSubscription(credentials.subscription);
                // if (subscribed) {
                //     console.log("Subscribed run")
                //     window.history.back();
                // } else {
                //     // window.location.href = '/student/subscription-plans'
                //     console.log("Unsubscribed run")
                //     window.history.back();
                // }
                // window.location.href = 'student/welcome'
                // navigate('/student/welcome')

                if (redirectto) {
                    navigate(redirectto)
                } else {
                    navigate('/')
                }

            }
        } catch (error) {
            console.log("Error: ", error);
            if (error.response.data.message) {
                if(error.response.data.message.includes('Student')){
                    setErrorMessage("Sorry, no user was found. Please check the details and try again.");
                }else{
                    setErrorMessage(error.response.data.message);
                }
            
            } else if (error.message) {
                console.log('error.message ===>', error.message);
                setErrorMessage(error.message);
            } else {
                setErrorMessage(error.response.data.message)
            }
        } finally {
            setLoading(false);
        }
    }



    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("");
        if (loginObj.email.trim() === "") {
            return setErrorMessage("Email Id is required!")
        } else if (loginObj.password.trim() === "") {
            return setErrorMessage("Password is required!")
        } else {
            setLoading(true);
            postData(loginObj);
        }
    }



    const handleChange = (e) => {
        setErrorMessage("")
        const { name, value } = e.target;
        setLoginObj({ ...loginObj, [name]: value });
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-1/4 max-w-2xl  shadow-xl">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <label className="label label-text text-base-content"> Email </label>
                                <input className="input input-bordered w-full" type="email" name='email' value={loginObj.email} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Password </label>
                                <input className="input input-bordered w-full" type="password" name='password' value={loginObj.password} onChange={handleChange} />
                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/student/forgot-password"><span className="text-sm  inline-block blue-link">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn my-2 w-full gradiant-btn" + (loading ? "loading" : "")}>Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/student/register"><span className="inline-block blue-link">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login