import React, { useState, useEffect } from 'react';
import { Calendar, Book, Clock, ChevronDown, Search, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import ResponseSidebar from '../components/sidebar';
import { Link } from "react-router-dom";

const DailyContent = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [dailyContent, setDailyContent] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editProgram, setEditProgram] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample responses for the sidebar
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

  // Initialize with some sample data
  useEffect(() => {
    // Sample programs
    const samplePrograms = [
      { id: 1, title: 'Fruits of the Spirit' },
      { id: 2, title: 'Sermon on the Mount' },
      { id: 3, title: 'Book of Psalms' }
    ];
    
    // Sample daily content
    const sampleContent = [
      { 
        id: 1, 
        title: 'Day 1: Love', 
        programId: 1, 
        programTitle: 'Fruits of the Spirit',
        createdAt: '2025-04-10T09:30:00Z',
        scriptureReference: 'Galatians 5:22-23',
        content: 'Introduction to the concept of love as a fruit of the Spirit...'
      },
      { 
        id: 2, 
        title: 'Day 2: Joy', 
        programId: 1, 
        programTitle: 'Fruits of the Spirit',
        createdAt: '2025-04-10T10:45:00Z',
        scriptureReference: 'Galatians 5:22, Romans 15:13',
        content: 'Exploring the meaning of joy in Christian life...'
      },
      { 
        id: 3, 
        title: 'Day 1: The Beatitudes', 
        programId: 2, 
        programTitle: 'Sermon on the Mount',
        createdAt: '2025-04-09T14:20:00Z',
        scriptureReference: 'Matthew 5:1-12',
        content: 'Jesus begins his sermon with the Beatitudes...'
      },
      { 
        id: 4, 
        title: 'Psalm 23', 
        programId: 3, 
        programTitle: 'Book of Psalms',
        createdAt: '2025-04-08T16:15:00Z',
        scriptureReference: 'Psalm 23:1-6',
        content: 'The Lord is my shepherd; I shall not want...'
      }
    ];
    
    setPrograms(samplePrograms);
    setDailyContent(sampleContent);
  }, []);

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!contentTitle.trim() || !selectedProgram) return;

    const programObj = programs.find(p => p.id === parseInt(selectedProgram));
    
    const newContent = {
      id: Date.now(),
      title: contentTitle,
      programId: parseInt(selectedProgram),
      programTitle: programObj.title,
      createdAt: new Date().toISOString(),
      scriptureReference: '',
      content: ''
    };

    setDailyContent([newContent, ...dailyContent]);
    setContentTitle('');
    setSelectedProgram('');
    setShowAddForm(false);
  };

  const handleDeleteContent = (id) => {
    setDailyContent(dailyContent.filter(content => content.id !== id));
  };

  const startEditing = (content) => {
    setEditingId(content.id);
    setEditTitle(content.title);
    setEditProgram(content.programId.toString());
  };

  const handleUpdateContent = () => {
    if (!editTitle.trim() || !editProgram) return;

    const programObj = programs.find(p => p.id === parseInt(editProgram));
    
    setDailyContent(dailyContent.map(content =>
      content.id === editingId ? { 
        ...content, 
        title: editTitle,
        programId: parseInt(editProgram),
        programTitle: programObj.title
      } : content
    ));

    setEditingId(null);
    setEditTitle('');
    setEditProgram('');
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter content based on search term
  const filteredContent = dailyContent.filter(content => {
    return (
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.programTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Column */}
      <ResponseSidebar
        responses={sampleResponses}
        onSelectResponse={setSelectedResponse}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Daily Content</h1>

        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search content or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to='/programs/daily/add' className="w-full md:w-auto px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors flex items-center justify-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Daily Content
          </Link>
        </div>

   

        {/* Content List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 bg-blue-900/5 border-b border-blue-900/10">
            <h2 className="font-semibold text-blue-900">Daily Content List</h2>
          </div>

          {filteredContent.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/10">
                  {filteredContent.map(content => (
                    <tr key={content.id} className="hover:bg-blue-50/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{content.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Book className="h-4 w-4 text-blue-900 mr-2" />
                          <span className="text-sm font-medium text-gray-700">{content.programTitle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === content.id ? (
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="px-2 py-1 border border-blue-900/20 rounded focus:outline-none focus:ring-1 focus:ring-blue-900/30"
                              autoFocus
                            />
                            <select
                              value={editProgram}
                              onChange={(e) => setEditProgram(e.target.value)}
                              className="px-2 py-1 border border-blue-900/20 rounded focus:outline-none focus:ring-1 focus:ring-blue-900/30"
                            >
                              {programs.map(program => (
                                <option key={program.id} value={program.id}>{program.title}</option>
                              ))}
                            </select>
                            <button
                              onClick={handleUpdateContent}
                              className="px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-800"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-900">{content.title}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(content.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 focus:outline-none"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => startEditing(content)}
                            className="text-blue-600 hover:text-blue-900 focus:outline-none"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteContent(content.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <Calendar className="h-10 w-10 mx-auto text-blue-900/20" />
              <p className="mt-2 text-sm text-blue-900/50">
                {searchTerm 
                  ? "No content matches your search." 
                  : "No daily content found. Create your first content using the 'Add Daily Content' button."}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredContent.length > 0 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-blue-900/10">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredContent.length}</span> items
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-blue-900/20 rounded text-sm text-blue-900 hover:bg-blue-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-900 text-white rounded text-sm hover:bg-blue-800">
                  1
                </button>
                <button className="px-3 py-1 border border-blue-900/20 rounded text-sm text-blue-900 hover:bg-blue-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyContent;