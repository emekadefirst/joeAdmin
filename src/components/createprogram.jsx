// import React, { useState } from "react";

// const CreateProgram = () => {

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//             program: selectedProgram,
//             title: contentTitle,
//             date: contentDate,
//             content: content,
//         };
//         console.log("Form Submitted", formData);
//         // Handle your submit logic here (e.g., send formData to API)
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//             <h2 className="text-lg font-semibold text-blue-900 mb-4">Create New Program</h2>
//             {showAddForm && (
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-4">
//                             <label htmlFor="contentTitle" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Title
//                             </label>
//                             <input
//                                 id="contentTitle"
//                                 type="text"
//                                 placeholder="e.g., Day 1: Introduction"
//                                 value={contentTitle}
//                                 onChange={(e) => setContentTitle(e.target.value)}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/30"
//                                 required
//                             />
//                         </div>    
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-end space-x-3">
//                         <button
//                             type="button"
//                             onClick={() => setShowAddForm(false)}
//                             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors"
//                         >
//                             Save Content
//                         </button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default CreateProgram;
