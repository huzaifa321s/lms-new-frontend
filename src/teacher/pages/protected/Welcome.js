import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link} from 'react-router-dom'
import TemplatePointers from '../../features/user/components/TemplatePointers'

function InternalPage(){

  const credentials = useSelector((state) => state.teacherAuth.credentials);

    return(
      <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-lg">
        <h1 className='font-bold text-2xl'>Welcome {credentials?.firstName}, to Teacher's Panel</h1>
        </div>
      </div>
    </div>
    )
}

export default InternalPage