import React, { useState } from 'react';
import { Book, Calendar, ChevronRight, Clock, Users } from 'lucide-react';
import ResponseSidebar from '../components/sidebar';
import AuditTray from '../components/audit';

const DashboardPage = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  
  // Sample data - replace with actual data from your backend
  const totalPrograms = 8;
  const totalDailyContent = 124;
  
  const recentPrograms = [
    {
      id: 1,
      title: "Fruits of the Spirit",
      description: "A 21-day study on Galatians 5:22-23",
      participants: 24,
      progress: 65
    }
  ];

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Column */}
      <ResponseSidebar 
        responses={sampleResponses}
        onSelectResponse={setSelectedResponse}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Bible Study Dashboard</h1>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Programs Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Programs</h2>
                <p className="text-2xl font-bold text-gray-800">{totalPrograms}</p>
              </div>
            </div>
          </div>
          
          {/* Daily Content Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Daily Content Items</h2>
                <p className="text-2xl font-bold text-gray-800">{totalDailyContent}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Programs Overview Card - Full Width */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-blue-900">Study of the day</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentPrograms.map(program => (
              <div key={program.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{program.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{program.description}</p>
                    
                    <div className="flex items-center mt-3 text-sm">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-600 mr-4">{program.participants} participants</span>
                      
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">Progress: {program.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                    <button className="ml-4 p-2 rounded-full hover:bg-gray-100">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all programs →
            </button>
          </div>
        </div>
        <AuditTray />
        {/* Selected Response Content */}
        {selectedResponse && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-900">
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
        )}
      
      </div>

    </div>
  );
};

export default DashboardPage;