import React, { useState } from 'react';
import ResponseSidebar from '../components/sidebar';

const DashboardPage = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  

  const sampleResponses = [
    {
      id: 1,
      title: 'Welcome Message',
      preview: 'Thank you for contacting us...',
      content: 'Full welcome message content would go here...',
      time: '10:30 AM',
      unread: false
    },
    // ... more responses
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Column */}
      <ResponseSidebar 
        responses={sampleResponses}
        onSelectResponse={setSelectedResponse}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedResponse ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-900">
                {selectedResponse.title}
              </h2>
              <span className="text-sm text-gray-500">
                {selectedResponse.time}
              </span>
            </div>
            <div className="prose max-w-none text-gray-700">
              {selectedResponse.content}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto text-blue-900/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Page under developement
              </h3>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;