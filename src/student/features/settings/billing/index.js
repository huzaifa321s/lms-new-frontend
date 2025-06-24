import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TitleCard from "../../../components/Cards/TitleCard"
import CancelSubscriptionModal from './components/CancelSubscriptionModal'
import { calculateDateAfter30Days, unixToLocaleStr } from '../../../../shared/utils/helperFunction'
import toast from 'react-hot-toast';
import { updateSubscription } from '../../user/studentAuthSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import { Show } from '../../../../shared/utils/Show'
import AddPaymentMethodModal from './components/AddPaymentMethodModal';
import DetachPaymentMethodModal from './components/DetachPaymentMethodModal';
import UpdateSubscriptionModal from './components/UpdateSubscriptionModal';
import { getSubscriptionStatus } from '../../../utils/helperFunctions';


function Billing() {

    const dispatch = useDispatch();
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const [removePaymentMethodId, setRemovePaymentMethodId] = useState('');

    const currentPlan = useSelector((state) => state.studentAuth.credentials?.subscription);
    const remainingCourses = useSelector((state) => state.studentAuth.credentials?.remainingEnrollmentCount);

    
    // Select Plan & Payment Method 
    const selectPaymentMethod = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };


    // Modal Actions
    const openModal = (modalId, data) => {

        if (modalId === 'DetachPaymentMethodModal') {
            setRemovePaymentMethodId(data); // data: payment method id.
        }
        if (modalId === 'UpdateSubscriptionModal') {
            setSelectedPlan(data); // data: Bronze, Silver or Gold.
        }

        document.getElementById(modalId).showModal();
    }

    const closeModal = (modalId) => {
        document.getElementById(modalId).close();
    }


    // API methods:
    const cancelPlan = useCallback(async () => {
        try {
            let response = await axios.delete(`/student/payment/cancel-subscription/${currentPlan.subscriptionId}`);
            response = response.data;
            if (response.success) {
                toast.success(response.message);
                const { subscription, remainingEnrollmentCount } = response.data;
                console.log("Subscription obj after cancelation: ", subscription)
                dispatch(updateSubscription({ subscription, remainingEnrollmentCount }));
                window.location.href = '/student/resubscription-plans'; // Because updateSubscription takes some time.
            }
        } catch (error) {
            console.log("error ===> ", error)
            const errorResponse = error.response.data;
            toast.error(errorResponse.message)
        } finally {
            closeModal('CancelSubscriptionModal');
        }
    },[axios,currentPlan,toast])

    const updatePlan = useCallback(async () => {
        if (!selectedPlan) {
            return;
        }

        try {
            let response = await axios.put(`/student/payment/update-subscription-plan`,
                { newPlan: selectedPlan }
            );
            response = response.data;
            if (response.success) {
                toast.success(response.message);
                const { subscription, remainingEnrollmentCount } = response.data;
                dispatch(updateSubscription({ subscription, remainingEnrollmentCount }));
                setSelectedPlan('');
            }
        } catch (error) {
            console.log("Error: ", error)
        } finally {
            closeModal('UpdateSubscriptionModal');
        }
    },[selectedPlan,axios,toast]);

    const setCardAsDefault = useCallback(async (paymentMethodId) => {
        try {
            let response = await axios.put(`/student/payment/set-card-as-default/${paymentMethodId}`);
            response = response.data;
            if (response.success) {
                getPaymentMethods();
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    },[axios]);

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
    }, [axios]);


    // In API Response: 
    const handleDetach =(detachedPaymentMethodId) => {
        let updatedPaymentMethods = paymentMethods.filter((pm) => {
            return pm.paymentMethodId !== detachedPaymentMethodId
        })
        setPaymentMethods(updatedPaymentMethods)
    };


    useEffect(() => {
        getPaymentMethods();
    }, [getPaymentMethods]);


    return (
        <>

            {/* Modals */}
            <UpdateSubscriptionModal
                selectedPlan={selectedPlan}
                ModalId={"UpdateSubscriptionModal"}
                updatePlan={updatePlan}
                closeModal={closeModal}

            />

            <CancelSubscriptionModal
                ModalId={"CancelSubscriptionModal"}
                cancelPlan={cancelPlan}
                closeModal={closeModal}
            />

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


            {/* Rest of Page */}

            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Billing Setting
                </div>
            </div>


            <div className='card  w-full bg-base-100 shadow-xl h-[80vh]'>
                <div className="card-body" style={{ position: "relative" }}>
                    <div className="overflow-x-auto w-full">
                        <h1 className='font-bold text-2xl'>Update your plan</h1>



                        <div>
                            <h2 className="font-semibold text-gray-500 mt-12">SUBSCRIPTION PLANS</h2>
                            <div className="divider mt-2"></div>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='font-bold text-[22px]'>{currentPlan.name} Plan <span className='badge badge-ghost'>{getSubscriptionStatus(currentPlan.status)}</span></h1>
                                    <h2 className='font-semibold text-gray-600'>{currentPlan.price} per month</h2>
                                    <p>
                                        <span className={`font-semibold text-gray-500 ${getSubscriptionStatus(currentPlan.status) === 'Expired' ? 'line-through' : ''}`}>
                                            Remaining Courses: {remainingCourses}/{currentPlan?.courseLimit} </span>
                                    </p>
                                    {getSubscriptionStatus(currentPlan.status) !== 'Expired' && <p className='font-semibold text-gray-500'>
                                        <span className='font-bold'>Next Payment:</span> {unixToLocaleStr(currentPlan.currentPeriodEnd, 'en-US')}</p>
                                    }
                                    {getSubscriptionStatus(currentPlan.status) === 'Expired' && <p className='font-semibold text-gray-500'>Pay the debts to renew the subscription.</p>}
                                </div>
                                <div>
                                    <button className="btn btn-error text-white float-right" onClick={() => openModal('CancelSubscriptionModal')} >Cancel Plan</button>
                                </div>
                            </div>
                        </div>



                        <div className='mt-8 w-100'>
                            <div role="tablist" className="tabs tabs-bordered w-100">
                                {currentPlan?.name !== 'Bronze' && (<>
                                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label={`Bronze Plan`} defaultChecked={currentPlan?.name !== 'Bronze'} />
                                    <div role="tabpanel" className="tab-content pt-4">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className='font-semibold text-gray-600'>$170 per month</h2>
                                                <ul>
                                                    <li>Can buy 4 courses</li>
                                                    <li>Limited supportconsectetur.</li>
                                                    <li>Duis aute irure dolor i</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button className='btn gradiant-btn float-right' onClick={() => openModal('UpdateSubscriptionModal', 'Bronze')} >  Update to Bronze Plan </button>
                                            </div>

                                        </div>

                                    </div>
                                </>)}

                                {currentPlan?.name !== 'Silver' && (<>
                                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label={`Silver Plan`} defaultChecked={currentPlan?.name === 'Bronze'} />
                                    <div role="tabpanel" className="tab-content pt-4">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className='font-semibold text-gray-600'>$200 per month</h2>
                                                <ul>
                                                    <li> Can buy 8 courses </li>
                                                    <li> Excepteur sint occaecat </li>
                                                    <li> Lorem ipsum dolor sit ame </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button className='btn gradiant-btn float-right' onClick={() => openModal('UpdateSubscriptionModal', 'Silver')} > Update to Silver Plan </button>
                                            </div>

                                        </div>

                                    </div>
                                </>)}

                                {currentPlan?.name !== 'Gold' && (<>
                                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label={`Gold Plan`} />
                                    <div role="tabpanel" className="tab-content pt-4">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className='font-semibold text-gray-600'>$250 per month</h2>
                                                <ul>
                                                    <li> Can buy 12 courses </li>
                                                    <li> Ut enim ad minim </li>
                                                    <li> Excepteur sint occaecat </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button className='btn gradiant-btn float-right' onClick={() => openModal('UpdateSubscriptionModal', 'Gold')} > Update to Gold Plan </button>
                                            </div>
                                        </div>
                                    </div>
                                </>)}

                                {currentPlan?.name !== 'Daily' && (<>

                                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label={`Daily Plan`} />
                                    <div role="tabpanel" className="tab-content pt-4">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className='font-semibold text-gray-600'>$10 per month</h2>
                                                <ul>
                                                    <li> Can buy 12 courses </li>
                                                    <li> Ut enim ad minim </li>
                                                    <li> Excepteur sint occaecat </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button className='btn gradiant-btn float-right' onClick={() => openModal('UpdateSubscriptionModal', 'Daily')} > Update to Daily Plan </button>
                                            </div>
                                        </div>
                                    </div>
                                </>)}


                                {/* {availblePlans.map((avp, k) => {
                                    return (
                                        <>

                                            <input
                                                type="radio"
                                                name="my_tabs_1"
                                                role="tab"
                                                className="tab"
                                                aria-label={`${avp.name} Plan`}
                                                defaultChecked={k === 0}
                                            // onChange={() => handlePlanChange(avp)}
                                            />
                                            <div role="tabpanel" className="tab-content pt-4">
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <h2 className='font-semibold text-gray-600'>{avp.price} per month</h2>
                                                        <ul>{avp.features.map((f, fk) => <li key={fk}>{f}</li>)}</ul>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className='btn gradiant-btn float-right'
                                                            onClick={() => updateSubscriptionFn(avp.name)}
                                                        >
                                                            Update to {avp.name}
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>


                                        </>
                                    )
                                })} */}
                            </div>
                        </div>




                        <h2 className="font-semibold text-gray-500 mt-12">PAYMENT METHODS</h2>
                        <div className="divider mt-2"></div>

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
            </div>


        </>
    )
}


export default Billing