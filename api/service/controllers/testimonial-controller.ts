import * as testimonialService from "../services/testimonial-service";
import { setSuccess, setError } from "../response-handler";
import { Request, Response } from "express";

// Define interfaces for data structures
interface Testimonial {
  _id: string;
  content: string;
  author: string;
  [key: string]: any; // Allow additional properties
}

// Create a new testimonial
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial: Testimonial = await testimonialService.createTestimonial(req.body);
    setSuccess(testimonial, res, "Testimonial created successfully");
  } catch (error: any) {
    setError(error.message, res, 500);
  }
};

// Get all testimonials
export const getAllTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const testimonials: Testimonial[] = await testimonialService.getAllTestimonials();
    setSuccess(testimonials, res, "Testimonials fetched successfully");
  } catch (error: any) {
    setError(error.message, res, 500);
  }
};

// Get a testimonial by ID
export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial: Testimonial | null = await testimonialService.getTestimonialById(req.params.id);
    if (testimonial) {
      setSuccess(testimonial, res, "Testimonial fetched successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error: any) {
    setError(error.message, res, 500);
  }
};

// Update a testimonial by ID
export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTestimonial: Testimonial | null = await testimonialService.updateTestimonial(
      req.params.id,
      req.body
    );
    if (updatedTestimonial) {
      setSuccess(updatedTestimonial, res, "Testimonial updated successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error: any) {
    setError(error.message, res, 500);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTestimonial: Testimonial | null = await testimonialService.deleteTestimonial(req.params.id);
    if (deletedTestimonial) {
      setSuccess(deletedTestimonial, res, "Testimonial deleted successfully");
    } else {
      setError("Testimonial not found", res, 404);
    }
  } catch (error: any) {
    setError(error.message, res, 500);
  }
};

