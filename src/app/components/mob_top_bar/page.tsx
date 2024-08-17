import React from 'react'
import {sty1,sty2} from '../../style'
import Link from 'next/link'
function Mob_topbar() {
    const items = [
        { icon: 'smile.svg', text:"Services",path:"/content/joke_content" },
        { icon: 'trend.svg',text:"Trending",path:"/content/trend_content"},
        
      ];
  return (
    <nav className={`${sty1} w-1/4 h-60 `}>
      
        <ul className={`${sty1} w-full h-full`}>
      {
items.map((itr,index)=>(
<li key={index} className={`${sty1} p-2 bg-gray-900 text-white hover:bg-white hover:text-gray-900`}>
    <Link href="/">
    {itr.text}

    </Link>
    
    </li>
))
}
</ul>
    </nav>
  )
}

export default Mob_topbar
