import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { createCourse } from "../coursesSlice"
// import { addNewLead } from "../leadSlice"














// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------
// ---------------------- DISCARDED ----------------------




























const INITIAL_COURSE_OBJ = {
    name: "",
    description: "",
}


function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");
    const credentials = useSelector((state) => state.teacherAuth.credentials);
    const [courseObj, setLeadObj] = useState(INITIAL_COURSE_OBJ)


    const createCourseFunc = () => {
        if (courseObj.name.trim() === "") {
            return setErrorMessage("First Name is required!")
        } else if (courseObj.description.trim() === "") {
            return setErrorMessage("Email id is required!")
        } else {
            let newCourse = {
                name: courseObj.name,
                description: courseObj.description,
                instructor: credentials._id,
            }
            // dispatch(addNewLead({newCourse}))
            // dispatch(createCourse(newCourse))
            // dispatch(showNotification({ message: "Course Created!", status: 1 }))
            closeModal()


        }
    }

    const handleChange = (e) => {
        setErrorMessage("")
        const { name, value } = e.target;
        setLeadObj({ ...courseObj, [name]: value });
    }


    return (
        <>
            <label className="label label-text text-base-content"> Name </label>
            <input className="input input-bordered w-full" type="text" name='name' value={courseObj.name} onChange={handleChange} />

            <label className="label label-text text-base-content"> Description </label>
            <input className="input input-bordered w-full" type="text" name='description' value={courseObj.description} onChange={handleChange} />


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn gradiant-btn float-right px-6" onClick={() => createCourseFunc()}>Create</button>
            </div>
        </>
    )
}

export default AddLeadModalBody