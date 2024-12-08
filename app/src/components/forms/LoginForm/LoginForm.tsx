/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FormField } from '@/components/forms/FormField/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next"; // Import translation hook
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';

type FieldType = { 
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
};

type LoginFormProps = {
    fields: FieldType[];
};

export function LoginForm({ fields }: LoginFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();  // Initialize translation hook

    // Extract the redirect path from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get('redirect') || '/'; // Default to dashboard if no redirect

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); // Clear any errors when the user starts typing
    };
    const { setUser } = useUser();

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

            // Ensure the response contains all necessary fields
            if (
                data.userId &&
                data.firstName &&
                data.lastName &&
                data.email &&
                typeof data.textCredits === 'number' &&
                typeof data.videoCredits === 'number' &&
                data.token
            ) {
                // Save all user details in localStorage
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        id: data.userId,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        textCredits: data.textCredits,
                        videoCredits: data.videoCredits,
                        token: data.token,
                    })
                );                

                setSuccessMessage(t('loginForm.successMessage')); // Translated success message
                setUser({
                    id: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    textCredits: data.textCredits,
                    videoCredits: data.videoCredits,
                    token: data.token,
                });
                setFormData({}); // Clear the form
                toast.success('Login successful!');
                // Redirect to the original page or fallback to the dashboard
                navigate(redirectPath);
            } else {
                setError(t('loginForm.errorMessage'));  // Translated error message
                toast.error(t('loginForm.errorMessage'));
            }
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Login failed!');
            setError(errorData.message || 'Login failed!');
        }
    } catch (err) {
        toast.error(t('loginForm.serverError'));  // Translated server error message
        setError('An error occurred. Please try again later.');
    }
};

    return (
        <div className="flex items-center justify-center bg-gray-100 mt-10">
            <Card className="mx-auto max-w-md">
                <CardHeader>
                    {/* Login heading and the description below it */}
                    <CardTitle className="text-2xl text-blue-500">{t('loginForm.signUp')}</CardTitle>
                    <CardDescription>{t('loginForm.enterDetails')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {/* Fields in the form */}
                        <ul className="grid gap-4">
                            {fields.map((field) => (
                                <li key={field.id}>
                                    <FormField 
                                        id={field.id}
                                        label={t(field.label)}
                                        type={field.type}
                                        placeholder={t(field.placeholder)}
                                        value={formData[field.id] || ''}
                                        required={field.required}
                                        onChange={handleChange}
                                    />        
                                </li>
                            ))}
                        </ul>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
                        {/* Login button */}
                        <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">{t('loginForm.signInButton')}</Button>
                        {/* Forgot password Link */}
                        {/* <div className="mt-2">
                            <a href="/reset-password" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </a>
                        </div> */}
                        {/* Separator with text */}
                        {/* <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-4 text-gray-500"> Or, Sign In with</span>
                            <hr className="flex-grow border-gray-300"/>
                        </div> */}
                        {/* Login with google div */}
                        {/* <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            text="signin_with"
                            containerProps={{ className: "w-full bg-white text-gray-500 text-lg mt-4" }}
                        /> */}
                        {/* </div> */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500">
                                {t('loginForm.noAccount')}
                                <a href={`/register?redirect=${encodeURIComponent(redirectPath)}`} className="text-blue-500 hover:underline ml-1">
                                {t('loginForm.signUp')}
                                </a>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};