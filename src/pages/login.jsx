import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LoginService from '../services/login';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
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
        
        try {
            const message = await LoginService(formData);
            toast.success(message || 'Login successful! Redirecting...');
            
            // Get role from localStorage if it was set by LoginService
            const role = localStorage.getItem('role');
            
            // Redirect based on role
            setTimeout(() => {
                if (role === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    // Handle other roles as needed
                    navigate('/user-home');
                }
            }, 1000);
        } catch (error) {
            toast.error(error || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
            
            {/* Silk overlay effect */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-900/20 to-blue-900/30 backdrop-blur-sm"></div>
            
            <div className="w-full max-w-md relative z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">
                            Admin Dashboard
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                                className="w-full px-4 py-2 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
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
                                className="w-full px-4 py-2 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <Link to="/request-reset" className="text-blue-900 hover:text-grey-700">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors shadow-lg disabled:opacity-70"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;