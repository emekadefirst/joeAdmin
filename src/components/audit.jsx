import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, User, Clock, FileText, AlertCircle } from 'lucide-react';

const AuditTray = () => {
  const [sortField, setSortField] = useState('time');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample audit data
  const auditData = [
    {
      id: 1,
      user: {
        name: 'Pastor David Johnson',
        email: 'pastor.david@churchdomain.org',
        role: 'Admin'
      },
      data: {
        type: 'Program',
        name: 'Fruits of the Spirit',
        details: 'Bible study program content'
      },
      action: 'Created',
      time: '2025-04-11T09:43:12'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Miller',
        email: 'sarah.m@churchdomain.org',
        role: 'Editor'
      },
      data: {
        type: 'Daily Content',
        name: 'Day 3: Patience',
        details: 'Modified scripture references'
      },
      action: 'Updated',
      time: '2025-04-10T16:22:45'
    },
    {
      id: 3,
      user: {
        name: 'Michael Chen',
        email: 'michael.c@churchdomain.org',
        role: 'Contributor'
      },
      data: {
        type: 'Daily Content',
        name: 'Day 12: Faithfulness',
        details: 'Added reflection questions'
      },
      action: 'Updated',
      time: '2025-04-10T14:37:21'
    },
    {
      id: 4,
      user: {
        name: 'Lisa Rodriguez',
        email: 'lisa.r@churchdomain.org',
        role: 'Admin'
      },
      data: {
        type: 'Program',
        name: 'Book of Romans',
        details: 'New program structure'
      },
      action: 'Created',
      time: '2025-04-09T11:05:38'
    },
    {
      id: 5,
      user: {
        name: 'Pastor David Johnson',
        email: 'pastor.david@churchdomain.org',
        role: 'Admin'
      },
      data: {
        type: 'User',
        name: 'James Wilson',
        details: 'Added as Contributor'
      },
      action: 'Added',
      time: '2025-04-09T10:12:53'
    }
  ];

  // Sort function for audit data
  const sortedData = [...auditData].sort((a, b) => {
    if (sortField === 'time') {
      return sortDirection === 'asc' 
        ? new Date(a.time) - new Date(b.time)
        : new Date(b.time) - new Date(a.time);
    } else if (sortField === 'user') {
      return sortDirection === 'asc'
        ? a.user.name.localeCompare(b.user.name)
        : b.user.name.localeCompare(a.user.name);
    } else if (sortField === 'action') {
      return sortDirection === 'asc'
        ? a.action.localeCompare(b.action)
        : b.action.localeCompare(a.action);
    } else if (sortField === 'data') {
      return sortDirection === 'asc'
        ? a.data.name.localeCompare(b.data.name)
        : b.data.name.localeCompare(a.data.name);
    }
    return 0;
  });

  // Filter by search term
  const filteredData = sortedData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.user.name.toLowerCase().includes(searchLower) ||
      item.user.email.toLowerCase().includes(searchLower) ||
      item.data.name.toLowerCase().includes(searchLower) ||
      item.action.toLowerCase().includes(searchLower)
    );
  });

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get icon for action type
  const getActionIcon = (action) => {
    switch(action) {
      case 'Created':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          {action}
        </span>;
      case 'Updated':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          {action}
        </span>;
      case 'Deleted':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {action}
        </span>;
      case 'Added':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <User className="h-3 w-3 mr-1" />
          {action}
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          {action}
        </span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-blue-900">Audit Log</h2>
        <p className="text-sm text-gray-500">Track changes made to programs and content</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by user, action or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <button className="inline-flex items-center text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Filter
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('user')}
              >
                <div className="flex items-center">
                  User
                  {sortField === 'user' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="h-4 w-4 ml-1" /> : 
                      <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('data')}
              >
                <div className="flex items-center">
                  Data
                  {sortField === 'data' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="h-4 w-4 ml-1" /> : 
                      <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('action')}
              >
                <div className="flex items-center">
                  Action
                  {sortField === 'action' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="h-4 w-4 ml-1" /> : 
                      <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('time')}
              >
                <div className="flex items-center">
                  Time
                  {sortField === 'time' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="h-4 w-4 ml-1" /> : 
                      <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.user.name}</div>
                      <div className="text-xs text-gray-500">{item.user.email}</div>
                      <div className="text-xs text-gray-500">Role: {item.user.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.data.name}</div>
                  <div className="text-xs text-gray-500">Type: {item.data.type}</div>
                  <div className="text-xs text-gray-500">{item.data.details}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getActionIcon(item.action)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(item.time)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{filteredData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronDown className="h-5 w-5 transform rotate-90" />
              </button>
              <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronDown className="h-5 w-5 transform -rotate-90" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTray;