'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import {sty1,sty2} from '@/app/style'
import {fetchUserAttributes,getCurrentUser,signOut } from "aws-amplify/auth";
import { RootState } from '../../store/state'
import { useSelector, useDispatch } from 'react-redux';
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isLogin = useSelector((state:RootState) => state.chat.isLogin);
  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const signOutUser = async () => {
  
    try {
      await signOut();
      redirect('/')
    } catch (error) {
   
    }

  }
  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as Node).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div ref={menuRef} className="relative w-full">
      {/* Menu Toggle Icon */}
      <button 
        onClick={toggleMenu} 
        className=" w-full flex flex-row justify-end p-2 rounded-md focus:outline-none"
      >
        {isOpen ? 
        <Image
        src='/close.svg'
        height={10}
        width={10}
        alt="...."
        className="size-10"
        
        /> 
        
        : <Image
        src='/menu.svg'
        height={10}
        width={10}
        alt="...."
        className="size-10"
        />}
      </button>

      {/* Animated Menu */}
      <div 
        className={`
          fixed top-16 right-4 w-64 bg-white shadow-lg rounded-lg 
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
        `}
      >
        <nav className="p-4 text-slate-800">
          <ul className="space-y-3">
            <li>
              <Link 
                href="/about" 
                className="block py-2 px-3 hover:bg-gray-100 rounded-md transition"
              >
                About
              </Link>
            </li>
            <li>
            <Link 
                href="/" 
                className="block py-2 px-3 hover:bg-gray-100 rounded-md transition"
              >
                Services
              </Link>
            </li>
            <li>
            <div className=" md:hidden rounded-full w-24 h-10 mb-4  p-1 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600"> 
  { isLogin ?(
 <div  onClick={()=>signOutUser()}  className={`${sty1} rounded-full  bg-black text-sm w-24 h-10  p-1 text-white cursor-pointer`}> Logout</div>
  ):(
    <Link href="\ui\login" className={`${sty1} rounded-full  bg-black text-sm w-24 h-10  p-1 text-white`}> Login/Signup </Link>
  )

 
  }
  </div>
            </li>
         
          
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;