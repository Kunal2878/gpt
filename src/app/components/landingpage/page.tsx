"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {sty1,sty2} from '@/app/style'
import  {UseAppContext}  from '../../index'
function Landingpage() {
  const context = UseAppContext();
  const { isLogin, userName} = context || {};
  return (
    <div className=' w-full bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col justify-center items-center mt-20'>
      <div className='hidden w-full md:flex flex-row justify-center items-center text-4xl md:text-6xl p-2 text-transparent bg-clip-text bg-gradient-to-tl from-pink-600 via-indigo-600 to-pink-400 '>
        {
          isLogin ? (
            <span> Hi, {userName}</span>
          ):(
            <span>Introducing TalkToGPT </span>
          )

        }
    
        
        </div>
     
      <div className='w-full md:hidden flex flex-row justify-center items-center text-6xl'> 
        
      <div className=' w-full flex flex-row justify-center items-center text-4xl p-2 text-transparent bg-clip-text bg-gradient-to-tl from-pink-600 via-indigo-600 to-pink-400 '>
        {
          isLogin ? (
            <span> Hi, {userName}</span>
          ):(
            <span>Introducing TalkToGPT </span>
          )

        }
    
        
        </div>


      </div>
      <p className='w-full md:w-1/2 flex flex-row justify-center items-center text-[12px] md:text-[14px] text-white p-4 mt-8'> Welcome to a realm where innovation meets intelligence—our cutting-edge GPT technology is designed to transform your ideas into reality, offering you unprecedented insights and solutions. Dive into a world where every conversation sparks inspiration and every query leads to a breakthrough</p>
    
    <div className={`${sty1} absolute w-full mt-12 text-gray-900 p-4 bottom-0 mb-8 md:mb-0`}>
    <Link href="components/usercontenttemp" className={` ${sty1} md:w-40 w-32 h-10 rounded-full text-[14px] md:text-[16px] bg-white font-semibold`}>Try now
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
