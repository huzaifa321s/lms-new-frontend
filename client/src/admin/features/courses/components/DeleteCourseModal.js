import React from 'react'

const DeleteCourseModal = ({ deleteCourse, closeModal, ModalId }) => {
    return (
        <dialog  id={ModalId}  className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this course?</h3>
                <div className="modal-action">
                    <button className="btn gradiant-btn float-right" onClick={deleteCourse}>Confirm</button>
                    <button className="btn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteCourseModal