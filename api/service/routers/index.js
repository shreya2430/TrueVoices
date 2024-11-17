import extraSettingsRouter from './extra-settings-router.js';

const intializeRoutes = (app) => {
    app.use('/spaces', extraSettingsRouter); 
};
export default intializeRoutes;