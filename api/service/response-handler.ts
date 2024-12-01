import { Response } from 'express';

/**
 * Handles successful responses.
 *
 * @param data - The data to include in the response.
 * @param res - The Express response object.
 * @param message - Optional success message (default: 'Request was successful').
 */
export function setSuccess<T>(data: T, res: Response, message: string = 'Request was successful'): Response {
    return res.status(200).json({
        message,
        data,
    });
}

/**
 * Handles error responses.
 *
 * @param error - The error object or message.
 * @param res - The Express response object.
 */
export function setError(error: Error, res: Response): Response {
    let statusCode = 500;
    let errorResponse = {
        message: error.message || 'Something went wrong',
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
    };

    if (error.message?.includes('not found')) {
        statusCode = 404;
        errorResponse = {
            message: error.message,
            code: 'NOT_FOUND',
            statusCode: 404,
        };
    } else if (error.message?.includes('cannot be empty')) {
        statusCode = 400;
        errorResponse = {
            message: error.message,
            code: 'BAD_REQUEST',
            statusCode: 400,
        };
    }

    console.error('Error:', error);
    return res.status(statusCode).json(errorResponse);
}