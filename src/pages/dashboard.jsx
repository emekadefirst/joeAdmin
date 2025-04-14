import React, { useState, useEffect } from 'react';
import { Book, Calendar, ChevronRight, Clock, Users } from 'lucide-react';
import ResponseSidebar from '../components/sidebar';
import { fetchAllDaily } from '../services/getalldaily';
import AuditTray from '../components/audit';
import apiDomain from '../services/api';

const DashboardPage = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);

  // State to hold data from the API
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [totalDailyContent, setTotalDailyContent] = useState(0);
  const [dailyContent, setDailyContent] = useState([]);

  // State to hold the filter term
  const [filterTerm, setFilterTerm] = useState('');

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiDomain}/api/counts/`);
        const data = await response.json();
        setTotalPrograms(data.program);
        setTotalDailyContent(data.dailycontent);


        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const data = await fetchAllDaily();
        const today = new Date().toISOString().split('T')[0];
        const todaysData = data.filter(item => item.date === today);
        setDailyContent(todaysData);
      } catch (error) {
        console.error('Error fetching daily content:', error);
      }
    };
  
    fetchDaily();
  }, []);
  
  const sampleResponses = [
    {
      id: 1,
      title: 'Welcome Message',
      preview: 'Thank you for contacting us...',
      content: 'Full welcome message content would go here...',
      time: '10:30 AM',
      unread: false
    },
  ];

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

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
      
        {/* Programs Overview Card */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-blue-900">Study of the day</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {dailyContent.map(program => (
              <div key={program.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{program.program}</h3>
                    <p className="text-sm text-gray-500 mt-1">{program.topic}</p>
                    
                    <div className="flex items-center mt-3 text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">Date: {program.date}</span>
                    </div>
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
      </div>
      
    </div>
  );
};

export default DashboardPage;
