import Testimonial from "../models/testimonial-models.js";

// Create a new testimonial
export const createTestimonial = async (data) => {
  const testimonial = new Testimonial(data);
  return await testimonial.save();
};

// Get all testimonials
export const getAllTestimonials = async () => {
  return await Testimonial.find({});
};

// Get a single testimonial by ID
export const getTestimonialById = async (id) => {
  return await Testimonial.findById(id);
};

// Update a testimonial by ID
export const updateTestimonial = async (id, data) => {
  return await Testimonial.findByIdAndUpdate(id, data, { new: true });
};

// Delete a testimonial by ID
export const deleteTestimonial = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};
