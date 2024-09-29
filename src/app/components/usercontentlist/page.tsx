'use client'
import * as React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
import  {UseAppContext}  from '../../index'
 
function UserContentList() {
  const context = UseAppContext();
  const { email,isMenuOpen} = context || {};


  const dim = window.innerWidth

  const [inSize, setInsize] = React.useState<number>(44)


  return (

    <aside className={` ${isMenuOpen? `  animate-slide_right_left transition-all ease-in duration-1000 p-[2px] mt-8 z-50 flex flex-col w-52 lg:w-48 h-full border-2 dark:bg-gray-900 bg-white dark:text-white text-gray-900  border-gray-500 overflow-hidden hover:overflow-y-auto`:"hidden"}     `}> 
    
    </aside>

  )
}
export default UserContentList
