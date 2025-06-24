import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { useDispatch } from 'react-redux'
import { handleLogin } from './adminAuthSlice'

function Login() {

    const INITIAL_LOGIN_OBJ = {
        email: "",
        password: "",
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)


    const postData = async (obj) => {
        try {
            let response = await axios.post("/admin/login", obj);
            response = response.data;
            if(response.success) {
                const {token, credentials } = response.data;
                document.cookie = `adminToken=${token}; path=/`;
                document.cookie = `adminCredentials=${JSON.stringify(credentials)}; path=/`;

                
                dispatch(handleLogin({token, credentials}))
                // navigate('/admin/welcome');
                window.location.href = '/admin/welcome'
            }
        } catch (error) {
            console.log("Registration Error -> ", error);
            setErrorMessage(error?.response?.data.message)
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
                                <Link to="/admin/forgot-password"><span className="text-sm  inline-block blue-link">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn my-2 w-full gradiant-btn" + (loading ? "loading" : "")}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login