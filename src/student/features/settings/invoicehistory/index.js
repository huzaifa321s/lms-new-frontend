import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TitleCard from "../../../components/Cards/TitleCard"
import { calculateDateAfter30Days, formatDate } from '../../../../shared/utils/helperFunction'
import toast from 'react-hot-toast';
import { updateSubscription } from '../../user/studentAuthSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import { Show } from '../../../../shared/utils/Show'
import PayInvoiceModal from './components/PayInvoiceModal';


// 4000 0000 0000 0341


function InvoiceHistory() {

    const dispatch = useDispatch();

    const [invoices, setInvoices] = useState([]);
    const [invoiceId, setInvoiceId] = useState('');

    // Modal Actions
    const openModal = (modalId, id) => {
        setInvoiceId(id);
        document.getElementById(modalId).showModal();
    }

    const closeModal = (modalId) => {
        document.getElementById(modalId).close();
    }


    // API methods:
    const payInvoice = useCallback(async (id) => {
        try {
            let response = await axios.post(`/student/payment/pay-invoice`, { invoiceId: id });
            response = response.data;
            if (response.success) {

                // If last subscription updates.
                if (response?.data?.subscription && response?.data?.remainingEnrollmentCount) {
                    dispatch(updateSubscription({
                        subscription: response.data.subscription,
                        remainingEnrollmentCount: response.data.remainingEnrollmentCount
                    }));
                }

                toast.success("Payment successful");
                getInvoices();
            }
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData?.metadata?.errorType === 'StripeCardError') {
                toast.error(errorData.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            closeModal('PayInvoiceModal');
        }
    },[axios,toast])

    const getInvoices = useCallback(async () => {
        try {
            let response = await axios.get(`/student/payment/get-invoices`);
            response = response.data;
            if (response.success) {
                setInvoices(response.data);
            }
        } catch (error) {
            console.log("Error ==> ", error)
        }
    }, [axios]);
    


    useEffect(() => {
        getInvoices();
    }, [getInvoices]);


    return (
        <>


            <PayInvoiceModal
                payInvoice={payInvoice}
                invoiceId={invoiceId}
                closeModal={closeModal}
                ModalId={"PayInvoiceModal"}

            />


            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Invoice History
                </div>
            </div>


            <div className='card w-full bg-base-100 shadow-xl h-[80vh]'>
                <div className="card-body" style={{ position: "relative" }}>

                    <div className="overflow-x-auto w-full">
                        <Show>
                            <Show.When isTrue={invoices.length > 0}>
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th className="w-1/7">Inv. ID</th>
                                            <th className="w-1/7">Subscription. ID</th>
                                            <th className="w-1/7">Plan</th>
                                            <th className="w-1/7">Issue Date</th>
                                            <th className="w-1/7">Due Date</th>
                                            <th className="w-1/7">Paid Date</th>
                                            <th className="w-1/7">Amount</th>
                                            <th className="w-1/7">Status</th>
                                            <th className="w-1/7">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map((i, k) => {
                                            const { name, price } = i.plan_details;
                                            return (
                                                <tr key={k} >
                                                    <td>
                                                        <span className='text-xs font-semibold text-gray-500'>
                                                            {i.invoice_id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className='text-xs font-semibold text-gray-500'>
                                                            {i.subscription_id}
                                                        </span>
                                                    </td>
                                                    <td>{name}</td>
                                                    <td>{i.issue_date}</td>
                                                    <td>{i.due_date}</td>
                                                    <td>{i.paid_at}</td>
                                                    <td>${i.amount}</td>
                                                    <td>{i.invoice_status}</td>
                                                    <td>
                                                        <Show >
                                                            <Show.When isTrue={i.invoice_status === 'Open'}>
                                                                <button className='btn btn-xs' onClick={() => openModal('PayInvoiceModal', i.invoice_id)}>Pay</button>
                                                            </Show.When>

                                                            <Show.Else>
                                                                <span className='ml-2'>—</span>
                                                            </Show.Else>

                                                        </Show>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </Show.When>

                            <Show.Else>
                                <div className='m-4'>No invoice history to show.</div>
                            </Show.Else>
                        </Show>

                    </div>
                </div>
            </div>


        </>
    )
}


export default InvoiceHistory