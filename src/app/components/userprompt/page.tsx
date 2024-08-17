import React from 'react'

import { GoogleGenerativeAI } from "@google/generative-ai";

'use server'
export async function Content(){
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GeminiApiKey || '');
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    async function run() {
      const prompt = "Write a story about an AI and magic"
    
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
    }
    
    run();
}
function UserPrompt() {
 
  return (
    <div>
      
    </div>
  )
}

export default UserPrompt
