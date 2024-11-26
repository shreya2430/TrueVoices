import React from "react";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";


const fields =[
    {
        id:'email', 
        label:'Email', 
        type: 'email', 
        placeholder: 'Enter your email', 
        required: true
    }, 
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true
    },
];

export function LoginPage() {
    
    const handleLoginSubmit = (formData: { [key: string]: string}) => {
        console.log(formData);
    };

    return <LoginForm fields={fields} onSubmit={handleLoginSubmit} />;
};