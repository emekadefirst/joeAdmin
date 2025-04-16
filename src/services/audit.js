import { apiDomain } from "./api";

export const fetchAuditLogs = async () => {
  const Token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${apiDomain}/audit-log/audit-logs/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,  
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audit logs: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
};
