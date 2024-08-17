import React from 'react'
import {sty1,sty2} from '@/app/style'
import Image from 'next/image'
import Link from 'next/link'
function Navbar() {
  return (
    <nav className={`bg-gray-900 text-white w-full  flex flex-row justify-between items-center md:p-4`}>
      <div className={`${sty1} md:w-1/3`}>
     <Image
     width={20}
     height={20}
     src={'/logo.svg'}
     alt='loading'
     className="size-10"
     
     />
       <span className={`${sty1} text-xl`}> TalkToGPT</span> 
      </div>
   <span className={`${sty1} text-md `}>Services</span>
  <div className="rounded-full w-20 h-10 md:w-40 md:h-10 p-1 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600"> <Link href="/login" className={`${sty1} rounded-full  bg-black text-md w-20 h-10 md:w-40 md:h-10 p-1`}> Login/Signup </Link></div>
    </nav>
  )
}

export default Navbar
