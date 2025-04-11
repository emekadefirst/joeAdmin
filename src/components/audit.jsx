import React, { useEffect, useState } from 'react';
import { fetchAuditLogs } from '../services/audit';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const AuditTray = () => {
  const [auditData, setAuditData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  // Fetch audit logs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAuditLogs();
        setAuditData(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchData();
  }, []);

  // Sort function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Extract changed data title
  const getChangedDataTitle = (item) => {
    if (item.changes?.new?.title) {
      return item.changes.new.title;
    }
    return item.model_name + ' #' + item.object_id;
  };

  // Filtered data based on search term
  const filteredData = auditData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const dataTitle = getChangedDataTitle(item).toLowerCase();
    const userName = item.user?.name || item.user?.email || 'System';
    
    return (
      userName.toLowerCase().includes(searchLower) ||
      dataTitle.includes(searchLower) ||
      item.action.toLowerCase().includes(searchLower) ||
      item.model_name.toLowerCase().includes(searchLower)
    );
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'user') {
      const aValue = a.user?.name || a.user?.email || 'System';
      const bValue = b.user?.name || b.user?.email || 'System';
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (sortField === 'data') {
      const aValue = getChangedDataTitle(a);
      const bValue = getChangedDataTitle(b);
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (sortField === 'action') {
      return sortDirection === 'asc' 
        ? a.action.localeCompare(b.action) 
        : b.action.localeCompare(a.action);
    } else {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  // Column header component with sort indicators
  const SortableHeader = ({ field, label }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider cursor-pointer"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        <span>{label}</span>
        <span className="ml-1">
          {sortField === field ? (
            sortDirection === 'asc' ? (
              <ChevronUp size={16} className="inline" />
            ) : (
              <ChevronDown size={16} className="inline" />
            )
          ) : null}
        </span>
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-blue-900">Activity Log</h2>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search activity logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={18} />
          </div>
        </div>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader field="user" label="User" />
                  <SortableHeader field="data" label="Data" />
                  <SortableHeader field="action" label="Action" />
                  <SortableHeader field="timestamp" label="Time" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.length > 0 ? (
                  sortedData.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.user?.name || item.user?.email || 'System Action'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">{getChangedDataTitle(item)}</span>
                          <span className="text-gray-500 text-xs ml-2">({item.model_name})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.action === 'CREATE' ? 'bg-green-100 text-green-800' : 
                           item.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' : 
                           item.action === 'DELETE' ? 'bg-red-100 text-red-800' : 
                           'bg-gray-100 text-gray-800'}`}>
                          {item.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      <p className="font-medium">No activity logs found</p>
                      <p className="text-sm mt-1">Activity will appear here as users interact with the system</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-lg flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {filteredData.length} {filteredData.length === 1 ? 'activity' : 'activities'} found
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Export logs →
        </button>
      </div>
    </div>
  );
};

export default AuditTray;