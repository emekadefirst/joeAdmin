import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LoginService from '../services/login';
import '../assets/css/Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState(null); // 'success', 'error', or null
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginStatus(null);
        
        try {
            const message = await LoginService(formData);
            setLoginStatus('success');
            
            // Show success toast with longer duration
            toast.success(message || 'Login successful! Redirecting...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            // Get role from localStorage if it was set by LoginService
            const role = localStorage.getItem('role');
            
            // Redirect after showing success state
            setTimeout(() => {
                if (role === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    navigate('/user-home');
                }
            }, 1500); // Increased timeout to allow users to see the success state
        } catch (error) {
            setLoginStatus('error');
            toast.error(error || 'Login failed. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    // Determine button classes based on state
    const getButtonClasses = () => {
        const baseClasses = "w-full font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 shadow-lg";
        
        if (isLoading) {
            return `${baseClasses} bg-blue-800 text-white/80 cursor-wait`;
        }
        
        if (loginStatus === 'success') {
            return `${baseClasses} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500`;
        }
        
        if (loginStatus === 'error') {
            return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`;
        }
        
        return `${baseClasses} bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-500`;
    };
    
    return (
        <div className="relative z-20 px-4 sm:px-0 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background blur effect */}
            <div 
                className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
                style={{ 
                    filter: 'blur(5px)',
                    transform: 'scale(1.1)'  
                }}
            ></div>
            
            {/* Silk overlay effect with gradient */}
            <div 
                className="absolute inset-0 z-10 bg-gradient-to-br from-green-900/20 to-blue-900/30 backdrop-blur-sm"
                style={{ backgroundSize: '200% 200%' }}
                id="animated-gradient"
            ></div>
            
            <div className="w-full max-w-md relative z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20 transition-all duration-300 hover:shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">
                            Admin Dashboard
                        </h1>
                        {loginStatus === 'success' && (
                            <div className="mt-3 text-green-600 font-medium status-message">
                                Login successful! Redirecting you now...
                            </div>
                        )}
                        {loginStatus === 'error' && (
                            <div className="mt-3 text-red-600 font-medium status-message">
                                Login failed. Please check your credentials.
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="transition-opacity duration-300">
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading || loginStatus === 'success'}
                                className="w-full px-4 py-2 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all duration-200 disabled:opacity-75"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading || loginStatus === 'success'}
                                className="w-full px-4 py-2 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all duration-200 disabled:opacity-75"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    disabled={isLoading || loginStatus === 'success'}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <Link to="/request-reset" className="text-blue-900 hover:text-blue-700 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || loginStatus === 'success'}
                            className={getButtonClasses()}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner-border mr-2"></div>
                                    <span>Logging in...</span>
                                </div>
                            ) : loginStatus === 'success' ? (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Success!</span>
                                </div>
                            ) : loginStatus === 'error' ? (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>Try Again</span>
                                </div>
                            ) : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;