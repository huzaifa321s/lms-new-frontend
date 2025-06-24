import React from 'react'

const UpdateSubscriptionModal = ({ updatePlan, selectedPlan, closeModal, ModalId }) => {
    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to change your plan to {selectedPlan}?</h3>
                <p className="font text-md">We'll use your Default card for the payment.</p>
                <div className="modal-action">
                    <button className="btn gradiant-btn float-right" onClick={updatePlan}>Update</button>
                    <button className="btn" onClick={() => closeModal('UpdateSubscriptionModal')}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateSubscriptionModal