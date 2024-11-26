import React, { useState } from 'react';
import { FormField } from '@/components/forms/FormField/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); //Clear any errors when user starts typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="mx-auto max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-500">Login</CardTitle>
                    <CardDescription>Enter your details to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
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
                        <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}