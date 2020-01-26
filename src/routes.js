import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import AppointmentController from './app/controllers/appointmentController';
import authMiddleware from './app/middlewares/auth';
import providerController from './app/controllers/providerController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/sessions', sessionController.store);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.put('/users', UserController.update);

routes.get('/providers', providerController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
