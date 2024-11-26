import React, { useState } from "react";
import { TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

const TestimonialsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        companyAndTitle: "",
        content: "",
        profilePic: "",
        testimonialType: "",
        address: "",
       
    });

    const [loading, setLoading] = useState(false); // Loading state
    const [message, setMessage] = useState(""); // Success/Error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setMessage(""); // Clear any previous messages
        setLoading(true); // Set loading state


    try {
        const response = await fetch("http://localhost:3003/api/testimonials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to create testimonial");
        }

        const data = await response.json();
        setMessage("Testimonial created successfully!"); // Success message
        console.log("Created Testimonial:", data);

        // Clear form fields after successful submission
        setFormData({
            name: "",
            companyAndTitle: "",
            content: "",
            profilePic: "",
            testimonialType: "",
            address: "",
            email: "", // Clear email field
        });
    } catch (error) {
        console.error("Error submitting testimonial:", error);
        setMessage("Failed to create testimonial."); // Error message
    } finally {
        setLoading(false); // Reset loading state
    }
};



        return (
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    margin: "50px auto",
                    padding: "20px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Create a Testimonial
                </Typography>
    
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Company and Title"
                    name="companyAndTitle"
                    value={formData.companyAndTitle}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Testimonial Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    margin="normal"
                />

                <TextField
                    label="Profile Picture URL"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                />

               <TextField
                   label="Testimonial Type"
                   name="testimonialType"
                   value={formData.testimonialType}
                   onChange={handleChange}
                   variant="outlined"
                   fullWidth
                   required
                   margin="normal"
                />


                <TextField
                   label="Address"
                   name="address"
                   value={formData.address}
                   onChange={handleChange}
                   variant="outlined"
                   fullWidth
                   required
                   margin="normal"
                />

              
    
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    style={{ marginTop: "20px" }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
    
                {/* Display success or error message */}
                {message && (
                    <Alert
                        severity={message.includes("Failed") ? "error" : "success"}
                        style={{ marginTop: "20px" }}
                    >
                        {message}
                    </Alert>
                )}
            </form>
        );
    };
    
    export default TestimonialsForm;