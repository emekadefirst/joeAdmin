// const apiDomain = 'https://pale-joellen-emekadefirst-db64cc83.koyeb.app';

// window.REACT_APP_API_DOMAIN ||

// export default apiDomain;
// import axios from "axios";



// const apiDomain = process.env.REACT_APP_API_DOMAIN || 'http://127.0.0.1:8000'; 
export const apiDomain = 'http://127.0.0.1:8000'
import axios from "axios";

export async function ApiCall(endpoint, method = 'GET', Token = null, data = null) {
    const config = {
      method: method,
      url: `${apiDomain}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(Token && { Authorization: `Bearer ${Token}` }),
      },
      ...(data && { data }),
    };
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (err) {
      if (err.response) {
        // Handle specific status codes
        if (err.response.status === 401) {
          console.error("Unauthorized access - possibly invalid token");
        }
        console.error("API Error:", err.response.data);
        throw new Error(err.response.data.message || 'API request failed');
      } else if (err.request) {
        console.error("No response received:", err.request);
        throw new Error('No response from server');
      } else {
        console.error("Request setup error:", err.message);
        throw new Error('Request setup failed');
      }
    }
  }
