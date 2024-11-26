import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField/FormField';

type FieldType ={
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
};

type RegisterFormProps = {
    fields: FieldType[];
    onSubmit: (formData: { [key: string]: string }) => void;
}

export function RegisterForm({ fields, onSubmit }: RegisterFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); //Clear any errors when user starts typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        //pass form data to parents
        onSubmit(formData);
    };

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-blue-500">Sign Up</CardTitle>
                <CardDescription>Enter your details to create an account</CardDescription>
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
                    <Button type="submit" className="w-full bg-blue-500 text-lg">Sign Up</Button>
                </form>
            </CardContent>
        </Card>
    );
    
};

