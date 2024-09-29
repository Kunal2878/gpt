import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes:{ 
        slide_right_left :{
        "0%":{
          width:"24px"
        },
        "25%":{
          width:"60px"
        },
        "50%":{
          width:"100px"
        },
        "75%":{
          width:"140px"
        },
        "100%":{
          width:"192px"
        },
        
       
      },
        slide_left :{
        "0%":{
          transform: "translateX(0px)"
        },
        "50%":{
          transform: "translateX(80px)"
        },"100%":{
          transform: "translateX(160px)"
        }
      },
      showLine:{
        "0%":{
          left:"0px"
        },
        "100%":{
          left:"120px"    
        }
      }
    },
    animation:{
      slide_right_left:"slide_right_left 2s ease in",
      slide_left:"slide_left 2s ease out",
      showLine: " showLine 3s infinite ease-in"
    },
    },
  },
  plugins: [],
};
export default config;
