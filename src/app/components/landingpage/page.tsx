import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {sty1,sty2} from '@/app/style'
function Landingpage() {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-20'>
      <div className='w-full flex flex-row justify-center items-center text-4xl md:text-6xl text-white '>Introducing TalkToGPT</div>
      <p className='w-full md:w-1/2 flex flex-row justify-center items-center text-[12px] text-gray-400 p-2 mt-8'>Welcome to a realm where innovation meets intelligence—our cutting-edge GPT technology is designed to transform your ideas into reality, offering you unprecedented insights and solutions. Dive into a world where every conversation sparks inspiration and every query leads to a breakthrough.</p>
    
    <div className={`${sty1} w-full mt-12 text-gray-900`}>
    <Link href="/usercontenttemp" className={` ${sty1} w-40 h-10 rounded-full text-[16px] bg-white font-semibold`}>Try now
    <Image
    src={'/top-right-arrow.svg'}
    width={10}
    height={10}
    className='ml-2 size-5'
    alt="..."
    
    
    />
    </Link>
    <Link href="/" className={`${sty1} w-60 h-10 rounded-full text-[16px] text-white font-semibold`}>Learn about TalkToGPT &gt; </Link>
    </div>
    </div>

  )
}

export default Landingpage
