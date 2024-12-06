import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '../forms/FormField/FormField';


export const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
      } else {
        setErrorMessage(result.message || 'Reset password failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Server error, please try again later');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-500">Reset Password</CardTitle>
          <CardDescription>Enter your email and new password to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={handleChange}
            />
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              required
              onChange={handleChange}
            />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">Reset Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};