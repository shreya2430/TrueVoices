import { z } from 'zod';

export const UserSchema = z
	.object({
		firstName: z
			.string()
			.min(1, 'First name is required')
			.max(20, 'First name must be 20 characters or less'),
		lastName: z
			.string()
			.min(1, 'Last name is required')
			.max(20, 'Last name must be 20 characters or less'),
		username: z
			.string()
			.min(1, 'Username is required')
			.max(20, 'Username must be 20 characters or less'),
		email: z.string().email('Invalid email address'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(20, 'Password must be 20 characters or less'),
		confirmPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(20, 'Password must be 20 characters or less'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'], // Path for the error message
	})

export type User = z.infer<typeof UserSchema>;

export const UserResSchema = z.object({
    token: z.string().min(1,"Token is required"),
    message: z.string().min(1,"Message is required"),
  });
  
  // Infer the TypeScript type
  export type UserResponse = z.infer<typeof UserResSchema>;

export type getUserRes = {
	_id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	textCredits: number;
	videoCredits: number;
}