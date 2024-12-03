import React, { useState } from 'react';
import { FormField } from '@/components/forms/FormField/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleLogin } from '@react-oauth/google';

type FieldType ={ 
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
};

type LoginFormProps = {
    fields: FieldType[];
    onSubmit: (formData: { [key: string]: string}) => void;
};

export function LoginForm({ fields, onSubmit }: LoginFormProps) {
    const [formData, setFormData ] = useState<{ [key: string]: string}>({});
    const [error, setError ] = useState<string | null>(null);
    const [successMessage, setSuccessMessage ] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); //Clear any errors when user starts typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);
                setFormData({}); //clearing the form
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login Failed!');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleGoogleSuccess = (credentialResponse: any) => {
        console.log('Google Login Success: ', credentialResponse);
    };

    const handleGoogleError = () => {
        setError('Google Sign-In Failed. Please try again.')
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 mt-10">
            <Card className="mx-auto max-w-md">
                <CardHeader>
                    {/* Login heading and the description below it */}
                    <CardTitle className="text-2xl text-blue-500">Sign In</CardTitle>
                    <CardDescription>Enter your details to sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {/* Fields in the form  */}
                        <ul className="grid gap-4">
                            {fields.map((field) => (
                                <li key={field.id}>
                                    <FormField 
                                        id={field.id}
                                        label={field.label}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ''}
                                        required={field.required}
                                        onChange={handleChange}
                                    />        
                                </li>
                            ))}
                        </ul>
                        {error && <div className="text-red-500">{error}</div>}
                        {successMessage && <div className="text-green-500">{successMessage}</div>}
                        {/* Login button */}
                        <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">Sign In</Button>
                        {/* Forgot password Link */}
                        <div className="mt-2">
                            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        {/* Separator with text */}
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-4 text-gray-500"> Or, Sign In with</span>
                            <hr className="flex-grow border-gray-300"/>
                        </div>
                        {/* Login with google div */}
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            text="signin_with"
                            containerProps={{ className: "w-full bg-white text-gray-500 text-lg mt-4" }}
                        />
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500">
                                Don't have an account?
                                <a href="/register" className="text-blue-500 hover:underline ml-1">
                                Sign Up
                                </a>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}