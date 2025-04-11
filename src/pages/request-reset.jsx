import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestReset() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you can add logic to handle the password reset request (e.g., API call)
        console.log('Reset request submitted for:', email);

        // After submission, navigate to a success page or login page
        navigate('/verify-otp'); // Example navigation path
    };

    return (
        <div className="relative z-20 px-4 sm:px-0 min-h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
                style={{
                    filter: 'blur(5px)',
                    transform: 'scale(1.1)',
                }}
            ></div>

            {/* Silk overlay effect */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-900/20 to-blue-900/30 backdrop-blur-sm"></div>

            <div className="w-full max-w-md relative z-20">
                {/* Reset Request Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">Submit Email</h1>
                    </div>

                    {/* Reset Form */}
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
                                value={email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors shadow-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
