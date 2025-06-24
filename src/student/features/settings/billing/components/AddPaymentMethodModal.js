import React, { useCallback, useEffect, useState } from 'react'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios';

const AddPaymentMethodModal = ({ getPaymentMethods, closeModal, ModalId }) => {

    const [loading, setLoading] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);
    const [defaultCheck, setDefaultCheck] = useState(false);


    const stripe = useStripe();
    const elements = useElements();


    // Reset modal inputs
    const resetModal = () => {
        const cardElement = elements.getElement(CardElement);
        if (cardElement) cardElement.clear();
        setCardComplete(false);
        setDefaultCheck(false);
    };

    // Handle changes in CardElement
    const handleChange = (event) => {
        setCardComplete(event.complete);
    };

    // Save card details
    const saveCardDetails = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token } = await stripe.createToken(cardElement);
        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: { token: token.id }
        });

        const reqBody = {
            paymentMethodId: paymentMethod.id,
            setDefaultPaymentMethodFlag: defaultCheck
        }

        try {
            let response = await axios.post("/student/payment/add-new-payment-method", reqBody);
            response = response.data;
            if (response.success) {
                // cardElement.clear();
                getPaymentMethods();
                resetModal()
            }
        } catch (error) {
            console.log("Registration Error --> ", error);
        } finally {
            closeModal('AddPaymentMethodModal');
        }
    },[stripe,elements,defaultCheck,axios]);




    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add Payment Method</h3>


                <div className='mt-6'>
                    <form onSubmit={saveCardDetails}>
                        <CardElement options={cardElementOptions} onChange={handleChange} />

                        <div className="form-control my-4">
                            <label className="label cursor-pointer">
                                <span className="label-text">Set Default</span>
                                <input type="checkbox" className="checkbox" value={defaultCheck} onChange={() => setDefaultCheck(prev => !prev)} />
                            </label>
                        </div>
                        <div>
                            <button type="submit" className='btn gradiant-btn float-right' disabled={!stripe || loading || !cardComplete}>
                                Add
                            </button>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => {
                            closeModal('AddPaymentMethodModal');
                            resetModal();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default AddPaymentMethodModal