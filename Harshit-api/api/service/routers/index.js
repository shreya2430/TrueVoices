import extraSettingsRouter from './extra-settings-router.js';
import thankYouPageRouter from './thank-you-page.router.js';
import testimonialRoutes from "./testimonial-router.js"; // my feature's router

const intializeRoutes = (app) => {
    app.use('/spaces', extraSettingsRouter);
    app.use('/spaces', thankYouPageRouter);
    app.use("/api/testimonials", testimonialRoutes); // Testimonial routes
};
export default intializeRoutes;