import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreateCourse from '../../features/courses/CreateCourse'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPageTitle({ title : "Create Course"}))
    //     console.log("Hello here")
    //   }, [])


    return(
        <CreateCourse />
    )
}

export default InternalPage