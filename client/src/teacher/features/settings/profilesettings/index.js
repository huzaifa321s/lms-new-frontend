import moment from "moment"
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import Search from "../../../../shared/utils/reuseable/Search"
import { handleUpdateProfile } from "../../user/teacherAuthSlice"
import ErrorText from "../../../../admin/components/Typography/ErrorText"


const defaultProfile = "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg?w=826";

function ProfileSettings() {


    const dispatch = useDispatch()

    const credentials = useSelector((state) => state.teacherAuth.credentials);

    const [errorMessage, setErrorMessage] = useState("")
    const [dp, setDp] = useState(credentials?.profile !== 'null' ? `${process.env.REACT_APP_STORAGE_BASE_URL}/teacher/profile/${credentials.profile}` : defaultProfile);

    const TEMPLATE_UPDATE_OBJ = {
        profile: null,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        specialization: credentials.specialization,
        qualification: credentials.qualification,
        address: credentials.address,
        bio: credentials.bio,
    }

    const [registerObj, setRegisterObj] = useState(TEMPLATE_UPDATE_OBJ);
    console.log('registerObj ===>', registerObj);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterObj({ ...registerObj, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // Set display picture.
        const reader = new FileReader();
        reader.onload = (e) => setDp(e.target.result);
        reader.readAsDataURL(file);
        // Set the image file in registerObject
        setRegisterObj((obj) => ({ ...obj, profile: file }));
    };



    const postData = useCallback(async (obj, endPoint = "updateProfile") => {
        try {
            let response = await axios.put(`/teacher/${endPoint}`, obj);
            response = response.data;
            console.log("Registration response -> ", response);
            if (response.success) {
                if (endPoint === "updateProfile") {
                    document.cookie = `teacherCredentials=${JSON.stringify(response.data)}; path=/`;
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
    }, [axios,document,toast]);

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
    }, [registerObj]);


    useEffect(() => {
        console.log("Reg --> ", registerObj)
    }, [registerObj])



    // ------------------------------ Reset Password ------------------------------



    const [passwordObj, setPasswordObj] = useState({
        password: "",
        newPassword: ""
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordObj({ ...passwordObj, [name]: value });
    }

    const isButtonDisabled = () => {
        if (passwordObj.password.trim() === "") {
            return true;
        }
        if (passwordObj.newPassword.trim() === "") {
            return true;
        }
    };


    return (
        <>
            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Profile Settings
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
                                <input className="input input-bordered w-full" type="text" name='firstName' value={registerObj.firstName ? registerObj.firstName :""} onChange={handleChange} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Last Name </label>
                                <input className="input input-bordered w-full" type="text" name='lastName' value={registerObj.lastName ? registerObj.lastName :""} onChange={handleChange} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Qualification </label>
                                <input className="input input-bordered w-full" type="text" name='qualification' value={registerObj.qualification ? registerObj.qualification :""} onChange={handleChange} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label label-text text-base-content"> Address </label>
                                <input className="input input-bordered w-full" type="text" name='address' value={registerObj.address !== null || registerObj.address !== '' ? registerObj.address : ''} onChange={handleChange} />
                            </div>

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> Bio </label>
                                <textarea className="textarea textarea-bordered w-full" type="text" name='bio' value={registerObj.bio !== null || registerObj.bio !== '' ? registerObj.bio : ''} onChange={handleChange}></textarea>
                            </div>


                        </div>

                        <div><button className="btn gradiant-btn float-right text-white hover:bg-blue-900" onClick={saveChanges}>Save Changes</button></div>




                        <div className="divider mt-14" ></div>

                        <div className="font-semibold mb-4 mx-1">Change Password</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> Old Password </label>
                                <input className="input input-bordered w-full" type="password" name='password' value={passwordObj.password ? passwordObj.password : ''} onChange={handlePasswordChange} />
                            </div>

                            <div className='form-control w-full'>
                                <label className="label label-text text-base-content"> New Password </label>
                                <input className="input input-bordered w-full" type="password" name='newPassword' value={passwordObj.newPassword ? passwordObj.newPassword : ''} onChange={handlePasswordChange} />
                            </div>

                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <div className="mt-6">
                            <button className="btn gradiant-btn float-right" disabled={isButtonDisabled()} onClick={() => postData(passwordObj, "updatePassword")}>Update</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}


export default ProfileSettings