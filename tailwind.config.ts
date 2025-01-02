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
      },
      gradient: {
        '0%, 100%': {
          'background-size': '200% 200%',
          'background-position': 'left center'
        },
        '50%': {
          'background-size': '200% 200%',
          'background-position': 'right center'
        },
      },
      pulseCustom: {
        '0%, 100%': { opacity: '1', transform: 'scale(1)' },
        '50%': { opacity: '.8', transform: 'scale(0.95)' },
      },
      progress: {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
      letterPop: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '25%': { transform: 'translateY(15px)', opacity: '0.25' },
        '50%': { transform: 'translateY(10px)', opacity: '0.5' },
        '75%': { transform: 'translateY(5px)', opacity: '0.75' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
    animation:{
      slide_right_left: "slide_right_left 2s ease-in",
      slide_left: "slide_left 2s ease-out",
      showLine: "showLine 3s infinite ease-in",
      gradient: "gradient 3s ease infinite",
      pulseCustom: "pulseCustom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      progress: "progress 2s linear infinite",
      letterPop: "letterPop 1s ease-out forwards infinite",
    },
    },
  },
  plugins: [],
};
export default config;
