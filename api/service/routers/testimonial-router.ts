import express, { Router } from "express";
import * as testimonialController from "../controllers/testimonial-controller";

const router: Router = express.Router();

// Define routes for testimonials
router.post("/", testimonialController.createTestimonial);
router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getTestimonialById);
router.put("/:id", testimonialController.updateTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);

export default router;
