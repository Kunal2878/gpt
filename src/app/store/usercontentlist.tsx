'use client'
import * as React from 'react'
import {sty1,sty2} from '../../app/style'
import Image from 'next/image'
import crypto from 'crypto'
import  {UseAppContext}  from '../../app/index'
import Content from '../../app/components/userprompt/prompt'
import { DynamoDBClient, PutItemCommand,QueryCommand } from '@aws-sdk/client-dynamodb';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './state'
import { 
  addRoom, addMessage, setActiveRoom, setActivPrompt, setMenu

} from './slice'
function UserContentList() {
  const Region= process.env.NEXT_PUBLIC_REGION
  const tab_name = process.env.NEXT_PUBLIC_TABLE
  const room_tab_name = process.env.NEXT_PUBLIC_ROOM_TABLE
  const config = {
    region: Region,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY || ''
    }
};
const ddbClient= new DynamoDBClient(config)

  const context = UseAppContext();
  // const { email,isMenuOpen,chatRooms,setContent,content,chatRoomData,isLogin,setChatRooms,setCurrRid,currIndex,setChatRoomData,setCurrIndex,currRid,setNewContent,newContent } = context || {};
 
  const dispatch = useDispatch();
  const rooms  = useSelector((state: RootState) => state.chat.rooms);
  const activeRoomId = useSelector((state:RootState) => state.chat.activeRoomId);
  const isLogin = useSelector((state:RootState) => state.chat.isLogin);
  const email = useSelector((state:RootState) => state.chat.email);
  const isMenu = useSelector((state: RootState) => state.chat.isMenu);



   
  const [inSize, setInsize] = React.useState<number>(44)

  const matchRoom = (index: number, id: string) => {
dispatch(setActiveRoom(id))

  }



React.useEffect(() => {
  async function setRoomid() {
    if (rooms.length === 0) {
      if (isLogin) {
        dispatch(addRoom({ room_id: 'New-chat', last_prompt: 'New chat' }))
      } 
      else {
        console.log("putting in room")
        dispatch(addRoom({ room_id: 'New-chat', last_prompt: 'New chat' }))
      }
    }
  }

  async function getRoomId() {
    if (!email) {
      console.log("Email is undefined");
      return [];
    }

    const params = {
      TableName: room_tab_name || '',
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      },
      ScanIndexForward: false
    };

    try {
      const result = await ddbClient.send(new QueryCommand(params));
      const res = result.Items?.map(item => ({
        room_id: item.room_id.S || '',
        last_prompt: item.last_prompt.S || '',
      })) || [];

      if (res.length > 0) {
        res.forEach(room => dispatch(addRoom(room)));
        if (res[0].room_id) {
          dispatch(setActiveRoom(res[0].room_id));
        }
      }
      return res;
    } catch (error) {
      console.log("Error retrieving room IDs:", error);
      return [];
    }
  }

  async function getChatData() {
    if (!email) {
      console.log("Email is undefined");
      return [];
    }

    const params = {
      TableName: tab_name || '',
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      },
      ScanIndexForward: false
    };

    try {
      const result = await ddbClient.send(new QueryCommand(params));

      const res = result.Items?.map(item => ({
        room_id: item.rmid?.S || '',
        msg_id: item.msid?.S || '',
        prmt: item.prompt?.S || '',
        des: item.des?.S || '',
      })) || [];

      if (res.length > 0) {
        res.forEach(message => dispatch(addMessage(message)));
      }
      return res;
    } catch (error) {
      console.log("Error retrieving chat data:", error);
      return [];
    }
  }
  async function fetchData() {
    if(isLogin){
      const res = await getRoomId();
      if(res.length !== 0){
        await getChatData();
      }
    
      if(res.length === 0){
        await setRoomid();
      }
    }
    else {
      await setRoomid();
    }
  }

  fetchData();
}, [dispatch, email, isLogin, rooms.length, room_tab_name, tab_name]);

    return (

      <aside className={ `transition-all duration-300 ease-in-out  p-[2px] mt-8 z-100 flex flex-col  w-52 lg:w-48 h-full  bg-black/20 pt-4 text-white  overflow-hidden hover:overflow-y-auto ${isMenu? 'opacity-100 scale-100 translate-y-0' 
        : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}> 
      {


rooms.map((itr:any,index:any) => (
<div key = {index} className="w-11/12 p-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white  mb-4 line-clamp-1" onClick={() => matchRoom(index,itr.room_id)}>
{itr.last_prompt}
</div>
))}

</aside>

    )}
export default UserContentList
