import React from 'react'

const DeleteConfirmationModal = ({ cancelPlan, closeModal, ModalId }) => {
    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to cancel the subscription?</h3>
                <div className="modal-action">
                    <button className="btn gradiant-btn float-right" onClick={cancelPlan}>Cancel</button>
                    <button className="btn" onClick={() => closeModal('CancelSubscriptionModal')}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteConfirmationModal