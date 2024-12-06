"use client"
import React from 'react';

// type ToasterProps= {
//   message: string;
//   color: string;
// }

const Toaster = ({ message, color }:{message:any,color:any}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: "white",
        color: color,
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default Toaster;
