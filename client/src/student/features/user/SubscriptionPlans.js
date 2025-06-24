import React, { useState } from 'react';
import Plans from './components/Plans';
import Header from '../../containers/Header';
import { Show } from '../../../shared/utils/Show';
import CardForm from './components/CardForm';


const Subscriptions = () => {

    const [selectedPlan, setSelectedPlan] = useState("")
    const [cardDetailsFlag, setCardDetailsFlag] = useState(false);

    const setThings = (flag, subscriptionPlan) => {
        setCardDetailsFlag(flag);
        setSelectedPlan(subscriptionPlan);
    }

    return (
        <div className='bg-base-200 h-[100vh]'>
            <Header nonSubscriber={true} />
            <Show>
                <Show.When isTrue={cardDetailsFlag}>
                    <CardForm plan={selectedPlan} setCardDetailsFlag={setCardDetailsFlag}/>
                </Show.When>

                <Show.Else>
                    <Plans setThings={setThings}/>
                </Show.Else>
            </Show>
        </div>
    )
}

export default Subscriptions                                                   