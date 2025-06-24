import React from 'react'

const PayInvoiceModal = ({ payInvoice, invoiceId , closeModal, ModalId }) => {
    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box w-[600px]">
                <h3 className="text-lg"><span className='font-bold'>Pay Inv. #</span> {invoiceId}</h3>
                <p className="font text-md">We'll use your Default card for the payment.</p>
                <div className="modal-action">
                    <button className="btn gradiant-btn float-right" onClick={() => payInvoice(invoiceId)}>Confirm</button>
                    <button className="btn" onClick={() => closeModal(ModalId)}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default PayInvoiceModal