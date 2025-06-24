import axios from 'axios';
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { handleLogin } from './studentAuthSlice';
// import { isActiveSubscription } from '../../utils/helperFunctions';
import { useDispatch } from 'react-redux';
import { isActiveSubscription } from '../../../shared/utils/helperFunction';

function Register() {

    const INITIAL_REGISTER_OBJ = {
        profile: null,

        firstName: "",
        lastName: "",
        email: "",

        password: "",
        confirmPassword: ""
    }
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dp, setDp] = useState(null);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)



    const postData = async (formData) => {
        try {
            let response = await axios.post("/student/register", formData);
            response = response.data;
            if(response.success) {
                // localStorage.setItem("teacherEmail", JSON.stringify(registerObj.email));
                // navigate('/teacher/verify-otp');
                // navigate('/student/login');
                const { token, credentials } = response.data;
                dispatch(handleLogin({ token, credentials }));
                const subscribed = isActiveSubscription(credentials.subscription);
                if (subscribed) {
                    console.log("Subscribed run")
                    window.history.back();
                } else {
                    // window.location.href = '/student/subscription-plans'
                    console.log("Unsubscribed run")
                    window.history.back();
                }    
            };
            console.log("Registration response -> ", response);
        } catch (error) {
            console.log("Registration Error -> ", error);

            const errorResponse = error.response.data;
            setErrorMessage(errorResponse.message);

            console.log("Registration data -> ", error.response.data);
        }
    }


    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (registerObj.firstName.trim() === "") {
            return setErrorMessage("Enter first name!")
        } else if (registerObj.lastName.trim() === "") {
            return setErrorMessage("Enter last name!")
        } else if (registerObj.email.trim() === "") {
            return setErrorMessage("Email is required!")
        } else if (registerObj.password.trim() === "") {
            return setErrorMessage("Enter password!")
        } else if (registerObj.confirmPassword.trim() === "") {
            return setErrorMessage("Confirm the password!")
        } else if (registerObj.password !== registerObj.confirmPassword) {
            return setErrorMessage("Passowrd does not match!")
        } else {
            const RegisterationForm = new FormData();
            for (const key in registerObj) {
                RegisterationForm.append(key, registerObj[key]);
            }
            postData(RegisterationForm);
        }
    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // Set display picture.
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            setDp(imageData);
        };
        reader.readAsDataURL(file);
        // Set the image file in registerObject
        setRegisterObj((obj) => ({ ...obj, profile: file }));
    };

    const handleChange = (e) => {
        setErrorMessage("")
        const { name, value } = e.target;
        setRegisterObj({ ...registerObj, [name]: value });
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">

                    <div className=" bg-base-300">
                        <div className="hero min-h-full rounded-l-xl bg-base-200">
                            <div className="hero-content py-12">
                                <div className="max-w-md">
                                    <h1 className="text-3xl text-center font-bold ">
                                        {/* <img
                                            src="/logo192.png"
                                            className="w-12 inline-block mr-2 mask mask-circle"
                                            alt="dashwind-logo"
                                        /> */}
                                        Bruce LMS
                                    </h1>

                                    <div className="text-center mt-12">
                                        <img
                                            src={dp || "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg?w=826"}
                                            alt="Dashwind Admin Template"
                                            className="w-48 h-48 inline-block rounded-xl"
                                        />
                                    </div>
                                    <div className="text-center mt-6">
                                        <label
                                            htmlFor="imageInput"
                                            className="btn btn-ghost bg-white"
                                        >
                                            Upload Profile
                                        </label>
                                        <input
                                            id="imageInput"
                                            type="file"
                                            className="file-input file-input-bordered file-input-accent w-1/2 max-w-xs"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleImageUpload(e)}
                                        />
                                    </div>
                                    <div className="text-center mt-12">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                        Quidem, rerum? Explicabo, aliquid ipsam. Sit soluta
                                        consectetur cumque. Et, beatae itaque? Voluptates magni
                                        natus porro! Deleniti tempora aliquid perferendis modi,
                                        voluptatem earum mollitia quibusdam dignissimos?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Student Register</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">
                                <label className="label label-text text-base-content"> First Name </label>
                                <input className="input input-bordered w-full" type="text" name='firstName' value={registerObj.firstName} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Last Name </label>
                                <input className="input input-bordered w-full" type="text" name='lastName' value={registerObj.lastName} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Email </label>
                                <input className="input input-bordered w-full" type="email" name='email' value={registerObj.email} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Password </label>
                                <input className="input input-bordered w-full" type="password" name='password' value={registerObj.password} onChange={handleChange} />

                                <label className="label label-text text-base-content"> Confirm Password </label>
                                <input className="input input-bordered w-full" type="password" name='confirmPassword' value={registerObj.confirmPassword} onChange={handleChange} />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn my-2 w-full gradiant-btn" + (loading ? " loading" : "")}>Register</button>


                            <div className='text-center mt-4'>Already have an account? <Link to="/student/login"><span className="inline-block blue-link">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register