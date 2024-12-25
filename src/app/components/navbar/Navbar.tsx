'use client'
import * as  React from 'react'
import {sty1,sty2} from '@/app/style'
import { useTheme } from 'next-themes';
import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import {fetchUserAttributes,getCurrentUser,signOut } from "aws-amplify/auth";
import { RootState } from '../../store/state'
import { useSelector, useDispatch } from 'react-redux';
import { setEmail,setIsLogin,setUsername } from '../../store/slice'
import Menu from '../mob_top_bar/page'
function Nav ({isCookie}:{isCookie:boolean}){
    const dispatch = useDispatch();
    const email=useSelector((state:RootState) => state.chat.email);
    const isLogin=useSelector((state:RootState) => state.chat.isLogin);
    const userName=useSelector((state:RootState) => state.chat.userName);


React.useEffect (()=>{
    dispatch(setIsLogin(isCookie))
},[isCookie])

  const signOutUser = async () => {
  
      try {
        await signOut();
        redirect('/')
      } catch (error) {
        console.log(error)
        // console.log(getErrorMessage(error));
      }
  
    }
  
    const getUser = async () => {
      try {
        // const { username } = await getCurrentUser();
        if (isLogin) {
          const user = await fetchUserAttributes();
          if (user) {
            // setIsLogin?.(true)
            dispatch(setUsername?.(user.name||''))
          }
          return user;
        } else {
          window.console.log('User is not signed in');
          return null;
        }
      } catch (error) {
        window.console.log('Error getting current user:', error);
        return null;
      }
    };
getUser()



  const { theme, setTheme } = useTheme();
  const [isMenu, setIsMenu ] = React.useState(false);
const items=[
  {text:"About us"},{text:"Services"}
]
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
   setTheme(newTheme)
  };
  return (
    <nav className={` top-0 p-2 bg-light  text-gray-900 dark:text-white w-full  flex flex-row 
    justify-between items-center md:p-4`}>
      <div className={`${sty1} w-1/3`}>
     <Image
     width={20}
     height={20}
     src={'/logo.svg'}
     alt='loading'
     className="size-8 md:size-10 mr-1"
     />
       <span className={`${sty1} text-md md:text-xl`}> TalkToGPT</span> 
      </div>
   <span className={`hidden md:flex ${sty1} text-sm md:text-md `}>Services</span>
  
  <div className="hidden md:flex rounded-full w-20 h-10 md:w-40 md:h-10 p-1 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600"> 
    {
      isLogin ? (
        
        <div onClick={() => signOutUser()} className={`${sty1} cursor-pointer rounded-full  bg-black text-md w-20 h-10 md:w-40 md:h-10 p-1`}> Logout</div>
        ):(
          <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-md w-20 h-10 md:w-40 md:h-10 p-1`}>  Login/Signup</Link>
      )
    }
    
    </div>
  
<div className="md:hidden w-full flex  flex-row ">

<Menu/>

</div>

  </nav>


  )}

export default Nav
