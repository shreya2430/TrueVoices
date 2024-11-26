import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import './Style.css';


export function RegisterForm() {

  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '',
    username: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null); //Clear any errors when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validating form data
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setFormData({
          firstName: '', 
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }  else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration Failed!');
      }
  } catch (err) {
    setError('An error occurred. Please try again later.');
  }
};


  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-500">Sign Up</CardTitle>
        <CardDescription>
          Enter your details to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* register a user form */}
        <form onSubmit={handleSubmit} className="grid gap-4"> 
          <div className="grid grid-cols-2 gap-6">
            {/* First Name */}
            <div className="grid gap-2">
              <Label htmlFor="firstName" className="text-blue-500">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName" className="text-blue-500">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-blue-500">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe123"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-blue-500">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-blue-500">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-blue-500">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Retype Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <Button type="submit" className="w-full bg-blue-500 text-lg">
            Sign Up
          </Button>
        </form> 
      </CardContent>
    </Card>
  )
}


