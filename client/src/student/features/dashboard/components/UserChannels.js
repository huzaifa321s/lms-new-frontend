import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    { title: "Facebook Ads", noOfStudents: "26,345", createdAt: 'April 9, 2024 at 03:05 AM' },
    { title: "Google Ads", noOfStudents: "21,341", createdAt: 'April 9, 2024 at 03:05 AM' },
    { title: "Instagram Ads", noOfStudents: "34,379", createdAt: 'April 9, 2024 at 03:05 AM' },
    { title: "Affiliates", noOfStudents: "12,359", createdAt: 'April 9, 2024 at 03:05 AM' },
    { title: "Organic", noOfStudents: "10,345", createdAt: 'April 9, 2024 at 03:05 AM' },
]

function TopCourses() {
    return (
        <TitleCard title={"Top Courses (Dummy data)"}>
            {/** Table Data */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="normal-case">Title</th>
                            <th className="normal-case">No. of Students</th>
                            <th className="normal-case">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return (
                                    <tr key={k}>
                                        <th>{k + 1}</th>
                                        <td>{u.title}</td>
                                        <td>{u.noOfStudents}</td>
                                        <td>{u.createdAt}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default TopCourses