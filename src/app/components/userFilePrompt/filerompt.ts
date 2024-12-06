
import React from 'react'
import crypto from 'crypto'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
// export  async function FileContent(prmt:any,isLogin:any,email:any, files:any,type:any)
export  async function FileContent(prmt:any,files:any)

{
    const Region= process.env.NEXT_PUBLIC_REGION
    const tab_name = process.env.NEXT_PUBLIC_TABLE

    const ddbClient= new DynamoDBClient({region:Region})
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GeminiApiKey || '');
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function run() {
      try {
        // Function to extract content from files
        const extractFileContent = async (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target?.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
          });
        }      
        // Extract content from all files
        const fileContents = await Promise.all(files.map(extractFileContent));

        // Prepare the input for the model
        const modelInput = [
          { text: prmt },
          ...fileContents.map((content, index) => ({
            text: `File ${index + 1} content:\n${content}`
          }))
        ];

        // Generate content using the model
        const generatedContent = await model.generateContent(modelInput);
        

        
        return {text:generatedContent.response.text(), status:200}
      } catch (error) {
        window.console.log("There is a problem on generating the response, try after sometime")
        return {text:error,status:423};
      }
    }

  
 
   
    // async function insertData(txt: string, id:string) {
    //   const params = {
    //     TableName: tab_name,
    //     Item: {
    //       email:{S:email},
    //       id: { S: id },
    //       prompt: { S: prmt },
    //       des: { S: txt },
    //       time: { S: Date.now().toString() }
    //     }
    //   }
    //   await ddbClient.send(new PutItemCommand(params))
    // }   
    
const genContent= await run();


   return genContent
}

