import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Show } from '../../../../shared/utils/Show';
import AddPaymentMethodModal from '../../settings/billing/components/AddPaymentMethodModal';
import DetachPaymentMethodModal from '../../settings/billing/components/DetachPaymentMethodModal';
import { updateSubscription } from '../studentAuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function PaymentMethodsList({ plan, paymentMethodsListFlag }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const [removePaymentMethodId, setRemovePaymentMethodId] = useState('');

    // Select Plan & Payment Method 
    const selectPaymentMethod = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    // Modal Actions
    const openModal = (modalId, data) => {
        if (modalId === 'DetachPaymentMethodModal') {
            setRemovePaymentMethodId(data); // data: payment method id.
        }
        document.getElementById(modalId).showModal();
    }

    const closeModal = (modalId) => {
        document.getElementById(modalId).close();
    }


    // API methods:
    const resubscribe = async () => {
        const reqBody = { plan: plan?.name }
        try {
            let response = await axios.post("/student/payment/resubscribe", reqBody);
            response = response.data;
            if (response.success) {
                const { subscription, remainingEnrollmentCount } = response.data;
                dispatch(updateSubscription({ subscription, remainingEnrollmentCount }));
                navigate("/student/welcome")
            }
        } catch (error) {
            toast.error(`Subscription failed`);
            console.log("Registration Error --> ", error);

            // if(error?.response?.data?.metadata?.subscription) {
            //     const { subscription, remainingEnrollmentCount } = error.response.data.metadata;
            //     dispatch(updateSubscription({ subscription, remainingEnrollmentCount }));
            //     navigate("/student/failed-subscription")
            //     // window.location.href = "/student/failed-subscription";
            // }
        }
    }

    const getPaymentMethods = useCallback(async () => {
        try {
            let response = await axios.get(`/student/payment/get-payment-methods`);
            response = response.data;
            if (response.success) {
                setPaymentMethods(response.data);
                const detaultPM = response.data.find((pm) => pm.isDefault === true);
                setSelectedPaymentMethod(detaultPM.paymentMethodId);
            }
        } catch (error) {
            console.log("Error ==> ", error)
        }
    }, []);

    const setCardAsDefault = async (paymentMethodId) => {
        try {
            let response = await axios.put(`/student/payment/set-card-as-default/${paymentMethodId}`);
            response = response.data;
            if (response.success) {
                getPaymentMethods();
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    // In API Response: 
    const handleDetach = (detachedPaymentMethodId) => {
        let updatedPaymentMethods = paymentMethods.filter((pm) => {
            return pm.paymentMethodId !== detachedPaymentMethodId
        })
        setPaymentMethods(updatedPaymentMethods)
    }



    useEffect(() => {
        getPaymentMethods();
    }, [getPaymentMethods]);

    return (
        <div className='flex justify-center items-center min-h-[80vh]'>


            <AddPaymentMethodModal
                ModalId={"AddPaymentMethodModal"}
                getPaymentMethods={getPaymentMethods}
                closeModal={closeModal}
            />

            <DetachPaymentMethodModal
                ModalId={"DetachPaymentMethodModal"}
                handleDetach={handleDetach}
                paymentMethodId={removePaymentMethodId}
                closeModal={closeModal}
            />



            <div className='flex justify-center items-center min-h-[80vh]'>
                <div className="card px-6 py-10 bg-base-100 shadow-xl mt-2 w-[750px]">
                    <div className="flex justify-between items-center ">
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] font-semibold">{plan?.name} Plan</h1>
                                <button className='btn btn-ghost btn-circle' onClick={() => paymentMethodsListFlag(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex">
                                <div className=' w-[300px]'>
                                    <h2 className="text-5xl font-bold mt-2 mb-6">{plan?.price}</h2>
                                    <ul className="text-gray-700 text-left mt-2 mb-6 flex flex-col gap-4">
                                        {plan?.features.map((feature, i) => (
                                            <li key={i} className="flex items-between gap-2">
                                                <span className='text-blue-800'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='w-50'>
                                    <h2 className="font-bold text-[20px] mt-2">Payment Methods</h2>
                                    <p className="text-gray-500 text-sm mb-6">We'll use your Default card for the payment.</p>
                                    <div>
                                        <Show>
                                            <Show.When isTrue={paymentMethods.length > 0}>
                                                <ul>
                                                    {paymentMethods.map((pm, k) => {
                                                        return (
                                                            <li key={k} className='flex justify-between gap-4 w-[450px]'>
                                                                <div className='flex items-center gap-2'>
                                                                    <input
                                                                        type="radio"
                                                                        name={`radio-${k}`}
                                                                        className="radio checked:bg-blue-500"
                                                                        value={pm.paymentMethodId}
                                                                        checked={selectedPaymentMethod === pm.paymentMethodId}
                                                                        onChange={selectPaymentMethod}
                                                                    />
                                                                    <div className='flex items-center gap-8'>
                                                                        <div className='flex items-center gap-3'>
                                                                            <span>{pm.brand}</span>
                                                                            <span>**** {pm.last4}</span>
                                                                            {pm.isDefault && <span className='badge badge-ghost'>Default</span>}
                                                                            <span className='text-xs'>
                                                                                <div>Expires</div>
                                                                                <div>{pm.expiry}</div>
                                                                            </span>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className='flex gap-2'>
                                                                    {!pm.isDefault && selectedPaymentMethod === pm.paymentMethodId && (
                                                                        <button
                                                                            className='btn btn-round btn-xs'
                                                                            onClick={() => setCardAsDefault(pm.paymentMethodId)}
                                                                        >
                                                                            Set Default
                                                                        </button>
                                                                    )}

                                                                    {paymentMethods.length > 1 && selectedPaymentMethod === pm.paymentMethodId && (
                                                                        <button
                                                                            className='btn btn-round btn-xs'
                                                                            onClick={() => openModal('DetachPaymentMethodModal', pm.paymentMethodId)}
                                                                        >

                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>


                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </Show.When>
                                            <Show.Else>
                                                No Payment method availble.
                                            </Show.Else>
                                        </Show>

                                        <div className='mt-6'>
                                            <button className='flex gap-2 btn' onClick={() => openModal('AddPaymentMethodModal')} >
                                                Add payment method
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <button className='btn gradiant-btn float-right' onClick={() => resubscribe()} >
                                    Pay now
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* <div className="mb-6">
                        Insert the card details to buy subscription.
                    </div>
                    <form onSubmit={saveCardDetails}>
                        <CardElement options={cardElementOptions} onChange={handleChange} />
                        <div className="mt-6 text-right">
                            <button type="submit" className='btn gradiant-btn float-right' disabled={!stripe || loading || !cardComplete}>
                                Buy Subscription
                            </button>
                        </div>
                    </form> */}


                </div>
            </div>

        </div>
    )
}

export default PaymentMethodsList