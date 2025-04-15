import { apiDomain } from "./api";

const LoginService = async ({ email, password }) => {
    try {
        const response = await fetch(`${apiDomain}/users/v1/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || errorData.message || 'Login failed');
        }

        const responseData = await response.json();
        
        if (!responseData.access || !responseData.refresh || !responseData.user) {
            throw new Error('Invalid response from server');
        }

        // Store tokens and user data
        localStorage.setItem('accessToken', responseData.access);
        localStorage.setItem('refreshToken', responseData.refresh);
        localStorage.setItem('userID', responseData.user.id);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('role', responseData.user.role);

        return {
            message: responseData.message || 'Login successful',
            user: responseData.user
        };
    } catch (error) {
        console.error('Login error:', error);
        // Clear any existing tokens on failure
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw new Error(error.message || 'Login failed. Please try again.');
    }
};

export default LoginService;