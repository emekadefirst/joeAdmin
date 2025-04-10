import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);

        toast.success('Login successful! Redirecting to dashboard...');
        
       
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000); 
    };
    
    return (
        <div className="relative z-20 px-4 sm:px-0 min-h-screen  flex items-center justify-center overflow-hidden">
          
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
                {/* Login Form Card with silk-like design */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">
                            Admin Dashboard
                        </h1>
  
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
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
                                <a href="#" className="text-blue-900 hover:text-grey-700">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
