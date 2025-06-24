import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import Search from "../../../../shared/utils/reuseable/Search"
import { handleUpdateProfile } from "../../user/studentAuthSlice"
import ErrorText from "../../../../admin/components/Typography/ErrorText"
// Date picker and phone number.
import 'react-phone-number-input/style.css'
import Datepicker from "tailwind-datepicker-react"
import PhoneInput from 'react-phone-number-input'
import ru from 'react-phone-number-input/locale/ru'
import toast from 'react-hot-toast';


const defaultProfile = "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg?w=826";

const options = {
    title: "Your Date of Birth",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        // background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        // disabledText: "bg-red-500",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}




function ProfileSettings() {


    const dispatch = useDispatch()

    const credentials = useSelector((state) => state.studentAuth.credentials);

    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [dp, setDp] = useState(credentials?.profile !== 'null' ? `${process.env.REACT_APP_STORAGE_BASE_URL}/student/profile/${credentials.profile}` : defaultProfile);
    const [dobError,setDobError] = useState(false);

    const TEMPLATE_UPDATE_OBJ = {
        profile: null,
        firstName: credentials?.firstName,
        lastName: credentials?.lastName,
        bio: credentials?.bio,
        dateOfBirth: credentials?.dateOfBirth,
        phone: credentials?.phone,
    }

    const [registerObj, setRegisterObj] = useState(TEMPLATE_UPDATE_OBJ);

    const handleChange =(e) => {
        const { name, value } = e.target;
        setRegisterObj({ ...registerObj, [name]: value });
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // Set display picture.
        const reader = new FileReader();
        reader.onload = (e) => setDp(e.target.result);
        reader.readAsDataURL(file);
        // Set the image file in registerObject
        setRegisterObj((obj) => ({ ...obj, profile: file }));
    }

    // Date picker
    const handleDateClose = (state) => setShow(state);
    const handleDateChange = (date) => {
        const inputDate = date;
        const currentDate = new Date();

        inputDate.setUTCHours(0, 0, 0, 0);
        currentDate.setUTCHours(0, 0, 0, 0);

        if (inputDate > currentDate) {
            setDobError(true);
            return;
        } else {
            setDobError(false);
            setErrorMessage('');
            setRegisterObj((obj) => ({ ...obj, dateOfBirth: date }))
        }
    };


    // Phone number
    const [phone, setPhone] = useState(credentials?.phone)
    useEffect(() => {
        setRegisterObj((obj) => ({ ...obj, phone: phone }));
    }, [phone]);


    const postData = useCallback(async (obj, endPoint = "updateProfile") => {
        if(dobError){
            setErrorMessage('Date of birth cannot be in the future')
            return 
        }
        setErrorMessage('')
        try {
            let response = await axios.put(`/student/${endPoint}`, obj);
            response = response.data;
            console.log("Registration response -> ", response);
            if (response.success) {
                if (endPoint === "updateProfile") {
                    document.cookie = `studentCredentials=${JSON.stringify(response.data)}; path=/`;
                    dispatch(handleUpdateProfile(response.data))
                }
                toast.success(response.message);
            };

        } catch (error) {
            const errorResponse = error.response.data;
            if (endPoint === 'updatePassword') {
                setErrorMessage(errorResponse.message);
            } else {
                toast.error(errorResponse.message)
            }



        }
    },[axios,toast,document]);

    const saveChanges = useCallback(() => {
        if (registerObj.profile) {
            const RegisterationForm = new FormData();
            for (const key in registerObj) {
                RegisterationForm.append(key, registerObj[key]);
            }
            postData(RegisterationForm);
        } else {
            postData(registerObj);
        }
    },[registerObj]);






    // ------------------------------ Reset Password ------------------------------



    const [passwordObj, setPasswordObj] = useState({
        password: "",
        newPassword: ""
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordObj({ ...passwordObj, [name]: value });
    };

    const isButtonDisabled = () => {
        if (passwordObj.password.trim() === "") {
            return true;
        }
        if (passwordObj.newPassword.trim() === "") {
            return true;
        }
    };


    useEffect(() => {
        console.log("Reg --> ", registerObj)
    }, [registerObj])

    return (
        <>


            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Profile Setting
                </div>
            </div>

            <div className='card  w-full bg-base-100 shadow-xl min-h-[80vh]'>
                <div className="card-body" style={{ position: "relative" }}>
                    <div className="overflow-x-auto w-full">
                        <div className="mt-4 flex gap-4">
                            <img
                                src={dp || defaultProfile}
                                alt="Dashwind Admin Template"
                                className="w-48 h-48 inline-block rounded-full"
                            />

                            <div className="flex flex-col gap-3 justify-center">
                                <div>
                                    This will display to students when they view your profile.
                                </div>

                                <div>
                                    <label htmlFor="imageInput" className="btn"> Change Profile </label>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        className="file-input file-input-bordered file-input-accent w-1/2 max-w-xs"
                                        style={{ display: "none" }}
                                        onChange={(e) => handleImageUpload(e)}
                                    />
                                </div>


                            </div>
                        </div>



                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> First Name </label>
                                <input className="input input-bordered w-full" type="text" name='firstName' value={registerObj?.firstName} onChange={handleChange} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Last Name </label>
                                <input className="input input-bordered w-full" type="text" name='lastName' value={registerObj?.lastName} onChange={handleChange} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Date of Birth </label>
                                {/* <input className="input input-bordered w-full" type="text" name='qualification' value={registerObj?.qualification} onChange={handleChange} /> */}
                                <Datepicker options={options} onChange={handleDateChange} show={show} setShow={handleDateClose} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Phone </label>
                                {/* <input className="input input-bordered w-full" type="text" name='address' value={registerObj?.address} onChange={handleChange} /> */}
                                <PhoneInput className="input input-bordered" international placeholder="Enter phone number" value={phone} onChange={setPhone} />
                            </div>

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> Bio </label>
                                <textarea className="textarea textarea-bordered w-full" type="text" name='bio' value={registerObj?.bio ? registerObj.bio : ''} onChange={handleChange}></textarea>
                            </div>


                        </div>

                        <div><button className="btn gradiant-btn text-white hover:bg-blue-900  float-right" onClick={saveChanges}>Save Changes</button></div>




                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <div className="divider mt-14" ></div>

                        <div className="font-semibold mb-4 mx-1">Change Password</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> Old Password </label>
                                <input className="input input-bordered w-full" type="password" name='password' value={passwordObj.password} onChange={handlePasswordChange} />
                            </div>

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> New Password </label>
                                <input className="input input-bordered w-full" type="password" name='newPassword' value={passwordObj.newPassword} onChange={handlePasswordChange} />
                            </div>

                        </div>

                        <div className="mt-6">
                            <button className="btn gradiant-btn  float-right" disabled={isButtonDisabled()} onClick={() => postData(passwordObj, "updatePassword")}>Update</button>
                        </div>

                    </div>
                </div>
            </div>






        </>
    )
}


export default ProfileSettings