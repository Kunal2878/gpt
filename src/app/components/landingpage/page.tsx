"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {sty1} from '@/app/style'
import  {UseAppContext}  from '../../index'
function Landingpage() {
  const context = UseAppContext();
  const { isLogin, userName} = context || {};
  return (
    <div className=' w-full  text-gray-900 dark:text-white flex flex-col justify-center items-center mt-20'
    >
      <div className='hidden w-full md:flex flex-row justify-center items-center text-4xl md:text-6xl p-2 text-transparent bg-clip-text bg-gradient-to-tl from-pink-600 via-indigo-600 to-pink-400 '>
        {
          isLogin ? (
            <span> Hi, {userName}</span>
          ):(
            <span>Introducing TalkToGPT </span>
          )

        }      
        </div>
     
      <div className='w-full md:hidden flex flex-row justify-center items-center  '> 
        
      <div className=' w-full flex flex-nowrap justify-center items-center text-5xl  text-transparent    bg-clip-text bg-gradient-to-tl from-pink-600 via-indigo-600 to-pink-400 '>
        {
          isLogin ? (
            <span> Hi, {userName}</span>
          ):(
            <div className="w-full flex-col ">
            <span className='w-full  flex flex-row justify-center items-center  '>Introducing</span>
            <span className='w-full  flex flex-row justify-center items-center mt-4 '> TalkToGPT </span>
          </div>
          )

        }
    
        
        </div>


      </div>
      <p className='w-full md:w-1/2 flex flex-row justify-center items-center text-[14px] md:text-[15px] p-4 mt-8 text-transparent bg-clip-text bg-gradient-to-t from-gray-600   to-white'>Welcome to a realm where innovation meets intelligence—our cutting-edge GPT technology is designed to transform your ideas into reality, offering you unprecedented insights and solutions. Dive into a world where every conversation sparks inspiration and every query leads to a breakthrough</p>
    
    <div className={`${sty1} absolute w-full mt-8 md:mt-12 text-gray-900 p-4 bottom-0 mb-8 md:mb-0`}>
    <Link href="store/user-chat" className={` ${sty1} hover:scale-125 md:w-40 w-32 h-10 rounded-full text-[14px] md:text-[16px] bg-white font-semibold transition-all delay-200`}>Try now
    <Image
    src={'/top-right-arrow.svg'}
    width={10}
    height={10}
    className='ml-2 size-5'
    alt="..."
    
    
    />
    </Link>
    <Link href="/" className={`${sty1} w-44 p-1 md:w-60 h-10 rounded-full md:text-[16px] text-[12px] text-white font-semibold`}>Learn about TalkToGPT &gt; </Link>
    </div>
    </div>

  )
}

export default Landingpage
