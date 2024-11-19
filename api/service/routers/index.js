import extraSettingsRouter from './extra-settings-router.js';
import thankYouPageRouter from './thank-you-page.router.js';
import testimonialRoutes from "./testimonial-router.js"; // Your feature's router
import spacesRouter from './spaces.js';
import userAuthRouter from './user-authentication-router.js'

const intializeRoutes = (app) => {
    app.use('/v1/spaces', extraSettingsRouter, thankYouPageRouter, spacesRouter);
    app.use("/v1/testimonials", testimonialRoutes); // Testimonial routes
    app.use('/v1/auth', userAuthRouter); //user-authentication router
};
export default intializeRoutes;