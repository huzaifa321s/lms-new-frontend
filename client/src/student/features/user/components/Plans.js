import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateSubscription } from "../studentAuthSlice";
import { useNavigate } from 'react-router-dom';
import { Show } from '../../../../shared/utils/Show';
import subscriptionPlansArr from '../../../utils/subscriptionPlansArr';


const subscriptions = subscriptionPlansArr;


const Plans = ({ mode, setThings }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CUSTOMER_ID = useSelector((state) => state.studentAuth.credentials.customerId);

    const buySubscription = async (subscriptionType) => {
        try {
            let response = await axios.post("/student/payment/buy-subscription", { plan: subscriptionType });
            response = response.data;
            if (response.success) {
                dispatch(updateSubscription(response.data));
                navigate("/student/welcome")
            }
        } catch (error) {
            console.log("Registration Error --> ", error);
        }
    }


    const handleClick = (subscription) => {
        setThings(true, subscription);
    }


    return (

        <div className="flex justify-center items-center min-h-[85vh]">
            <div className="w-full max-w-screen-lg mx-auto p-6">
                <Show>
                    <Show.When isTrue={mode === 'resubscribe'}>
                        <h1 className="text-3xl font-bold mb-3 text-left">Welcome Back! Select Your Ideal Plan</h1>
                        <div className="text-gray-500 text-left mb-12">Choose a plan that fits your needs today. You can always upgrade later for more features and benefits.</div>

                    </Show.When>
                    <Show.Else>
                        <h1 className="text-3xl font-bold mb-3 text-left">Choose your plan</h1>
                        <div className="text-gray-500 text-left mb-12">Get the right plan for you, plan can be upgraded in future.</div>
                    </Show.Else>
                </Show>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {subscriptions.map((s, k) => (
                        <div key={k} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-3 text-center">{s.name}</h2>
                                <div className="min-h-[200px] flex flex-col justify-between">
                                    <div className="text-5xl font-bold text-left mb-8">{s.price}</div>
                                    <ul className="text-gray-700 text-left flex flex-col gap-4">
                                        {s.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="text-blue-800">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="card-actions justify-end mt-6">
                                    <button className="btn gradiant-btn float-right" onClick={() => handleClick(s)}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default Plans