
import React from 'react'
import crypto from 'crypto'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DynamoDBClient, PutItemCommand,QueryCommand } from '@aws-sdk/client-dynamodb';
export default async function Content(prmt:string,rmid:string,isLogin:boolean,email:string,fun_name:string,last_prompt:string){
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
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GeminiApiKey || '');
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    if(fun_name === "gen_data" )
      
{

  
   const  run =   async (prmt: string) =>{
        try {
          const result = await model.generateContent(prmt.toString());
          const response = result.response;
          const text = response.text();
 
          const id = new Date().toISOString()
          await insertData(text, id);
          return text;
        } catch (error) {
          console.log("There is a problem, try after sometime")

        }
      }
     
      const  insertData = async (txt: string, id:string) =>{

        const params = {
          TableName: tab_name,
          Item: {
            email:{S:email},
            room_id: { S: rmid },
            msg_id:{S:id},
            prompt: { S: prmt },
            des: { S: txt },
            time: { S: new Date().toISOString() }
          }
        }
  
        try {
           await ddbClient.send(new PutItemCommand(params))
    
        } catch (error) {
          console.log("There is a problem on saving your data, try after sometime")

        }
      }


        const genContent= await run(prmt);
        return genContent
    }

else if(fun_name === "insert room")

    {
     
        const insertRoomid = async (id:string) =>
          {
            const params = {
              TableName: room_tab_name,
              Item: {
                email:{S:email},
                room_id: { S: id },
                last_prompt:{S:last_prompt},
                time: { S: Date.now().toString() }
              }
            }

            try
            {
     
              await ddbClient.send(new PutItemCommand(params))
              
            }
          catch (error) {
            console.log("There is a problem, try after sometime")
            }



          }
    const id = new Date().toISOString()
          await insertRoomid(id);
          return id;


        }
        
        else if (fun_name === "get_rooms") {
         const getRoomIds = async () => {
           const params = {
             TableName: room_tab_name,
             KeyConditionExpression: "email = :email",
             ExpressionAttributeValues: {
               ":email": { S: email }
             },
             ScanIndexForward: false // This will sort in descending order (newest first)
           };
 
           try {
             const result = await ddbClient.send(new QueryCommand(params));
             return result.Items?.map(item => {item.room_id.S,item.last_prompt.S}) || [];
           } catch (error) {
            console.log("There is a problem, try after sometime")
             return [];
           }
         };
          return await getRoomIds();
        } 


}       


