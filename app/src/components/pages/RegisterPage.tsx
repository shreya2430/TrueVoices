import React from 'react';
import { RegisterForm } from '@/components/forms/RegisterForm/RegisterForm';

const fields = [
    {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true,
    }, 
    {
        id: 'kastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter your last name',
        required: true,
    }, 
    {
        id: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        required: true,
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
    }, 
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Atleast 6 characters',
        required: true,
    }, 
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Retype your password',
        required: true,
    }, 
];

export function RegisterPage() {
    const handleFormSubmit = (formData: { [key: string]: string }) => {
        console.log(formData);
    };

    return <RegisterForm fields={fields} onSubmit={handleFormSubmit} />;   
}