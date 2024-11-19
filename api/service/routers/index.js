import extraSettingsRouter from './extra-settings-router.js';
import thankYouPageRouter from './thank-you-page.router.js';
import testimonialRoutes from "./testimonial-router.js"; // Your feature's router
import userAuthRouter from './user-authentication-router.js'

const intializeRoutes = (app) => {
    app.use('/spaces', extraSettingsRouter);
    app.use('/spaces', thankYouPageRouter);
    app.use("/api/testimonials", testimonialRoutes); // Testimonial routes
    app.use("/api/auth", userAuthRouter); // User authentication routes

};
export default intializeRoutes;