'use client'
import * as React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
import Content from '../userprompt/prompt'
import crypto from 'crypto'
import ChatLandingPage from '../chatlandingpage/page'
import  {UseAppContext}  from '../../index'
import FileUpload from '../file_upload/page'

type c_msg ={
  prmt: string;
  content: any;
}

function UserContent() {

  var result: any
  var gen_data='gen_data'
  var insert_room = "insert room"
  const context = UseAppContext();
  const {isLogin, setIsLogin, currIndex,setCurrIndex,setUserName,email,setEmail,chatRooms,setChatRooms,setContent,content,chatRoomData,setChatRoomData,currRid,newContent,setNewContent} = context || {};
  const [prompt, setPrompt] = React.useState('')
  const [loggedIn, setLoggedIn]= React.useState(false)
  const [Email, setemail]=React.useState('')

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isShowPage, setIsShowPage] = React.useState<boolean>(true)
  const [isFileUpload, setIsFileUpload] = React.useState<boolean>(false)
  const [filePrompt, setfilePrompt] = React.useState<string>("")
  // const[currIndex,setCurrIndex]= React.useState<number>(0)
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
React.useEffect(() => {
  setLoggedIn(true)
  setEmail?.(email)
}, [isLogin,email])




  const runPrompt = async () => {
 
    // setEmail?.("kunalpaul673@gmail.com");
    // setIsLogin?.(true);
    scrollToBottom();
    setIsLoading(true);

    // getting response for the prompt
    result = await Content(prompt,currRid, loggedIn, email,"gen_data");
    console.log("currRid",currRid)
    if (result) {
      setContent?.((prevContent: any) => [
        ...prevContent,
        {
          prmt: prompt,
          des: result,
          rmid:currRid
        }
      ]);
      setChatRooms?.((prevChatRooms: any) => {
        const updatedChatRooms = [...prevChatRooms];
        updatedChatRooms[currIndex!] = {prmt:prompt,id:updatedChatRooms[currIndex!].id};
        updatedChatRooms[currIndex!] = {prmt:prompt,id:currRid};
        return updatedChatRooms;
      });
      setNewContent?.(content)
      setIsLoading(false);
    }
  };

  const nextRoom = async () => {
    // setNewContent?.(content)
    setContent?.([])
    setPrompt('')
    if(isLogin){
    const rm_id=  await Content('',currRid, loggedIn, Email,"insert room");
   setChatRooms?.((prevChatRooms: any) => {
      const updatedChatRooms = [...prevChatRooms,{prmt:"New chat",id:rm_id}];
    // updatedChatRooms[currIndex] = {prmt:"New chat",id:rm_id};
      return updatedChatRooms;
    
    });
    }
if(!isLogin){
  const id = crypto.randomBytes(16).toString('hex');
  setChatRooms?.((prevChatRooms: any) => {
    const updatedChatRooms = [...prevChatRooms,{prmt:"New chat",id:id}];
    return updatedChatRooms;
})
}
setChatRoomData?.((prevData: any[]) => {
  const newData = [...prevData]
  newData[currIndex] = newContent
  return newData
})
  
// setCurrIndex(currIndex + 1)

setCurrIndex?.(chatRooms.length)
    setIsShowPage(true)
   
  }


  return (
   
   <div className={`w-full h-full ${sty2} `}>
      <div className={`w-full static h-[calc(100vh-80px)]  flex flex-col justify-center p-4`}>
       {isShowPage&& content.length==0 ? (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <ChatLandingPage/>
        </div>
       ) : (
        <div className={`w-full h-full  pt-20 overflow-hidden overflow-y-auto scroll-smooth pb-12`}
          ref={blueContainerRef}
        >
          {
          content.length>0 && content.map((itr:any, index:any) => (

              itr.rmid===currRid&&(

             
        
                  <div className={`w-4/5 lg:w-3/5 ${sty2} mt-4`} key={index}>

              <div className={`w-full flex flex-row justify-start text-white text-sm font-semibold`}>
              <div className= { `size-6 ${sty1} mr-2  border-x-violet-700 p-1 drop-shadow-lg shadow-slate-300`}>
                <Image
                width={10}
                height={10}
                src={"/user.svg"}
                alt='....'
                className='size-4'
                /></div>
                {itr.prmt}
              </div>
              <div className={`${sty1} w-full min-h-20 rounded-md bg-gray-600 text-white text-sm mt-4 p-4`}>
                
              <div className= { `size-6 ${sty1} mr-2 border-x-violet-700 p-1 drop-shadow-lg shadow-slate-300`}>
                <Image
                width={10}
                height={10}
                src="/logo.svg"
                alt='....'
                className='size-4'
                /></div>{itr.des}
              </div>
              </div>
           )
              
          )
          
          
          )}

          {isLoading && (
            <div className={`w-3/5 ${sty2} p-2 right-0`}>
              <span className='w-full flex flex-row justify-start'>
                <div className= { `size-6 ${sty1} mr-2`}>
                <Image
                width={10}
                height={10}
                src={"/user.svg"}
                alt='....'
                className='size-4'
                />

                </div>
                {prompt}
                
                </span>
              <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-600 mt-4">
                <div className="animate-pulse flex space-x-4">
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
          )}

          
        </div>
       )}
      </div>


{
  isFileUpload && !isLoading && (

<div className={`w-1/2 ${sty2} absolute top-1/2 left-1/2`}>


<FileUpload/>
<div className={`w-full ${sty1} bg-white`}>
<input type="text" 
placeholder='Enter your prompt here '
onChange={(e) => setfilePrompt(e.target.value)}
onClick={() => setIsFileUpload?.(true)}
value={filePrompt}
 
/>
<div 
              className={`cursor-pointer right-0 mr-1 size-10 rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1 ml-1`} 
              onClick={runPrompt} 
            >
              <Image
                src={'/arrow_up.svg'}
                width={10}
                height={10}
                alt='....'
                className='size-6 flex flex-row justify-center items-center'
              />
            </div>
</div>

</div>
  )

}

      <div className={` bottom-0 fixed w-full h-20   flex flex-row justify-center  pl-2 pr-2 rounded-md `}>
        <div className={`w-full ${sty1}`}>
          <div className={`size-10 rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-emerald-500 p-1 mr-4`}>
            <Image
              src={'/clip.svg'}
              width={10}
              height={10}
              alt='....'
              className='size-6 flex flex-row justify-center items-center'
            />
          </div>
          <div className={`w-4/5 lg:w-3/5 bg-white ${sty1} rounded-2xl p-2`}>
            <input 
              type='text' 
              className={`w-11/12 bg-white flex flex-row justify-center items-center text-black outline-none`} 
              placeholder="Write your prompt here"  
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt} 
              disabled={isLoading} 
            />
            <div 
              className={`cursor-pointer right-0 mr-1 size-9 md:size-10d rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1 ml-1`} 
              onClick={runPrompt} 
            >
              <Image
                src={'/arrow_up.svg'}
                width={10}
                height={10}
                alt='....'
                className='size-6 flex flex-row justify-center items-center'
              />
            </div>
            <div 
              className={`cursor-pointer right-0 mr-1 size-9 md:size-10  rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1 ml-1`} 
              onClick={nextRoom}
            >
              <Image
                src={'/plus_icon.svg'}
                width={10}
                height={10}
                alt='....'
                className='size-6 flex flex-row justify-center items-center'
               
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  






}
export default UserContent
