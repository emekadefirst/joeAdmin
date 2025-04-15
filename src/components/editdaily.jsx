import React, { useState, useEffect } from "react";
import { GetPrograms } from "../services/getprograms";
import { editDailyProgram } from "../services/editdaily";
import { retrieveDaily } from "../services/retreDaily";

const EditDailyModal = ({ id, isOpen, onClose, onUpdateSuccess }) => {
    const [selectedProgram, setSelectedProgram] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentDate, setContentDate] = useState("");
    const [content, setContent] = useState("");
    const [programs, setPrograms] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const fetchPrograms = async () => {
            try {
                const fetchedPrograms = await GetPrograms();
                if (Array.isArray(fetchedPrograms)) {
                    setPrograms(fetchedPrograms.filter(p => p && p.id && p.title));
                }
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        const fetchDailyContent = async () => {
            try {
                const data = await retrieveDaily(id);
                if (data) {
                    setSelectedProgram(data.program || "");
                    setContentTitle(data.topic || "");
                    setContentDate(data.date || "");
                    setContent(data.content || "");
                }
            } catch (error) {
                console.error("Error fetching daily content:", error);
            }
        };

        fetchPrograms();
        fetchDailyContent();
    }, [id, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            program: selectedProgram,
            topic: contentTitle,
            date: contentDate,
            content: content,
        };

        try {
            const response = await editDailyProgram(id, formData);
            if (response) {
                // Create an updated content object
                const updatedContent = {
                    id: id,
                    program: selectedProgram,
                    topic: contentTitle,
                    title: contentTitle,
                    date: contentDate,
                    content: content
                };
                
                // Call the callback function to update parent state
                if (onUpdateSuccess) {
                    onUpdateSuccess(updatedContent);
                }
                
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onClose(); // Close the modal after success
                }, 2000);
            } else {
                console.error("Failed to update content.");
            }
        } catch (error) {
            console.error("Error updating content:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop with blur effect */}
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            
            {/* Modal content */}
            <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto border border-white/20">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold text-blue-900">Edit Daily Content</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 relative">
                    {showSuccess && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-green-600">Updated Successfully!</p>
                            </div>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Program Select */}
                        <div>
                            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                                Program
                            </label>
                            <select
                                id="program"
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                                required
                            >
                                <option value="">Select a program</option>
                                {programs.map((program) => (
                                    <option key={program.id} value={program.title}>
                                        {program.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Title Input */}
                        <div>
                            <label htmlFor="contentTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                id="contentTitle"
                                type="text"
                                value={contentTitle}
                                onChange={(e) => setContentTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                                placeholder="e.g. Day 3: Building with React"
                                required
                            />
                        </div>

                        {/* Date Input */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={contentDate}
                                onChange={(e) => setContentDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                                required
                            />
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                                placeholder="Enter the study content here..."
                                rows={6}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg transition hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 bg-blue-900 text-white rounded-lg transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 ${
                                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center space-x-2">
                                        <span>Updating</span>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    </span>
                                ) : (
                                    "Update Content"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDailyModal;