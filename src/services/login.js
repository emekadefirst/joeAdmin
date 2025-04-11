import apiCall from "./api";

const apiDomain = 'http://127.0.0.1:8000';

const LoginService = async ({ email, password }) => {
    try {
        const response = await fetch(`${apiDomain}/users/v1/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await response.json();

        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userID', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role);

        return data.message || 'Login successful';
    } catch (error) {
        console.error('Login failed:', error);
        throw error.message || 'Login failed. Please try again.';
    }
};

export default LoginService;
