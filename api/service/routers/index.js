import extraSettingsRouter from './extra-settings-router.js';
import thankYouPageRouter from './thank-you-page.router.js';
import testimonialRoutes from "./testimonial-router.js"; // Your feature's router
import spacesRouter from './spaces.js';
import userAuthRouter from './user-authentication-router.js';
import userManagementRouter from './user-management.router.js';

const intializeRoutes = (app) => {

    app.get("/", (req, res) => {
        res.send("Welcome to the Testimonials API!");
    });

    app.use('/v1/spaces', extraSettingsRouter, thankYouPageRouter, spacesRouter);
    app.use("/v1/testimonials", testimonialRoutes); // Testimonial routes
    app.use('/v1/auth', userAuthRouter); //user-authentication router
    app.use('/v1/users', userManagementRouter); //user-management router
    
     // Catch-all middleware for undefined routes
     app.use((req, res) => {
        res.status(404).send("Not Found");
    });

};
export default intializeRoutes;