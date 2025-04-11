import React, { useState } from "react";
import ResponseSidebar from '../components/sidebar';
import CreateDailyContent from "../components/createdaily";

const CreateDailyPage = () => {
  // Example sampleResponses data
  const sampleResponses = [
    { id: 1, title: "Response 1" },
    { id: 2, title: "Response 2" },
    { id: 3, title: "Response 3" },
  ];

  // State to track the selected response and other form fields
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [excelFile, setExcelFile] = useState(null); // State to handle the file upload

  // Programs data (this could be dynamic or fetched from an API)
  const programs = [
    { id: "1", title: "Program A" },
    { id: "2", title: "Program B" },
    // Add more programs as needed
  ];

  // Handle form submission
  const handleAddContent = (e) => {
    e.preventDefault();
    const formData = {
      contentTitle,
      excelFile,
      selectedProgram,
    };
    console.log("Form Submitted", formData);
    // Handle your submit logic here (e.g., send formData to API)
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Column */}
      <ResponseSidebar 
        responses={sampleResponses}
        onSelectResponse={setSelectedResponse}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto mt-15">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Create New Content</h2>
          <form onSubmit={handleAddContent} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* File Input for Excel */}
              <div>
                <label htmlFor="excelFile" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Excel format
                </label>
                <input
                  id="excelFile"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setExcelFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  required
                />
              </div>

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
                  {programs.map(program => (
                    <option key={program.id} value={program.id}>{program.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedResponse(null)}
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
        </div>

        {/* Nested CreateDailyContent component */}
        <CreateDailyContent />
      </div>
    </div>
  );
};

export default CreateDailyPage;
