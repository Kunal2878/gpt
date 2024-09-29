import React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
function Body_com() {
    const content=
    [
        {img:"", bg:"/f1_img.jpg", txt:"Writes, brainstroms, edits, and explores ideas with you"}, 
         {img:"", bg:"/f2_img.jpg", txt:""}, 
        {img:"", bg:"/f3_img.jpg", txt:""}, 
        {img:"", bg:"/f4_img.jpg", txt:""},]
  return (
    <div className={`${sty2} w-full lg:p-4 p-2 mt-20 mb-6 `}>

      {
        content.map((itr,index)=>(
            
<div key={index} className={`${sty2} w-full p-4`} >
<span className={`${sty1}  justify-center items-center w-3/5 gap-3 flex-wrap mb-16 text-xl lg:text-4xl`}> {itr.txt}
</span>
<div className={`${sty1} w-full p-2`} style={{backgroundImage: `url(${itr.bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
<Image 
unoptimized={true}
src={itr.img}
width={10}
height={10}
alt="..."
className='w-11/12 h-60'
/>


</div>
</div>
        ))
      }
    </div>
  )
}

export default Body_com

