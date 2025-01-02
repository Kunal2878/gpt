
  const AdvancedLoadingScreen = () => {
    const text = "TalkToGPT";
  
   
  
    return (

      <div className="min-h-screen bg-gradient-to-br from-black/50">
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              {/* Animated Icon */}
              {/* <div className="mb-8">
                <div className="w-16 h-16 mx-auto border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
              </div> */}
  
              {/* Animated Text */}
              <div className="flex justify-center space-x-1 mb-8">
                {text.split("").map((letter, index) => (
                  <span
                    key={index}
                    className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-letterPop"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
  
              {/* Progress Bar */}
              <div className="w-48 h-2 mx-auto bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-progress"></div>
              </div>
  
              {/* Loading Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
      </div>

    );
  };
  
  export default AdvancedLoadingScreen;