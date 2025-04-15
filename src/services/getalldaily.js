import { apiDomain } from "./api";


export const fetchAllDaily = async () => {
    try {
      const response = await fetch(`${apiDomain}/api/daily-study`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching daily content:', error);
      return []; 
    }
  };
  