import { UserModel } from '../models';
import ExtraSettings from '../models/extra-settings';
import SpaceModel, { Space } from '../models/spaces';
import Testimonial, { TestimonialType } from '../models/testimonial-models'
import { generateRandomPfp } from '../utils/generate-random-pfp';

// Create a new testimonial
export const createTestimonial = async (data: TestimonialType): Promise<TestimonialType> => {
  try {
    const space: Space = await SpaceModel.findOne({ spaceName: data.spaceName });
    const user = await UserModel.findById(space.userId);
    const extraSettings = await ExtraSettings.findById(space.extraSettings).select('autoPopulateTestimonials');
    if (!space) {
      throw new Error('Space not found');
    }
    if (!data.profilePic) {
      data.profilePic = await generateRandomPfp(data.name);
    }
    if (extraSettings.autoPopulateTestimonials && data.consent) {
      data.set('liked', true);
    }
    if (data.testimonialType === 'video') {
      await UserModel.findByIdAndUpdate(
				user._id,
				{ ...user, videoCredits: user.textCredits - 1 ? user.textCredits - 1 : 0 },
				{ new: true },
			)
    } else {
      await UserModel.findByIdAndUpdate(
				user._id,
				{ ...user, textCredits: user.textCredits - 1 ? user.textCredits - 1 : 0 },
				{ new: true },
			)
    }
    const testimonial = new Testimonial({ ...data });
    return await testimonial.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all testimonials
export const getAllTestimonials = async (spaceName: string): Promise<TestimonialType[]> => {
  try {
    const space = await SpaceModel.findOne({ spaceName });
    const testimonials = await Testimonial.find({ spaceName });
    return testimonials;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a single testimonial by ID
export const getTestimonialById = async (id: string): Promise<TestimonialType | null> => {
  return await Testimonial.findById(id);
};

// Update a testimonial by ID
export const updateTestimonial = async (
  id: string,
  data: TestimonialType
): Promise<TestimonialType | null> => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    return testimonial;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (id: string): Promise<TestimonialType | null> => {
  return await Testimonial.findByIdAndDelete(id);
};
