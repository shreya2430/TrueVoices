import React, { useState, useEffect } from 'react';

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]); // Initialize state
    const [errorMessage, setErrorMessage] = useState(''); // Handle fetch errors

    useEffect(() => {
        // Ensure the backend API endpoint is correct
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/testimonials'); // Adjust to backend port
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                setTestimonials(data); // Populate testimonials state
            } catch (error) {
                setErrorMessage(error.message); // Display error on the frontend
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div>
            <h1>Testimonials</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {testimonials.length > 0 ? (
                testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="testimonial">
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.message}</p>
                    </div>
                ))
            ) : (
                <p>No testimonials available.</p>
            )}
        </div>
    );
};

export default TestimonialsList;