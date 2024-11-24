import React, { useState } from "react";

const TestimonialsForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        companyAndTitle: "",
        content: "",
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: "",
            companyAndTitle: "",
            content: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-gray-100 rounded-md shadow-md space-y-4 max-w-lg mx-auto"
        >
            <h2 className="text-xl font-semibold text-center">Create a Testimonial</h2>
            <div>
                <label htmlFor="name" className="block font-medium">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label htmlFor="companyAndTitle" className="block font-medium">
                    Company and Title
                </label>
                <input
                    type="text"
                    id="companyAndTitle"
                    name="companyAndTitle"
                    value={formData.companyAndTitle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your company and title"
                    required
                />
            </div>
            <div>
                <label htmlFor="content" className="block font-medium">
                    Testimonial Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Write your testimonial"
                    rows={4}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
       
    );
};

export default TestimonialsForm;
