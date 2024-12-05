"use client"
import * as React from 'react'
import crypto from 'crypto'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DynamoDBClient, PutItemCommand,QueryCommand } from '@aws-sdk/client-dynamodb';
import  {UseAppContext}  from './index'
export default  function Test()
{
  const context = UseAppContext();
  const { isMenuOpen,chatRooms,setContent,content,chatRoomData,isLogin,setChatRooms,setCurrRid,currIndex,setChatRoomData,setCurrIndex,currRid } = context || {};

      const Region= process.env.NEXT_PUBLIC_REGION
      const tab_name = process.env.NEXT_PUBLIC_TABLE
      const room_tab_name = process.env.NEXT_PUBLIC_ROOM_TABLE
      let email= "kunalpaul673@gmail.com"
      
      const config = {
        region: Region,
          credentials: {
              accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
              secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY || ''
          }
      };
      const ddbClient= new DynamoDBClient(config)
      const ChatRoomData = async () => {
          const params = {
            TableName: room_tab_name,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
              ":email": { S: email }
            },
          };

          try {
            const result = await ddbClient.send(new QueryCommand(params));
            console.log(result)
            console.log("data fetched")
            const res = result.Items?.map(item => ({
              email: item.email?.S,
              des: item.des?.S,
              prmt: item.prmt?.S,
              time: item.time?.S,
              id: item.id?.S
            })) || [];
            console.log(res)
          } 
           catch (error) {
            console.log("Error retrieving room IDs:", error);
            return [];
          }
        };
        // ChatRoomData();
        function check(){
          setContent?.({prmt:"hfhh",des:"gggdhh"})
          setChatRoomData?.([{prmt:"hfkdkkdhh",des:"gggdhhsjjd"},{prmt:"hfkdkjskakdhh",des:"gggdhnsnamhsjjd"}])
              setChatRoomData?.((prevData: any[]) => {
              const newData = [...prevData]
              newData[currIndex] = content
              return newData
            })

            
          }
          React.useEffect(()=>{
         console.log(chatRoomData)
           },[chatRoomData])

   return(
 <div className='text-4xl text-white' >
 <div onClick={check}>clock</div>
 </div> 



   )

      }