import React, { useState, useEffect } from "react";

const CustomToast = ({ message, onClose }) => {
  const [progress, setProgress] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [onClose]);
  
  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-md p-4 max-w-xs z-50 flex flex-col">
      <div className="flex items-center mb-2">
        <div className="bg-green-100 p-2 rounded-full mr-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-grow font-medium">
          {message}
        </div>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div 
          className="bg-blue-500 h-1 rounded-full transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Success = ({ context }) => {
  const [showToast, setShowToast] = useState(false);
  
  const handleShowToast = () => {
    setShowToast(true);
  };
  
  const handleCloseToast = () => {
    setShowToast(false);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Toast Notification Demo</h2>
      <button 
        onClick={handleShowToast}
        className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {context?.name || "Show Toast"}
      </button>
      
      {showToast && (
        <CustomToast 
          message="Operation completed successfully!" 
          onClose={handleCloseToast} 
        />
      )}
    </div>
  );
};

export default Success;