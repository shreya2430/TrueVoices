import Testimonial, { ITestimonial } from '../models/testimonial-models'
import { generateRandomPfp } from '../utils/generate-random-pfp';

// Create a new testimonial
export const createTestimonial = async (data: ITestimonial): Promise<ITestimonial> => {
  try {
    if (!data.profilePic) {
      data.profilePic = await generateRandomPfp(data.name);
    }
    const testimonial = new Testimonial(data);
    return await testimonial.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all testimonials
export const getAllTestimonials = async (spaceName: string): Promise<ITestimonial[]> => {
  try {
    const testimonials = await Testimonial.find({ spaceName });
    return testimonials;
  } catch (error) {
    throw new Error(error.message);
  }
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
