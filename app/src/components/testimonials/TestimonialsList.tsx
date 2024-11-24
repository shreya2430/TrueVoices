import React, { useEffect, useState } from "react";

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        // Ensure this URL matches your backend API endpoint
        fetch('http://localhost:3003/api/testimonials') 
            .then((res) => res.json())
            .then((data) => setTestimonials(data));
    }, []);

    return (
        <div>
            <h1>Testimonials</h1>
            {testimonials.length > 0 ? (
                testimonials.map((testimonial) => (
                    <div key={testimonial.id}>
                        <h2>{testimonial.name}</h2>
                        <p>{testimonial.content}</p>
                    </div>
                ))
            ) : (
                <p>No testimonials available.</p>
            )}
        </div>
    );
};

export default TestimonialsList;
