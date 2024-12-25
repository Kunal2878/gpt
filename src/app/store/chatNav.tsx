'use client'

import React from 'react'
import Image from 'next/image'
import { sty1 } from '@/app/style'

import Link from 'next/link'
import { RootState } from './state'
import { useSelector, useDispatch } from 'react-redux';
import { 
setIsAvatarMenu,setMenu

} from './slice'
function ChatNav() {
    const dispatch = useDispatch();
    const isMenu = useSelector((state: RootState) => state.chat.isMenu);
    const isLogin = useSelector((state:RootState) => state.chat.isLogin);
    
    const isAvatarMenu = useSelector((state:RootState) => state.chat.isAvatarMenu);
    const avatar = useSelector((state:RootState) => state.chat.avatar);

  return (
    <div className='w-full h-12 lg:h-14 flex flex-row justify-between items-center p-1 pl-4 pr-4 bg-black/50'>
      <div className={`${sty1} rounded-full size-8 hover:bg-gray-500 cursor-pointer `}>
      <Image
      width={10}
      height={10}
      src={'/menu2.svg'}
      alt='loading...'
      className='size-6 cursor-pointer '
      onClick={()=>{dispatch(setMenu(!isMenu))}}
       />

      </div>
       <span className='text-xl'>TalkToGPT</span>
       <div className={`size-8 ${sty1} rounded-full  hover:bg-gray-500 cursor-pointer border-2 border-x-violet-700 p-1`}>
        {
          isLogin? (
            <Image
           width={10}
           height={10}
           src={avatar!=='' ? avatar:'/solid_user.svg'}
           alt='loading...'
           className='size-6 rounded-full '
           onClick={()=>{setIsAvatarMenu?.(!isAvatarMenu)}}
            />
            
            
            ):
            (
            <Link href="/ui/login">
            <Image
           width={10}
           height={10}
           src={avatar ||'/solid_user.svg'}
           alt='loading...'
           className='size-6 rounded-full '
           />
           </Link>

          )
        }

       </div>
    </div>
  )
}

export default ChatNav
