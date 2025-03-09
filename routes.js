import { Router } from 'express';
import homeController from './src/contollers/homeController.js';
import authController from './src/contollers/authController.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);

export default routes;