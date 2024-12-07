import { Request, Response } from "express";
import { TestimonialType } from "../models/testimonial-models";
import { setError, setSuccess } from "../response-handler";
import * as testimonialService from "../services/testimonial-service";

// Create a new testimonial
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spaceName } = req.params;
    const data = { ...req.body, spaceName: spaceName };
    const testimonial: TestimonialType = await testimonialService.createTestimonial(data);
    res.status(201).json(testimonial)
  } catch (error: any) {
    setError(error, res);
  }
};

// Get all testimonials
export const getAllTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { spaceName } = _req.params;
    const testimonials: TestimonialType[] = await testimonialService.getAllTestimonials(spaceName);
    res.status(200).json(testimonials);
  } catch (error: any) {
    setError(error, res);
  }
};

// Get a testimonial by ID
export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial: TestimonialType = await testimonialService.getTestimonialById(id);
    setSuccess(testimonial, res, "Testimonial fetched successfully");
  } catch (error: any) {
    setError(error, res);
  }
};

// Update a testimonial by ID
export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedTestomonial: TestimonialType = await testimonialService.updateTestimonial(id, body);
    res.status(200).json(updatedTestomonial);
  } catch (error: any) {
    setError(error, res);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTestimonial: TestimonialType = await testimonialService.deleteTestimonial(id);
    setSuccess(deletedTestimonial, res, "Testimonial deleted successfully");
  } catch (error: any) {
    setError(error, res);
  }
};
