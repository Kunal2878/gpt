'use client'

import React from 'react'
import Image from 'next/image'
import { sty1 } from '@/app/style'
import  {UseAppContext}  from '../../index'
function ChatNav() {
  const context = UseAppContext();
  const { isMenuOpen,setIsMenuOpen} = context || {};

  return (
    <div className='w-full h-12 lg:h-14 dark:text-white  text-black flex flex-row justify-between items-center p-1 pl-4 pr-4'>
      <div className={`${sty1} rounded-full size-8 hover:bg-gray-500 cursor-pointer `}>
      <Image
      width={10}
      height={10}
      src={'/menu2.svg'}
      alt='loading...'
      className='size-6 cursor-pointer '
      onClick={()=>{setIsMenuOpen?.(!isMenuOpen)}}
       />

      </div>
       <span className='text-xl'>TalkToGPT</span>
       <div className={`size-8 ${sty1} rounded-full  hover:bg-gray-500 cursor-pointer border-2 border-x-violet-700 p-1`}>
       <Image
      width={10}
      height={10}
      src={'/user.svg'}
      alt='loading...'
      className='size-6 rounded-full '
       />

       </div>
    </div>
  )
}

export default ChatNav
