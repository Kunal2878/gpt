'use client'
import * as React from 'react'
import {sty1,sty2} from '../../style'
import UserContentList from '../usercontentlist'
import UserContent from '../usercontent2'
import ChatNav from '../chatNav'
import Avatar from '../avatar'
import { UseAppContext } from '../../index'
// import Content from '../../../app/components/userprompt/prompt'
import {fetchUserAttributes,getCurrentUser,signOut } from "aws-amplify/auth";
function UserContentTemp({isCookieData}:{isCookieData:boolean}) {
  const [isLoading, setIsLoading]= React.useState(true)
  const context = UseAppContext();
  const {isAvatarMenu, isLogin, setIsLogin, setUserName, setEmail,email,setChatRooms,setChatRoomData,chatRoomData} = context || {};
  
  if(isCookieData) {
    const fetchUser = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        setIsLogin?.(true);
        setUserName?.(userAttributes.name);
        setEmail?.(userAttributes.email);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    fetchUser();
  }





  
React.useEffect(() => {

const timer = setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return () => clearTimeout(timer);

 })





  return (
    <div className={`relative w-screen bg-gradient-to-r from-black  to-indigo-700 h-screen flex flex-col justify-starttext-white overflow-hidden`}>
      {!isLoading && (
        <>
          {isAvatarMenu && (
            <div className=' absolute top-0 z-50 w-1/4  transition-opacity delay-800 '>
              <Avatar />
            </div>
          )}
          <div className=' absolute top-0 z-40 w-full'>
            <ChatNav />
          </div>
          <div className='w-full  h-screen mt-7 flex flex-row '>
            {/* h-[calc(100vh-48px)] lg:h-[calc(100vh-56px)] */}
            <UserContentList/>
            <div className='fixed z-10 w-full h-[calc(100vh-30px)] lg:h-[calc(100vh-36px)]  flex flex-row justify-center pt-6'>
            <UserContent />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
  export default UserContentTemp