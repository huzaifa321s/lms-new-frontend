import React from 'react'

const DeleteConfirmationModal = ({ deleteBlog, closeModal, ModalId }) => {
    return (
        <dialog id="BlogDeleteModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this blog?</h3>
                <div className="modal-action">
                    <button className="btn" onClick={deleteBlog}>Confirm</button>
                    <button className="btn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteConfirmationModal