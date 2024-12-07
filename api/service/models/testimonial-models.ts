import mongoose, { Schema, Document, Model } from "mongoose";


// Define the schema for the testimonial model
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: false,
      validate: {
        validator: function (email: string): boolean {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        message: "Email must be a valid email address",
      },
    },
    liked: {
      type: Boolean,
      required: false,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    companyAndTitle: {
      type: String,
      required: [false, "Company and Title are required"],
      maxlength: [100, "Company and Title cannot exceed 100 characters"],
    },
    socialLinks: {
      type: [String],
      // validate: {
      //   validator: function (links: string[]): boolean {
      //     return links.every((link) =>
      //       /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(link)
      //     );
      //   },
      //   message: "One or more social links are not valid URLs",
      // },
      default: [],
    },
    address: {
      type: String,
      required: false,
    },
    testimonialType: {
      type: String,
      required: [true, "Testimonial type is required"],
    },
    content: {
      type: String,
      required: [true, "Testimonial content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
      maxlength: [500, "Content cannot exceed 500 characters"],
    },
    consent: {
      type: Boolean,
      required: [true, "Consent is required"],
    },
    profilePic: {
      type: String,
      required: [true, "Profile picture URL is required"],
      // validate: {
      //   validator: function (url: string): boolean {
      //     return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
      //       url
      //     );
      //   },
      //   message: "Profile picture must be a valid URL",
      // },
    },
    spaceName: {
      type: String,
      required: [true, "Space name is required"],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Testimonial model
const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);

export type TestimonialType = mongoose.InferSchemaType<typeof testimonialSchema> & Document;

export default Testimonial;
