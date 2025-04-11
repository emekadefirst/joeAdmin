const apiDomain = 'http://127.0.0.1:8000';
// window.REACT_APP_API_DOMAIN ||
/**
 * Makes an API call to the specified endpoint
 * @param {string} path - API endpoint path
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method - HTTP method
 * @param {object|null} [data=null] - Request body data (not used for GET/DELETE)
 * @param {string|null} [authToken=null] - Authorization token
 * @returns {Promise<any>} - Parsed JSON response
 * @throws {Error} - When request fails or response is not OK
 */
export default async function apiCall(endpoint, method, data, isFormData = false) {
  try {
      const headers = {};
      
      // Only set Content-Type for JSON requests, FormData sets its own boundary
      if (!isFormData) {
          headers['Content-Type'] = 'application/json';
      }
      
      // Add auth token if available
      if (localStorage.getItem('accessToken')) {
          headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
      }
      
      const requestOptions = {
          method,
          headers,
          // Don't stringify FormData objects
          body: isFormData ? data : JSON.stringify(data)
      };
      
      const response = await fetch(`/api/${endpoint}`, requestOptions);
      const responseData = await response.json();
      
      if (!response.ok) {
          console.error('API Error Details:', responseData);
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return responseData;
  } catch (error) {
      console.error('API call failed:', error);
      throw error;
  }
}