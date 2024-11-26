import express from "express";
import * as testimonialController from "../controllers/testimonial-controller.js";

const router = express.Router();

router.post("/", testimonialController.createTestimonial);
router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getTestimonialById);
router.put("/:id", testimonialController.updateTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);

export default router;
