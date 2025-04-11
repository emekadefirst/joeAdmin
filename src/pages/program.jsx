import React, { useState, useEffect } from 'react';
import ResponseSidebar from '../components/sidebar';
import { Link } from "react-router-dom";

const Programs = () => {
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [programTitle, setProgramTitle] = useState('');
    const [programs, setPrograms] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

    // Initialize with some sample programs
    useEffect(() => {
        const samplePrograms = [
            { id: 1, title: 'Morning Workout', createdAt: '2025-04-08T08:30:00Z' },
            { id: 2, title: 'Evening Meditation', createdAt: '2025-04-09T18:15:00Z' },
            { id: 3, title: 'Weekend Training', createdAt: '2025-04-10T10:00:00Z' }
        ];
        setPrograms(samplePrograms);
    }, []);

    const handleAddProgram = (e) => {
        e.preventDefault();
        if (!programTitle.trim()) return;

        const newProgram = {
            id: Date.now(),
            title: programTitle,
            createdAt: new Date().toISOString()
        };

        setPrograms([newProgram, ...programs]);
        setProgramTitle('');
        setIsModalOpen(false); // Close the modal after adding the program
    };

    const handleDeleteProgram = (id) => {
        setPrograms(programs.filter(program => program.id !== id));
    };

    const startEditing = (program) => {
        setEditingId(program.id);
        setEditTitle(program.title);
    };

    const handleUpdateProgram = () => {
        if (!editTitle.trim()) return;

        setPrograms(programs.map(program =>
            program.id === editingId ? { ...program, title: editTitle } : program
        ));

        setEditingId(null);
        setEditTitle('');
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
                        <div className="fixed inset-0  bg-transparent z-0 backdrop-blur-md backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-lg font-semibold mb-4">Add Program Title</h3>
                                <input
                                    type="text"
                                    value={programTitle}
                                    onChange={(e) => setProgramTitle(e.target.value)}
                                    placeholder="Program Title"
                                    className="w-full px-4 py-2 border rounded-md mb-4"
                                />
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddProgram}
                                        className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Programs List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 bg-blue-900/5 border-b border-blue-900/10">
                        <h2 className="font-semibold text-blue-900">Programs List</h2>
                    </div>

                    {programs.length > 0 ? (
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
                                    {programs.map(program => (
                                        <tr key={program.id} className="hover:bg-blue-50/50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{program.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === program.id ? (
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="px-2 py-1 border border-blue-900/20 rounded focus:outline-none focus:ring-1 focus:ring-blue-900/30"
                                                        autoFocus
                                                        onBlur={handleUpdateProgram}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleUpdateProgram()}
                                                    />
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-900">{program.title}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(program.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-2">
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
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
