import React from "react";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";


const fields =[
    {
        id:'email', 
        label:'Email', 
        type: 'email', 
        placeholder: 'Your email', 
        required: true
    }, 
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true
    },
];

export function LoginPage() {
    
    const handleLoginSubmit = (formData: { [key: string]: string}) => {
        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-4">Welcome back 👋</h2>
            <LoginForm fields={fields} onSubmit={handleLoginSubmit} />
        </div>
    ) 
};