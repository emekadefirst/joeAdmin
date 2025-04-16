import { ApiCall } from "../api";

export async function LogoutService() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      console.warn('No tokens found in storage');
      return true; 
    }

    const response = await ApiCall('/users/v1/logout/', 'POST', accessToken, {
      refresh_token: refreshToken
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    
    return true;
  } catch (error) {
    console.error("Error during logout:", error.message);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    return false;
  }
}