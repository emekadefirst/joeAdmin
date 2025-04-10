const apiDomain = process.env.REACT_APP_API_DOMAIN || 'http://localhost:8000';

/**
 * Makes an API call to the specified endpoint
 * @param {string} path - API endpoint path
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method - HTTP method
 * @param {object|null} [data=null] - Request body data (not used for GET/DELETE)
 * @param {string|null} [authToken=null] - Authorization token
 * @returns {Promise<any>} - Parsed JSON response
 * @throws {Error} - When request fails or response is not OK
 */
async function apiCall(path, method, data = null, authToken = null) {
  const noBodyMethods = ['GET', 'DELETE'];
  
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
  };

  const config = {
    method,
    headers,
    ...(!noBodyMethods.includes(method) && data && { body: JSON.stringify(data) })
  };

  try {
    const response = await fetch(`${apiDomain}/${path}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

export default apiCall;