// Handle successful response
export function setSuccess(data, res, message = 'Request was successful') {
    res.status(200).json({
        success: true,
        message: message,
        data: data
    });
}

// Handle error response
export function setError(errorMessage, res, statusCode = 500) {
    // Log the error for debugging
    console.error(errorMessage);

    if (!res.headersSent) {
        res.status(500).json({ success: false, errorMessage });
    }

    // Customize error response based on status code
    let errorResponse = {
        success: false,
        message: errorMessage,
        code: 'UNKNOWN_ERROR', // Default error code for unspecified errors
    };

    if (statusCode === 404) {
        errorResponse.code = 'NOT_FOUND';
    } else if (statusCode === 400) {
        errorResponse.code = 'BAD_REQUEST';
    } else if (statusCode === 500) {
        errorResponse.code = 'INTERNAL_SERVER_ERROR';
    }

    // Log the response object for debugging purposes
    console.log(errorResponse);

    // Send the error response
    res.status(statusCode).json(errorResponse);
}