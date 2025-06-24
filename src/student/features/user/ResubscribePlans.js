import React, { useState } from 'react';
import Plans from './components/Plans';
import Header from '../../containers/Header';
import { Show } from '../../../shared/utils/Show';
import PaymentMethodsList from './components/PaymentMethodsList';


const ResubscribePlans = () => {

    const [selectedPlan, setSelectedPlan] = useState("")
    const [paymentMethodListFlag, paymentMethodsListFlag] = useState(false);

    const setThings = (flag, subscriptionPlan) => {
        paymentMethodsListFlag(flag);
        setSelectedPlan(subscriptionPlan);
    }

    return (
        <div className='bg-base-200 h-[100vh]'>
            <Header nonSubscriber={true} />
            <Show>
                <Show.When isTrue={paymentMethodListFlag}>
                    <PaymentMethodsList plan={selectedPlan} paymentMethodsListFlag={paymentMethodsListFlag}/>
                </Show.When>

                <Show.Else>
                    <Plans mode={'resubscribe'} setThings={setThings}/>
                </Show.Else>
            </Show>
        </div>
    )
}

export default ResubscribePlans                                                   