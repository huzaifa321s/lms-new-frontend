import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import InvoiceHistory from '../../features/settings/invoicehistory'

function InternalPage(){

    return(
        <InvoiceHistory />
    )
}

export default InternalPage