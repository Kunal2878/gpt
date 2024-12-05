
import React from 'react'
import crypto from 'crypto'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DynamoDBClient, PutItemCommand,QueryCommand } from '@aws-sdk/client-dynamodb';
export default async function Content(prmt:any,rmid:any,isLogin:any,email:any,fun_name:string){
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

  
   const  run =   async (prmt: any) =>{
        try {
          const result = await model.generateContent(prmt.toString());
          const response = result.response;
          const text = response.text();
 
          const id = crypto.randomBytes(16).toString('hex');
          await insertData(text, id);
          return text;
        } catch (error) {
          console.error("Error generating content:", error);
          throw error;
        }
      }
     
      const  insertData = async (txt: string, id:string) =>{
  console.log("Data inserting in room")
        const params = {
          TableName: tab_name,
          Item: {
            email:{S:email},
            rmid: { S: rmid },
            msid:{S:id},
            prompt: { S: prmt },
            des: { S: txt },
            time: { S: Date.now().toString() }
          }
        }
  
        try {
           await ddbClient.send(new PutItemCommand(params))
          console.log("Data inserted successfully",);
        } catch (error) {
          console.log("Error inserting data:", error);
        }
      }


        const genContent= await run(prmt);
        return genContent
    }

else if(fun_name === "insert room")

    {
      console.log("inserting in room")
        const insertRoomid = async (id:string) =>
          {
            const params = {
              TableName: room_tab_name,
              Item: {
                email:{S:email},
                rmid: { S: id },
                time: { S: Date.now().toString() }
              }
            }

            try
            {
              console.log("Insert the room")
              await ddbClient.send(new PutItemCommand(params))
              console.log("Data inserted successfully");
            }
          catch (error) {
              console.log("Error inserting data:", error);
            }



          }
    const id = crypto.randomBytes(16).toString('hex');
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
             return result.Items?.map(item => item.rmid.S) || [];
           } catch (error) {
             console.log("Error retrieving room IDs:", error);
             return [];
           }
         };
          return await getRoomIds();
        } 


}       


