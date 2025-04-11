import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;

        // Move focus to the next input if the current one is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        setOtp(updatedOtp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        // Here you can add logic to handle OTP validation (e.g., API call)
        console.log('OTP Submitted:', otpValue);

        // Navigate to another page after OTP submission (e.g., success page)
        navigate('/otp-success'); // Example navigation path
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
                {/* OTP Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900">Enter OTP</h1>
                    </div>

                    {/* OTP Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    id={`otp-input-${index}`}
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 bg-white/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    placeholder="0"
                                    autoFocus={index === 0}
                                    required
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors shadow-lg"
                        >
                            Submit OTP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
