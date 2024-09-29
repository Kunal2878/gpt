'use client'
import * as  React from 'react'
import {sty1,sty2} from '@/app/style'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link'
import {fetchUserAttributes,  } from "aws-amplify/auth";
import  {UseAppContext}  from '../../index'
const Navbar =  ()  => {
  const context = UseAppContext();
  const {isLogin, setIsLogin, setUserName} = context || {};
    const getUser = async () => {
      try {
        const user = await fetchUserAttributes();
        if(user){

          setIsLogin?.(true)
          setUserName?.(user.name)

        }
        return user;
      } catch (error) {
        console.error('Error getting current user:', error);
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
    <nav className={` top-0 p-2 bg-light  text-gray-900 dark:text-white w-full  flex flex-row justify-between items-center md:p-4`}>
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

   <div className={`w-12 md:w-16 h-8 flex flex-row items-center rounded-xl`}>
      
   <div className={`${theme ==='light'?'bg-yellow-600 ':' bg-gray-600'} p-1`}>
<label htmlFor="light" onClick={toggleTheme} className={` ${theme === 'dark'?'bg-yellow-600 cursor-pointer':' cursor-none bg-gray-600'}`}>  
    <Image
     width={20}
     height={20}
     src={'/sun.svg'}
     alt='loading'
     className={`${theme==='light'?'bg-yellow-600 ':' bg-gray-600'} size-6 md:size-8`}
     />
      </label>


   </div>


  

  <label htmlFor="dark" onClick={toggleTheme} className={` w-1/2 ${theme === 'light'?'cursor-pointer':'cursor-none bg-gray-600'} ml-4`}>
      <Image
     width={20}
     height={20}
     src={ '/moon.svg'}
     alt='loading'
     className={`${theme==='dark'?'bg-blue-600 ':' bg-gray-600'} size-6 md:size-8 rounded-full`}
     />

      </label>
    </div>

  
  <div className="hidden md:flex rounded-full w-20 h-10 md:w-40 md:h-10 p-1 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600"> 
    {
      isLogin ? (
        <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-md w-20 h-10 md:w-40 md:h-10 p-1`}> Logout </Link>

      ):(
        <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-md w-20 h-10 md:w-40 md:h-10 p-1`}> Login/Signup </Link>
      )
    }
    
    </div>
  
  {/* For mobile devices */}
  
  <div className={`size-12 md:hidden flex  ${sty1}` } onClick={()=>{isMenu?setIsMenu(false):setIsMenu(true)}}>
<Image
src={'/menu.svg'}
width={10}
height={10}
alt="..."
className="size-10"

/>

  </div>
  

{
  isMenu && (
    <div className={`${sty2} w-40 p-2 rounded-md absolute top-0 right-0 mr-4 mt-2 dark:bg-white bg-gray-900 dark:text-gray-900 text-white`} >

<Link  href="/about" className={`${sty1} text-sm mb-2`}> About us
</Link>
<Link href="/" className={`${sty1} text-sm mb-4`}> Services
</Link>

<div className=" md:hidden rounded-full w-24 h-10 mb-4  p-1 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600"> 
  { isLogin ?(
 <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-sm w-24 h-10  p-1 text-white`}> Logout</Link>
  ):(
    <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-sm w-24 h-10  p-1 text-white`}> Login/Signup </Link>
  )

 
  }

</div>
  
 
    </div>
  )
}
  </nav>

  )
}

export default Navbar
