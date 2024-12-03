import React, { useState, useEffect } from "react";

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]); // Store testimonials
    const [editingId, setEditingId] = useState<string | null>(null); // ID of the testimonial being edited
    const [updatedContent, setUpdatedContent] = useState<string>(""); // Updated testimonial content
    const [errorMessage, setErrorMessage] = useState<string>(""); // Error messages

    // Fetch testimonials from the backend
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("http://localhost:3003/api/testimonials");
                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                const data = await response.json();
                setTestimonials(data);
            } catch (error: any) {
                setErrorMessage(error.message);
            }
        };

        fetchTestimonials();
    }, []);

    // Update a testimonial
    const handleUpdate = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3003/api/testimonials/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: updatedContent }),
            });

            if (!response.ok) {
                throw new Error("Failed to update testimonial");
            }

            const updatedTestimonial = await response.json();
            setTestimonials((prev) =>
                prev.map((testimonial) =>
                    testimonial._id === id ? updatedTestimonial : testimonial
                )
            );
            setEditingId(null); // Exit editing mode
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    // Delete a testimonial
    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3003/api/testimonials/${id}`, {
                method: "DELETE",
            });

            // Remove the deleted testimonial from the state
            setTestimonials((prev) => prev.filter((testimonial) => testimonial._id !== id));
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Testimonials</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="testimonial">
                    {editingId === testimonial._id ? (
                        <div>
                            <textarea
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <button
                                onClick={() => handleUpdate(testimonial._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-bold">{testimonial.name}</h3>
                            <p>{testimonial.content}</p>
                            <button
                                onClick={() => {
                                    setEditingId(testimonial._id);
                                    setUpdatedContent(testimonial.content);
                                }}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(testimonial._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TestimonialsList;
