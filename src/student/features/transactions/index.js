import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])



    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2bVpnVlFTS0Vkc0tJbUd1cjk3SjdBSmNYcTEiLCJmdWxsX25hbWUiOiJBZG1pbiIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9mb3J0aWZ5LXdlbGxuZXNzLmFwcHNwb3QuY29tL3Byb2ZpbGUtaW1hZ2VzL2YyOTg4MTM2LWU3MzMtNGRiZC04ZDg0LTkzNDk3MzJhMzQxMC5qcGc_R29vZ2xlQWNjZXNzSWQ9ZmlyZWJhc2UtYWRtaW5zZGstOG9oajglNDBmb3J0aWZ5LXdlbGxuZXNzLmlhbS5nc2VydmljZWFjY291bnQuY29tJkV4cGlyZXM9MzQwODczMDU2MDAmU2lnbmF0dXJlPXJhZyUyQnFGYUFNUW1kN0lnbUdTR3JEeTN2WU1FckNUJTJCZnVIWEFUYk9yMU1qdWFNQ3R1YW1oZW40blJzQSUyRiUyRklIUkU3NnQ2aWhyTGJMQlFXakNJV2JwZU9rd21yeWZjUkYlMkJBT0dwNXZPWDFWclAlMkZmellidHQ1RUc3bHF4ZW5sJTJCNFk2YTFTZEpzN2dCYyUyQjBiRSUyQkg1cmtBc1EyZnVmOVRrV2RDUGRNNCUyQjNzVmdDdmpLbjRaY092bkgwVjQ5VHd0b3FWVUU1b0klMkJySWx0STd0eGJHNCUyRlVsSmQwZSUyRlEwTVhUZE9BaXViaWdQWkxiWk85czdlYmdHRlRUSTRoaWh4Z0VFZDlQenBRSXVNYldrOWlhVU95REJDZlBScHkwekVGQ1JhSktHZXQzYlVuaHhtWHBLSFg2ZkVPZ2klMkJudTI0JTJCT1VCTk13QWNkcUM2JTJGNUZuazFMdDhTOE5RJTNEJTNEIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTA5ODU4Mzd9.CQIfSIY5zwRRzyiF997CFiHh8UBbuLYxh9itzrP5W5E';


        let resp = await fetch('https://us-central1-fortify-wellness.cloudfunctions.net/api/admin/getUsers?role=professional', {
            headers: {
                'Authorization': token,
            },
        })
        resp = await resp.json();

        console.log("Data --> ", resp);
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}


function Transactions() {


    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }

    return (
        <>

            <TitleCard title="Recent Transactions" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Location</th>
                                <th>Amount</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trans.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>{l.location}</td>
                                            <td>${l.amount}</td>
                                            <td>{moment(l.date).format("D MMM")}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Transactions