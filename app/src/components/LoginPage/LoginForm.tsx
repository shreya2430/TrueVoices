import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";


export function LoginForm() {

  const [formData, setFormData ] = useState({ email: '', password: '' });
  const [error, setError ] = useState<string | null>(null);
  const [successMessage, setSuccessMessage ] = useState<string | null>(null);

  const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value }));
    //setError(null); //Clear any errors when user starts typing
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
        setFormData({ email: '', password: '' }); //clearing the form
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login Failed!');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-500">Login</CardTitle>
        <CardDescription>Enter your details to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-blue-500">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-blue-500">Password</Label>
            <Input 
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <Button type="submit" className="w-full bg-blue-500 text-lg">Login</Button>
          {/* Temporarily replace Link with a simple a tag */}
          <a href="/register" className="text-blue-500 underline mt-4 block text-center">Don't have an account? Sign Up</a>
        </form>
      </CardContent>
    </Card>
  )
}