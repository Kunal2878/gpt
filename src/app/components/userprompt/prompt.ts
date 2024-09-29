'use server'
import React from 'react'

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function Content(prmt:any){
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GeminiApiKey || '');
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function run(prmt:any) {

    
      try {
        // const result = await model.generateContent("write a story");
        const result = await model.generateContent(prmt.toString());
        const response =  result.response;
        const text = response.text();
        return text;
      } catch (error) {
        console.error("Error generating content:", error);
        throw error;
      }
    }
   
   const genContent= await run(prmt);
  // //  console.log(genContent)
   return genContent
}

