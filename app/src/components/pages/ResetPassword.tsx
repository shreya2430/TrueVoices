import React, {useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function ResetPasswordPage(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:3000/v1/auth/reset-password", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccessMessage("A reset link has been sent to your email.");
                setEmail("");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to send reset link.");
            }
        } catch (error) {
            setErrorMessage("An error occurred.Please try again.");
        }
    };

    const handleResetPasswordClick = () => {
        navigate("/reset-password");
    };
    
    return (
        <div className="flex items-center justify-center mt-24">
            <div className="flex flex-col items-center bg-white rounded-md p-8 max-w-lg">
                {/* Header Section */}
                <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold mb-2">Forgot your password?</h1>
                    <p className="text-gray-600">We'll email you a link to reset it.</p>
                </div>

                {/* Form Section */}
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
                        <Button 
                            onClick={handleResetPasswordClick} 
                            className="w-full bg-blue-500 text-md text-white mt-4">
                            Reset Password
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <a href="/login" className="text-blue-500 hover:underline">Go to Sign-In Page</a>
                    </div>
                </div>
            </div>
        </div>
    ); 
}