import Testimonial, { ITestimonial } from "../models/testimonials-models";

// Create a new testimonial
export const createTestimonial = async (data: Partial<ITestimonial>): Promise<ITestimonial> => {
  const testimonial = new Testimonial(data);
  return await testimonial.save();
};

// Get all testimonials
export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  return await Testimonial.find({});
};

// Get a single testimonial by ID
export const getTestimonialById = async (id: string): Promise<ITestimonial | null> => {
  return await Testimonial.findById(id);
};

// Update a testimonial by ID
export const updateTestimonial = async (
  id: string,
  data: Partial<ITestimonial>
): Promise<ITestimonial | null> => {
  return await Testimonial.findByIdAndUpdate(id, data, { new: true });
};

// Delete a testimonial by ID
export const deleteTestimonial = async (id: string): Promise<ITestimonial | null> => {
  return await Testimonial.findByIdAndDelete(id);
};
