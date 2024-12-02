import React from 'react';
import { RegisterForm } from '@/components/forms/RegisterForm/RegisterForm';

const fields = [
    {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'John',
        required: true,
    }, 
    {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Doe',
        required: false,
    }, 
    {
        id: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'JohnDoe',
        required: true,
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'johndoe@example.com',
        required: true,
    }, 
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
    }, 
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm Password',
        required: true,
    }, 
];

export function RegisterPage() {
    const handleFormSubmit = (formData: { [key: string]: string }) => {
        console.log(formData);
    };

    return (

        <div className="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-6 mt-10">
                <h2 className="text-2xl font-bold mb-2">Sign up for free 🤗</h2>
                <p className="text-gray-600">
                    You will get 2 video and 10 text testimonial credits for FREE!
                </p>
            </div>
            <RegisterForm fields={fields} onSubmit={handleFormSubmit} />
        </div>
        
    )    
}