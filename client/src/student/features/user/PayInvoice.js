import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PayInvoice = () => {

  const credentials = useSelector((state) => state.studentAuth.credentials);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-[650px]">
          <h1 className='font-bold text-2xl'>Dear {credentials?.firstName}, your subscription is expired!</h1>

          <ul className="list-disc list-inside mt-6">
            <li className='font-semibold'>Go to <Link to={"/student/settings-invoice"} className='btn-link'>Invoice</Link> settings.</li>
            <li className='font-semibold'>Clear debts against Subscription ID. {credentials?.subscription?.subscriptionId}.</li>
            <li className='font-semibold'>Enjoy features again!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PayInvoice