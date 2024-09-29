import React from 'react'
import {sty1,sty2} from '../../style'
import UserContentList from '../usercontentlist/page'
import UserContent from '../usercontent/page'
import ChatNav from '../chatNavbar/page'
function UserContentTemp() {

    return (
      <div className={`relative w-screen  h-screen flex flex-col justify-start dark:bg-gray-900 bg-white dark:text-white text-gray-900 overflow-hidden`}>
            <div className=' absolute top-0 z-50 w-full'>

            <ChatNav />
            </div>
            <div className='w-full  h-screen mt-7 flex flex-row '>
            {/* h-[calc(100vh-48px)] lg:h-[calc(100vh-56px)] */}
          <UserContentList/>

        <div className='fixed z-10 w-full h-[calc(100vh-30px)] lg:h-[calc(100vh-36px)]  flex flex-row justify-center pt-6'>
          <UserContent />
        </div>
            </div>

      </div>
    )
  }

  export default UserContentTemp