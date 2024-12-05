import React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
function Body_com() {
    const content=
    [
        {img:"/f1_img.png", bg:"/f1_img.jpg", txt:"Writes, brainstroms, edits, and explores ideas with you...."}, 
         {img:"/f2_img.png", bg:"/f2_img.jpg", txt:"Generate story, poem and summarise it...."}, 
        {img:"/f3_img.png", bg:"/f3_img.jpg", txt:"Get response in your desired languages...."}, 
      ]
  return (
    <div className={`${sty2} w-full lg:p-4 p-2 mt-20 mb-6 `}>

      {
        content.map((itr,index)=>(
            
<div key={index} className={`${sty2} w-full p-4 flex flex-col justify-center items-center`} >
<span className={`${sty1}  text-transparent bg-clip-text bg-gradient-to-t from-gray-600  to-white justify-center items-center w-3/5 gap-3 flex-wrap mb-16 text-xl lg:text-4xl`}> {itr.txt}
</span>
<div className={`${sty1} w-3/4 p-4 h-80 rounded-md`} style={{backgroundImage: `url(${itr.bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
<Image 
unoptimized={true}
src={itr.img}
width={10}
height={10}
alt="..."
className='w-4/5 h-56 rounded-lg'
/>


</div>
</div>
        ))
      }
    </div>
  )
}

export default Body_com

