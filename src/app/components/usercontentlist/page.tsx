'use client'
import * as React from 'react'
import {sty1,sty2} from '../../style'
import Image from 'next/image'
import crypto from 'crypto'
import  {UseAppContext}  from '../../index'
import Content from '../userprompt/prompt'
import { DynamoDBClient, PutItemCommand,QueryCommand } from '@aws-sdk/client-dynamodb';

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
  const { email,isMenuOpen,chatRooms,setContent,content,chatRoomData,isLogin,setChatRooms,setCurrRid,currIndex,setChatRoomData,setCurrIndex,currRid,setNewContent,newContent } = context || {};

  
  const [inSize, setInsize] = React.useState<number>(44)

  const matchRoom = (index: number, id: string) => {
    setCurrRid?.(id)
    if (chatRoomData) {
 console.log("chatRoomData-index from list",chatRoomData[index])
  setContent?.(chatRoomData[index])
  // setContent?.(chatRoomData)
    }
    // if (setChatRoomData && currIndex !== undefined && chatRoomData) {
    //   console.log("content from userlist",content, "currIndex",currIndex)
    //   setChatRoomData?.((prevData: any[]) => {
    //     const newData = [...prevData]
    //     newData[currIndex] = newContent
    //     return newData
    //   })
    
    // }
    setCurrIndex?.(index)
    // setContent?.([])
  }




React.useEffect(() => {
  async function setRoomid() {
    if (chatRooms.length === 0) {
      if (isLogin) {
        console.log("islogin", isLogin);
        const rmid: any = await Content(prompt, currRid || '', isLogin, email || '', "insert room");
        setCurrRid?.(rmid)
        console.log("From user contentlist", rmid);
        setChatRooms?.([{ prmt: 'New Chat', id: rmid }]);
      } 
      else {
        const rmid = crypto.randomBytes(16).toString('hex');
        setCurrRid?.(rmid)
        console.log("else executed");
        setChatRooms?.([{ prmt: 'New Chat', id: rmid }]);
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
      console.log("data fetched");
      const res = result.Items?.map(item => ({
        prmt: item.prmt?.S,
        id: item.rmid?.S
      })) || [];


      if (res.length > 0) {
        setChatRooms?.(res);
        setCurrRid?.(res[0].id)
      }
      return res;
    } catch (error) {
      console.log("Error retrieving room IDs:", error);
      return [];
    }
  }

async function getChatData()

{

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
    console.log("data fetched");
    const res = result.Items?.map(item => ({
      prmt: item.prompt?.S,
      des: item.des?.S,
      rmid: item.rmid?.S,
      msid: item.msid?.S
    })) || [];
    console.log(res);
    if (res.length > 0) {
      setContent?.(res)
      setChatRoomData?.(res);
    }
    return res;
  } catch (error) {
    console.log("Error retrieving room IDs:", error);
    return [];
  }









}

  async function fetchData() {
    if(isLogin){
      const res = await getRoomId();
      if(res.length!==0){
        await getChatData();
      }
      console.log("chatRooms",chatRooms)
      if(res.length == 0){
        await setRoomid();
      }
    }
    else {
      await setRoomid();
    }
  }

  fetchData();
}, []);

React.useEffect(()=>{
console.log("From user content list rooms",chatRooms)

},[chatRooms])
  return (

    <aside className={` ${isMenuOpen? `   animate-slide_right_left transition-all ease-in duration-1000 p-[2px] mt-8 z-50 flex flex-col  w-52 lg:w-48 h-full border-2 dark:bg-gray-900 bg-white pt-4 dark:text-white text-gray-900  border-gray-500 overflow-hidden hover:overflow-y-auto`:"hidden"}     `}> 
    {


  chatRooms.length > 0 && chatRooms.map((itr:any,index:any) => (
<div key = {index} className="w-11/12 p-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white  mb-4 line-clamp-1" onClick={() => matchRoom(index,itr.id)}>
{itr.prmt}
</div>

))


    }




    </aside>

  )
}
export default UserContentList
