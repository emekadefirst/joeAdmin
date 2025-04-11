import React, { useState } from "react";

const CreateDailyContent = () => {
    const [selectedProgram, setSelectedProgram] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentDate, setContentDate] = useState("");
    const [content, setContent] = useState("");
    const [showAddForm, setShowAddForm] = useState(true); // Track form visibility
    const [programs, setPrograms] = useState([
        { id: "1", title: "Program A" },
        { id: "2", title: "Program B" },
        // Add more programs as needed
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            program: selectedProgram,
            title: contentTitle,
            date: contentDate,
            content: content,
        };
        console.log("Form Submitted", formData);
        // Handle your submit logic here (e.g., send formData to API)
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
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
                                    <option key={program.id} value={program.id}>
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
                                placeholder="e.g., Day 1: Introduction"
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
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors"
                        >
                            Save Content
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreateDailyContent;
