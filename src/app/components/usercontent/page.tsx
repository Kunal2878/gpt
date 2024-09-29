'use client'
import React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
import Content from '../userprompt/prompt'
import ChatLandingPage from '../chatlandingpage/page'
type c_msg ={
  prmt: string;
  content: any;
}

function UserContent() {

  var result: any
  const [prompt, setPrompt] = React.useState('')
  const [content, setContent] = React.useState<c_msg[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isShowPage, setIsShowPage] = React.useState<boolean>(true)
  const [temprompt, setTemPrompt] = React.useState('')
  const blueContainerRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (blueContainerRef.current) {
      blueContainerRef.current.scrollTop = blueContainerRef.current.scrollHeight
    }
  }
  React.useEffect(() => {
    if (content.length > 0) {
      scrollToBottom()
    }
  }, [content])
  const runPrompt = async () => {
    setIsShowPage(false)
    scrollToBottom()
    setIsLoading(true)
    result = await Content(prompt)
if(result)
{
  setIsLoading(false)

}
  

    setContent(prevContent => [
      ...prevContent,
      {
        prmt: prompt,
        content: result
      }
    ]);

  }

  return (
    <div className={`w-full h-full ${sty2} `}>
      <div className={`w-full static h-[calc(100vh-80px)] flex flex-col justify-center bg-gray-900 p-4`}>
       {isShowPage?(

        <div className={`w-full h-full  flex flex-col justify-center items-center`}>
<ChatLandingPage/>
        </div>
       ):
       (
<div className={` w-full h-full  bg-blue-700 pt-20 overflow-hidden overflow-y-auto scroll-smooth  pb-12`}
ref={blueContainerRef}
>
          
          {
  
    content.map((itr, index) => (
      <div className={`w-4/5 lg:w-3/5 ${sty2} mt-4`} key={index}>
        <div className={`w-full flex flex-row justify-start text-white text-sm font-semibold `}>
  {itr.prmt}
        </div>
  
            <div className={`${sty1} w-full min-h-20 rounded-md bg-gray-600 text-white text-sm mt-4 p-4`}>
            {itr.content}
          </div>
          </div>
    ))
  }
  
  
    {
      isLoading && (
     <div className={`w-3/5 ${sty2} p-2  right-0 `}>
  <span className='w-full flex flex-row justify-start'>{prompt}</span>
     <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-600 mt-4">
     <div className="animate-pulse flex space-x-4">
       {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
       <div className="flex-1 space-y-6 py-1">
         <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-green-400 rounded"></div>
         <div className="space-y-3">
           <div className="grid grid-cols-3 gap-4">
             <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-green-400 rounded col-span-2"></div>
             <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-green-400 rounded col-span-1"></div>
           </div>
           <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-green-400 rounded"></div>
         </div>
       </div>
     </div>
   </div>
   </div>
   ) 
   }
  
  
  
  
        </div>

       )


       }
       
       
       
       
       
        
      </div>






      <div className={` bg-gray-900 bottom-0 w-full md:h-20 flex flex-row justify-center items-center p-2 rounded-md mb-12`}>
        <div className={`w-full ${sty1}`}>
          <div className={`size-10 rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-emerald-500 p-1 mr-4 `}>
            <Image
              src={'/clip.svg'}
              width={10}
              height={10}
              alt='....'
              className='size-6 flex flex-row justify-center items-center'
            />
          </div>
          <div className={`w-4/5 lg:w-3/5  bg-white ${sty1} rounded-2xl p-2 `}>
            <input type='text' className={`w-11/12  flex flex-row justify-center items-center text-black outline-none `} placeholder="Write your prompt here"  onChange={(e) => setPrompt(e.target.value)}
  value={prompt} disabled={isLoading!} />
            <div className={` cursor-pointer right-0 mr-1 size-10 rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1 ml-1`} 
            onClick={runPrompt} 
            >
              <Image
                src={'/arrow_up.svg'}
                width={10}
                height={10}
                alt='....'
                className='size-6  flex flex-row justify-center items-center'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default UserContent
