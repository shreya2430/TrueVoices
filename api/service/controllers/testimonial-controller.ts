import * as testimonialService from "../services/testimonial-service";
import { setSuccess, setError } from "../response-handler";
import { Request, Response } from "express";
import { ITestimonial } from "../models/testimonial-models";

// Create a new testimonial
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spaceName } = req.params;
    console.log(req.params);
    const data = { ...req.body, spaceName: spaceName };
    const testimonial: ITestimonial = await testimonialService.createTestimonial(data);
    res.status(201).json(testimonial)
  } catch (error: any) {
    setError(error, res);
  }
};

// Get all testimonials
export const getAllTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { spaceName } = _req.params;
    const testimonials: ITestimonial[] = await testimonialService.getAllTestimonials(spaceName);
    res.status(200).json(testimonials);
  } catch (error: any) {
    setError(error, res);
  }
};

// Get a testimonial by ID
export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial: ITestimonial = await testimonialService.getTestimonialById(id);
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
    const updatedTestomonial: ITestimonial = await testimonialService.updateTestimonial(id, body);
    res.status(200).json(updatedTestomonial);
  } catch (error: any) {
    setError(error, res);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTestimonial: ITestimonial = await testimonialService.deleteTestimonial(id);
    setSuccess(deletedTestimonial, res, "Testimonial deleted successfully");
  } catch (error: any) {
    setError(error, res);
  }
};
