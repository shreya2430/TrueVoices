import * as testimonialService from "../services/testimonial-service.js";
import { setSuccess, setError } from "../response-handler.js";

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body);
    setSuccess(testimonial, res, "Testimonial created successfully");
  } catch (error) {
    setError(error.message, res, 500);
  }
};

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAllTestimonials();
    setSuccess(testimonials, res, "Testimonials fetched successfully");
  } catch (error) {
    setError(error.message, res, 500);
  }
};

// Get a testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    if (testimonial) {
      setSuccess(testimonial, res, "Testimonial fetched successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error) {
    setError(error.message, res, 500);
  }
};

// Update a testimonial by ID
export const updateTestimonial = async (req, res) => {
  try {
    const updatedTestimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
    if (updatedTestimonial) {
      setSuccess(updatedTestimonial, res, "Testimonial updated successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error) {
    setError(error.message, res, 500);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await testimonialService.deleteTestimonial(req.params.id);
    if (deletedTestimonial) {
      setSuccess(deletedTestimonial, res, "Testimonial deleted successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error) {
    setError(error.message, res, 500);
  }
};
