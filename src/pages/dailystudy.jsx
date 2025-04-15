import React, { useState, useEffect } from 'react';
import { Calendar, Book, Clock, Search, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import ResponseSidebar from '../components/sidebar';
import { Link } from "react-router-dom";
import { fetchAllDaily } from '../services/getalldaily';
import { deleteDaily } from '../services/deletedaily';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditDailyModal from '../components/editdaily';

const DailyContent = () => {
  const [dailyContent, setDailyContent] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editProgram, setEditProgram] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDailyId, setSelectedDailyId] = useState(null);

  // Function to open the edit modal
  const openEditModal = (id) => {
    setSelectedDailyId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllDaily();
        setDailyContent(data);

        // Extract unique programs from daily content
        if (data && data.length > 0) {
          const uniquePrograms = [...new Set(data.map(item => item.program))];
          const programsArray = uniquePrograms.map((program, index) => ({
            id: index + 1,
            title: program
          }));
          setPrograms(programsArray);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading daily content:', err);
        setError('Failed to load daily content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDeleteContent = async (id) => {
    const result = await deleteDaily(id);

    if (result.success) {
      setDailyContent(prev => prev.filter(content => content.id !== id));
      toast.success("Program deleted successfully!");
    } else {
      console.error("Failed to delete program:", result.error || "Unknown error");
      toast.error("An error occurred while deleting the program.");
    }
  };

  const handleUpdateContent = async () => {
    if (!editTitle.trim() || !editProgram) return;

    const programObj = programs.find(p => p.id === parseInt(editProgram));

    const updatedData = {
      topic: editTitle,
      title: editTitle, // if both exist in your DB
      program: programObj.title,
    };

    try {
      const response = await editDailyProgram(editingId, updatedData);

      if (response) {
        // Update the local state/UI
        setDailyContent(dailyContent.map(content =>
          content.id === editingId
            ? {
              ...content,
              title: editTitle,
              topic: editTitle,
              programId: parseInt(editProgram),
              program: programObj.title,
            }
            : content
        ));
        setEditingId(null);
        setEditTitle('');
        setEditProgram('');
      } else {
        console.error("Failed to update on server.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleContentUpdate = (updatedContent) => {
    // Update the dailyContent state with the new content
    setDailyContent(prevContent =>
      prevContent.map(item =>
        item.id === updatedContent.id ? updatedContent : item
      )
    );
  };
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  // Filter content based on search term
  const filteredContent = dailyContent.filter(content => {
    const title = content.title || content.topic || ''; // Adjust based on your API response
    const program = content.programTitle || content.program || ''; // Adjust based on your API response

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Column */}
      <ResponseSidebar

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Content List */}
        {!isLoading && !error && (
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Topic</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-900/10">
                    {filteredContent.map(content => (
                      <tr key={content.id} className="hover:bg-blue-50/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Book className="h-4 w-4 text-blue-900 mr-2" />
                            <span className="text-sm font-medium text-gray-700">{content.programTitle || content.program}</span>
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
                                className="px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 relative group"
                              >
                                <span>Save</span>
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="animate-ping absolute h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                                </span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{content.title || content.topic}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {formatDate(content.date || content.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(content.id)}
                              className="text-blue-600 hover:text-blue-900 focus:outline-none transition-transform hover:scale-110"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(content.id)}
                              className="text-red-600 hover:text-red-900 focus:outline-none transition-transform hover:scale-110"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <EditDailyModal
                    id={selectedDailyId}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateSuccess={handleContentUpdate} // Add this prop
                  />

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
                  <button className="px-3 py-1 border border-blue-900/20 rounded text-sm text-blue-900 hover:bg-blue-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-900 text-white rounded text-sm hover:bg-blue-800 transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 border border-blue-900/20 rounded text-sm text-blue-900 hover:bg-blue-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyContent;