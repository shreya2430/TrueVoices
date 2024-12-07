import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField/FormField';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.userId) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
    } else {
      setErrorMessage('User not found. Please login again');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage(''); // Clear any errors when the user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage('New Passwords do not match');
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      setErrorMessage('Please enter your current password to update to a new one.');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.userId;

      if (!userId) {
        setErrorMessage('User ID not found. Please login again.');
        navigate('/login');
        return;
      }

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        ...(formData.newPassword && { password: formData.newPassword }),
      };

      console.log('Sending update request for userId:', userId);
      console.log('Request body:', updateData);

      const response = await fetch(`http://localhost:3000/v1/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updateData),
      });

      // Log the response status and result
      console.log('Response status:', response.status);

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message || 'Profile updated successfully!');
        // Update localStorage with new user data
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('user') || '{}'),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          })
        );
      } else {
        setErrorMessage(result.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-500">Update Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormField
              id="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              required
              onChange={handleChange}
            />
            <FormField
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              required
              onChange={handleChange}
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              required
              onChange={handleChange}
            />
            <FormField
              id="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <FormField
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
            <Button type="submit" className="w-full bg-blue-500 text-lg mt-4">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
