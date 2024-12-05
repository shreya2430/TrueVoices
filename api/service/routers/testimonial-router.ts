import express, { Router } from "express";
import * as testimonialController from "../controllers/testimonial-controller";

const router: Router = express.Router();

// Define routes for testimonials
router.post("/:spaceName", testimonialController.createTestimonial);
router.get("/:spaceName", testimonialController.getAllTestimonials);
router.get("/:spaceName/:id", testimonialController.getTestimonialById);
router.put("/:spaceName/:id", testimonialController.updateTestimonial);
router.delete("/:spaceName/:id", testimonialController.deleteTestimonial);

export default router;
