import React from 'react'
import {sty1,sty2} from '../../style'
import UserContentList from '../usercontentlist/page'
import UserContent from '../usercontent/page'
function UserContentTemp() {
  return (
    <div className={`w-full h-screen ${sty1} `}>
      <aside className='min-w-28 h-full'>
<UserContentList/>

      </aside>
<div className=' h-full'>

<UserContent/>
</div>

    </div>
  )
}

export default UserContentTemp