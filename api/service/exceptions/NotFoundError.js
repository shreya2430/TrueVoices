class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError'; // Set the name property to 'NotFoundError'
        this.statusCode = 404; // Set a custom status code (optional, for HTTP responses)
    }
}

export default NotFoundError;