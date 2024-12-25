'use client'
import * as React from 'react'
import {sty1,sty2} from '../../app/style'
import Image from 'next/image'
import Content from './prompt'

import ChatLandingPage from './chatlandingpage/page'
import FileUpload from './file_upload/page'
import {FileContent} from './filerompt'
import { RootState } from './state'
import { useSelector, useDispatch } from 'react-redux';
import { 
  addRoom, 
  addMessage, 
  setActiveRoom,
  setActivPrompt,
  updateLastPrompt, 
  setShowError
} from './slice'



function UserContent() {

const dispatch = useDispatch();
const rooms = useSelector((state: RootState) => state.chat.rooms);
const activeRoomId = useSelector((state:RootState) => state.chat.activeRoomId);
const messages = useSelector((state:RootState) => state.chat.messages);
const prompt = useSelector((state:RootState) => state.chat.prompt);
const isLogin = useSelector((state:RootState) => state.chat.isLogin);
const email=useSelector((state:RootState) => state.chat.email);
const avatar=useSelector((state:RootState) => state.chat.avatar);
const files = useSelector((state: RootState) => state.chat.files);

  var result: any


  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isShowPage, setIsShowPage] = React.useState<boolean>(true)
  const [isFileUpload, setIsFileUpload] = React.useState<boolean>(false)
  const [filePrompt, setfilePrompt] = React.useState<string>("")
  const [partialPrompt, setPartialPrompt] = React.useState<string>("")

  const blueContainerRef = React.useRef<HTMLDivElement>(null)
  const fileMenuRef = React.useRef(null);
  const scrollToBottom = () => {
    if (blueContainerRef.current) {
      blueContainerRef.current.scrollTop = blueContainerRef.current.scrollHeight
    }
  }
  React.useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])



const checkPrompt = async ()=>

{

if(isFileUpload && files.length>0 || !isFileUpload && files.length==0)
{
  runPrompt()

}

}


const runPrompt = async () => {

// getting response for the prompt

if(isFileUpload)
  {
  setIsFileUpload(!isFileUpload)
  scrollToBottom();
  setIsShowPage(false)
  setIsLoading(true);
const  getFileResponse =   await FileContent(prompt, files,isLogin,email,)
   if(getFileResponse?.status===200)
         {
           
           
           dispatch(addMessage({
             room_id: activeRoomId,
             msg_id:new Date().toISOString(),
             prmt:prompt,
             des:getFileResponse?.text
             
            }));
            
            // Update last prompt for the room
            dispatch(updateLastPrompt({
              room_id: activeRoomId,
              last_prompt: prompt
            }));
            dispatch(setActivPrompt(''))
          

         }

    else  {

      dispatch(setShowError("Error on getting the response, please try after some time"))
  
         }
    


}

else if(!isFileUpload)

{
  scrollToBottom();
  setIsShowPage(false)
  setIsLoading(true);

  result = await Content(prompt,activeRoomId, isLogin, email,"gen_data",'');
  dispatch(setActivPrompt(''))

  if (result) {
      dispatch(addMessage({
          room_id: activeRoomId,
          msg_id:new Date().toISOString(),
          prmt:prompt,
          des:result
          
        }));
    
        // Update last prompt for the room
        dispatch(updateLastPrompt({
          room_id: activeRoomId,
          last_prompt: prompt
        }));
  }

 
}
setIsLoading(false);
setIsShowPage(true)
setPartialPrompt('')
  
      
    }
  

    const nextRoom = async () => {
    if (isLogin) {
      const room_id = (await Content(prompt, activeRoomId, isLogin, email, "insert room", '')) || '';
      if (typeof room_id === 'string') 
      {
        dispatch(addRoom({ room_id, last_prompt: 'New-chat' }));
      }
    } else {
      dispatch(addRoom({ room_id: new Date().toISOString(), last_prompt: 'New-chat' }));
    }

    setIsShowPage(true);
};
React.useEffect(()=>{

console.log("From- user ",rooms, "chatRoomData", activeRoomId, "id")
console.log("prompt",prompt)

})

// React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (fileMenuRef.current && !(fileMenuRef.current as Node).contains(event.target as Node)) {
//         setIsFileUpload(false);
//       }
//     };

//     // Add event listener when menu is open
//     if (isFileUpload) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     // Cleanup the event listener
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isFileUpload]);

  return (
   
   <div className={`w-full h-full ${sty2} `}>
      <div className={`w-full static h-[calc(100vh-80px)]  flex flex-col justify-center p-4`}>
       {messages.length == 0 && isShowPage === true ? (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <ChatLandingPage/>
        </div>
       ) : (
        <div className={`w-full h-full  pt-20 overflow-hidden overflow-y-auto scroll-smooth pb-12`}
          ref={blueContainerRef}
        >
          {
        messages.length>0 && messages.map((itr:any, index:any) => (

              itr.room_id===activeRoomId&&(

             
        
                  <div className={`w-4/5 lg:w-3/5 ${sty2} mt-4`} key={index}>

              <div className={`w-full flex flex-row justify-start text-white text-sm font-semibold`}>
              <div className= { `rounded size-6 ${sty1} mr-2  border-x-violet-700 p-1 drop-shadow-lg shadow-slate-300`}>
                <Image
                width={24}
                height={24}
                src={avatar===''?"/user.svg":avatar}

                alt='user icon'
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
                {partialPrompt}
                
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
<div 
ref={fileMenuRef}
className={` fixed w-1/2 z-100 ${sty2} absolute top-1/4 shadow-lg rounded-lg 
 transition-all duration-300 ease-in-out
   ${isFileUpload && !isLoading 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
 
 `}
 
 >
  {/* isFileUpload && !isLoading && (




)   */}
<FileUpload/>
</div>

}

      <div className={` bottom-0 fixed w-full h-20   flex flex-row justify-center  pl-2 pr-2 rounded-md `}>
        <div className={`w-full ${sty1}`}>
          <div className={`size-10 rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-emerald-500 p-1 mr-4 cursor-pointer`}>
            <Image
              src={'/clip.svg'}
              width={24}
              height={24}
              alt='....'
              className='size-6 flex flex-row justify-center items-center'
              onClick={() => {setIsFileUpload?.(!isFileUpload); setIsShowPage(!isShowPage); }}

            />
          </div>
          <div className={`w-4/5 lg:w-3/5 bg-white ${sty1} rounded-2xl p-2`}>
            <input 
              type='text' 
              className={`w-11/12 bg-white flex flex-row justify-center items-center text-black outline-none`} 
              placeholder="Write your prompt here"  
              onChange={(e) => {dispatch(setActivPrompt(e.target.value));setActivPrompt(e.target.value)}}
              value={prompt} 
              disabled={isLoading} 
            />
            <div 
              className={` right-0 mr-1 size-9 md:size-10d rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1   ml-1  ${prompt === '' || isLoading ?'cursor-not-allowed':'cursor-pointer'}`} 
              onClick={!isLoading && prompt !== '' ? () => {checkPrompt();} : undefined}
             >
              <Image
                src={isLoading ? '/arrow-path.svg' : '/arrow_up.svg'}
                width={24}
                height={24}
                alt='arrow'
                className={`size-6 flex flex-row justify-center items-center ${isLoading ? 'animate-spin' : ''}`}
              />
            </div>
            <div 
              className={`cursor-pointer right-0 mr-1 size-9 md:size-10  rounded-full flex flex-row justify-center items-center bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-500 p-1 ml-1`} 
              onClick={nextRoom}
            >
              <Image
                src={'/plus_icon.svg'}



                width={24}
                height={24}
                alt='plus icon'
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
