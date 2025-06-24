import axios from 'axios';
import React, { useCallback } from 'react'

const DetachPaymentMethodModal = ({ handleDetach, paymentMethodId, closeModal, ModalId }) => {

    const confirmDetach = useCallback(async () => {
        try {
            let response = await axios.delete(`/student/payment/detach-payment-method/${paymentMethodId}`);
            response = response.data;
            if (response.success) {
                handleDetach(response.data);
            }
        } catch (error) {
            console.log("Registration Error --> ", error);
        } finally {
            closeModal('DetachPaymentMethodModal');
        }
    },[axios]);

    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to detach this payment method?</h3>
                <div className="modal-action">
                    <button className="btn" onClick={confirmDetach}>Confirm</button>
                    <button className="btn" onClick={() => closeModal('DetachPaymentMethodModal')}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default DetachPaymentMethodModal