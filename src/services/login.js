import apiCall from "./api";

export default async function LoginService(data) {
    try {
        const response = await apiCall('users/v1/login/', 'POST', data);
        if (response) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            localStorage.setItem('userID', response.user.id);
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('email', response.user.email);
            const role = response.user.role
            return response.message || 'Login successful';
        }
        throw new Error('No response received from server');
    } catch (error) {
        console.error('Login failed:', response.message);
        throw response.message; 
    }
}

