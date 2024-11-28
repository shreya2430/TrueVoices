// Handle successful response
export function setSuccess(data, res, message = 'Request was successful') {
    return res.status(200).json({
        message: message,
        data: data
    });
}

// Handle error response
export function setError(error, res) {
    let statusCode = 500;
    let errorResponse = {
        message: error.message || 'Something went wrong',
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
    };

    if (error.message?.includes('not found')) {
        statusCode = 404;
        errorResponse = {
            message: error.message,
            code: 'NOT_FOUND',
            statusCode: 404
        };
    } else if (error.message?.includes('spaceId cannot be empty')) {
        statusCode = 400;
        errorResponse = {
            message: error.message,
            code: 'BAD_REQUEST',
            statusCode: 400
        };
    }

    console.error('Error:', error);
    return res.status(statusCode).json(errorResponse);
}