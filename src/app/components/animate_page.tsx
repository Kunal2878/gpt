import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const AnimatePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Adjust the timeout duration as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  
                <div className="flex items-center justify-center">
                    <h1 className="text-4xl font-bold animate-bounce">TalkToGPT</h1>
                </div>
           
        </div>
    );
};

export default AnimatePage;