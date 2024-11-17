import extraSettingsRouter from './extra-settings-router.js';
import thankYouPageRouter from './thank-you-page.router.js';

const intializeRoutes = (app) => {
    app.use('/spaces', extraSettingsRouter);
    app.use('/spaces', thankYouPageRouter);
};
export default intializeRoutes;