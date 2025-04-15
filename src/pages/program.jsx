import React, { useState, useEffect } from 'react';
import ResponseSidebar from '../components/sidebar';
import { Link } from "react-router-dom";
import { GetPrograms } from '../services/getprograms';
import { CreatePrograms } from '../services/createprogram';
import { deleteProgram } from '../services/deleteprogram';
import { editProgram } from '../services/editprogram'; // Make sure this import exists
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Programs = () => {
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [programTitle, setProgramTitle] = useState('');
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [updatingProgram, setUpdatingProgram] = useState(false);

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
    ];

    useEffect(() => {
        const fetchPrograms = async () => {
            setLoading(true);
            try {
                const data = await GetPrograms();
                if (Array.isArray(data)) {
                    setPrograms(data);
                } else if (data && data.results && Array.isArray(data.results)) {
                    // Handle if API returns results in a nested object
                    setPrograms(data.results);
                } else {
                    // Handle any other structure the API might return
                    console.warn("Unexpected data format from API:", data);
                    setPrograms([]);
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching programs:", err);
                setError("Failed to load programs. Please try again later.");
                setPrograms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleSubmit = async () => {
        if (!programTitle.trim()) return;

        setLoading(true);
        try {
            const newProgram = await CreatePrograms({ title: programTitle });
            if (newProgram) {
                setPrograms([newProgram, ...programs]);
                setProgramTitle('');
                setIsModalOpen(false);
            } else {
                alert('Failed to create program.');
            }
        } catch (error) {
            console.error('Error creating program:', error);
            alert('Something went wrong while creating the program.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProgram = async (id) => {
        const result = await deleteProgram(id);
    
        if (result.success) {
            setPrograms(prev => prev.filter(program => program.id !== id));
            toast.success("Program deleted successfully!");
        } else {
            console.error("Failed to delete program:", result.error || "Unknown error");
            toast.error("An error occurred while deleting the program.");
        }
    };

    const startEditing = (program) => {
        setEditingId(program.id);
        setEditTitle(program.title);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle('');
    };

    const handleUpdateProgram = async () => {
        if (!editTitle.trim()) return;
        
        setUpdatingProgram(true);
        try {
            const result = await editProgram(editingId, { title: editTitle });
          
            if (result.success) {
                setPrograms(programs.map(program =>
                    program.id === editingId ? { ...program, title: editTitle } : program
                ));
                toast.success("Program updated successfully!");
            } else {
                toast.error(result.error || "Failed to update the program.");
            }
        } catch (error) {
            console.error("Error updating program:", error);
            toast.error("An error occurred while updating the program.");
        } finally {
            setUpdatingProgram(false);
            setEditingId(null);
            setEditTitle('');
        }
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

    // Filter programs based on search term
    const filteredPrograms = programs.filter(program => 
        program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Column */}
            <ResponseSidebar
                responses={sampleResponses}
                onSelectResponse={setSelectedResponse}
            />
            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold text-blue-900 mb-6">Programs</h1>

                {/* Add Program Form */}
                <div className="p-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h2 className="my-3">Create New Program</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors"
                        >
                            Add new
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-transparent backdrop-blur-md backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-lg font-semibold mb-4">Add Program Title</h3>

                                <input
                                    type="text"
                                    value={programTitle}
                                    onChange={(e) => setProgramTitle(e.target.value)}
                                    placeholder="Program Title"
                                    className="w-full px-4 py-2 border rounded-md mb-4"
                                />

                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search programs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Programs List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 bg-blue-900/5 border-b border-blue-900/10">
                        <h2 className="font-semibold text-blue-900">Programs List</h2>
                    </div>

                    {loading ? (
                        <div className="py-10 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                            <p className="mt-2 text-sm text-blue-900/50">Loading programs...</p>
                        </div>
                    ) : error ? (
                        <div className="py-10 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-red-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2 text-sm text-red-500/70">{error}</p>
                        </div>
                    ) : filteredPrograms.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-blue-900/5">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Created At</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-900/10">
                                    {filteredPrograms.map(program => (
                                        <tr key={program.id} className="hover:bg-blue-50/50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === program.id ? (
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            value={editTitle}
                                                            onChange={(e) => setEditTitle(e.target.value)}
                                                            className="px-2 py-1 border border-blue-900/20 rounded focus:outline-none focus:ring-1 focus:ring-blue-900/30 mr-2"
                                                            autoFocus
                                                        />
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={handleUpdateProgram}
                                                                disabled={updatingProgram}
                                                                className="p-1 bg-blue-900 text-white rounded hover:bg-green-600 focus:outline-none"
                                                                title="Save"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={cancelEditing}
                                                                className="p-1 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 focus:outline-none"
                                                                title="Cancel"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-900">{program.title}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(program.created_at || program.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-2">
                                                    {editingId !== program.id && (
                                                        <>
                                                            <button
                                                                onClick={() => startEditing(program)}
                                                                className="text-blue-600 hover:text-blue-900 focus:outline-none"
                                                                title="Edit"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProgram(program.id)}
                                                                className="text-red-600 hover:text-red-900 focus:outline-none"
                                                                title="Delete"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : programs.length > 0 ? (
                        <div className="py-10 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-yellow-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">No programs found with "{searchTerm}". Try a different search term.</p>
                        </div>
                    ) : (
                        <div className="py-10 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 mx-auto text-blue-900/20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="mt-2 text-sm text-blue-900/50">No programs found. Create your first program above.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Programs;