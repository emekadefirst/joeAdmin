import React, { useState, useEffect } from "react";
import { GetPrograms } from "../services/getprograms"; 
import CreateDailyService from "../services/createdaily";

const CreateDailyContent = () => {
    const [selectedProgram, setSelectedProgram] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentDate, setContentDate] = useState("");
    const [content, setContent] = useState("");
    const [showAddForm, setShowAddForm] = useState(true); 
    const [programs, setPrograms] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Fetch programs when the component mounts
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const fetchedPrograms = await GetPrograms();
                setPrograms(fetchedPrograms);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    const resetForm = () => {
        setSelectedProgram("");
        setContentTitle("");
        setContentDate("");
        setContent("");
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = {
            program: selectedProgram,  
            topic: contentTitle,
            date: contentDate,
            content: content
        };
    
        try {
            const response = await CreateDailyService(formData); 
            if (response) {
                console.log("Content created successfully:", response);
                setShowSuccess(true);
                resetForm();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                console.error("Failed to create content.");
            }
        } catch (error) {
            console.error("Error creating content:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 relative">
            {/* Success animation overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg animate-fade-in">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                            <svg className="w-8 h-8 text-green-500 animate-success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <p className="text-xl font-medium text-green-600">Content Saved Successfully!</p>
                    </div>
                </div>
            )}

            <h2 className="text-lg font-semibold text-blue-900 mb-4">Create New Content</h2>
            {showAddForm && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
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
                                placeholder="e.g., Day 1: Introduction"
                                value={contentTitle}
                                onChange={(e) => setContentTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
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
                                placeholder="Enter your content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                                required
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 bg-blue-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors relative ${
                                isSubmitting ? "opacity-75" : "hover:bg-blue-800"
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="inline-block mr-2">Saving</span>
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                </>
                            ) : (
                                "Save Content"
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
export default CreateDailyContent;