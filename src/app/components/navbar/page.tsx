'use client'

import Nav from "./Navbar"
import { cookies } from 'next/headers'
const Navbar = (cookieData:any) => {

let isCookie: boolean = false
if(cookieData.cookieData!==undefined){
  isCookie = true
}

  return (
    <div className="w-full">
      <Nav isCookie={isCookie} />
    </div>
  )
}

export default Navbar
