import React, { useState } from "react";
import ResponseSidebar from '../components/sidebar';
import CreateDailyContent from "../components/createdaily";
import { bulk } from '../services/daily/bulk';

const CreateDailyPage = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [excelFile, setExcelFile] = useState(null); // State to handle the file upload

  // Programs data (this could be dynamic or fetched from an API)
  const programs = [
    { id: "1", title: "Program A" },
    { id: "2", title: "Program B" },
    // Add more programs as needed
  ];



  const handleAddContent = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('upload', excelFile);  // `excelFile` is the file from the input field

    try {
        // Send the FormData to the API using the bulk function
        const responseMessage = await bulk(formData);
        console.log("Upload successful:", responseMessage);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Column */}
      <ResponseSidebar 

      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto mt-15">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Upload Bulk Daily content</h2>
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
