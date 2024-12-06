import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../FormField/FormField';


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
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); // Clear any errors when user starts typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/v1/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const result = await response.json();
            if (response.ok) {
              setSuccessMessage(result.message);
              setFormData({}); // Clear form on success
              localStorage.setItem('token', result.token);
              //Redirecting to the user's dashboard after successful registration
              navigate('/route');
            } else {
              setError(result.message || 'Registration failed');
            }
          } catch (err) {
            console.error('Error:', err);
            setError('Server error, please try again later');
          }
    };
    

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-blue-500">Sign Up</CardTitle>
                <CardDescription>Enter your details to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <ul className="grid grid-cols-2 gap-6">
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
                    <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">Sign Up</Button>
                    {/* <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-4 text-gray-500"> Or, Register with your Email</span>
                        <hr className="flex-grow border-gray-300" />
                    </div> */}
                    {/* <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        text="signup_with"
                        containerProps={{ className: "w-full bg-white text-gray-500 text-lg mt-4" }}
                    /> */}
                    <div className="text-center mt-4">
                        <span className="text-gray-600">
                            Already have an Account?
                        </span>
                        <a href='/login' className='text-blue-500 ml-2 hover:underline'>
                            Sign In
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>                
        </div>
        
    );
    
};
