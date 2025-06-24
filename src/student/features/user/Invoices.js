import React from 'react'
import PaymentMethodsList from './components/PaymentMethodsList'
import Header from '../../containers/Header'
import { Show } from '../../../shared/utils/Show'

const Invoices = () => {
  return (
    <div className='bg-base-200 h-[100vh]'>
      <Header nonSubscriber={true} />
      <Show>
        <Show.When isTrue={true}>
          Hello
          {/* <PaymentMethodsList plan={selectedPlan} paymentMethodsListFlag={paymentMethodsListFlag} /> */}
        </Show.When>

        <Show.Else>
          {/* <Plans mode={'resubscribe'} setThings={setThings} /> */}
        </Show.Else>
      </Show>
    </div>
  )
}

export default Invoices