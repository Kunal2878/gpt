import React from 'react';
import Image from 'next/image';

  export default function ChatLandingPage() {

        const quickPrompts = [
          { text: "Explain the concept of quantum entanglement", src: "/p1.jpg", bg:"green-400" },
          { text: "Describe the process of photosynthesis in plants", src: "/p1.jpg",bg:"purple-300" },
          { text: "What are the main causes of climate change?", src: "/p1.jpg",bg:"green-600" },
          { text: "Explain the theory of relativity in simple terms", src: "/p1.jpg",bg:"cyan-400" },
          { text: "How does the human immune system work?", src: "/p1.jpg",bg:"green-600" },
          { text: "What are the key events that led to World War I?", src: "/p1.jpg",bg:"red-400" },
          { text: "Describe the water cycle and its importance", src: "/p1.jpg",bg:"blue-400" },
          { text: "Explain the basics of machine learning", src: "/p1.jpg",bg:"green-400" },
          { text: "What are the main principles of economics?", src: "/p1.jpg",bg:"gray-400" },
          { text: "How do black holes form and function?", src: "/p1.jpg",bg:"indigo-400" },
          { text: "Describe the process of evolution by natural selection", src: "/p1.jpg",bg:"violet-400" },
          { text: "What are the major theories of personality in psychology?", src: "/p1.jpg",bg:"green-400" },
          { text: "Explain the concept of sustainable development", src: "/p1.jpg",bg:"green-200" },
          { text: "How does the internet work?", src: "/p1.jpg",bg:"green-600" },
          { text: "What are the key features of different art movements?", src: "/p1.jpg",bg:"cyan-200" },
          { text: "Describe the structure and function of DNA", src: "/p1.jpg",bg:"pink-400" },
        ];  
      return (
        <main className="w-full  h-full flex flex-col items-center justify-start lg:justify-center p-24">
          <div className="size-12 mb-12 p-1 shadow-lg shadow-gray-800 rounded-lg">
            <Image
              src="/logo.svg"
              alt="Main Image"
              width={500}
              height={300}
              className="size-10  "
            />
          </div>
      
          <h2 className="w-full text-md lg:text-2xl font-bold mb-6 flex flex-row justify-center items-center ">Quick prompts</h2>
      

          <div className=" w-screen  flex  flex-row justify-center items-center  p-1 flex-wrap gap-6 ">
            
            {quickPrompts
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((prompt, index) => (
                <div
                  key={index}
                  className="shadow-gray-600 shadow-md rounded-md bg-white/30 text-white w-32 lg:w-48 h-32 lg:h-36 flex flex-col items-center justify-center text-center text-[12px]"
                >
                  <span className="w-full h-2/5 line-clamp-2 text-[10px] lg:text-md">{prompt.text}</span>
                  <div className={`bg-gradient-to-tr from-green-400 via-green-300 to-cyan-400 rounded w-full h-16 backdrop-blur-xl opacity-60`} 




                  // style={{"backgroundImage:url([`${prompt.src}`])"}}
                  
                  >
                    {/* 
                    <Image
                      src={prompt.src}
                      alt="Prompt Image"
                      width={500}
                      height={300}
                      className="top-0 w-full h-3/5 mb-[2px] rounded-md"
                    />
                    */}
                  </div>
                </div>
              ))     }     </div>
        </main>
      );
    }

