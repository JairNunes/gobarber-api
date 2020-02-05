import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import AppointmentController from './app/controllers/appointmentController';
import authMiddleware from './app/middlewares/auth';
import providerController from './app/controllers/providerController';
import scheduleController from './app/controllers/scheduleController';
import notificationController from './app/controllers/notificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.delete('/appointments/:id', AppointmentController.delete);

routes.put('/users', UserController.update);

routes.get('/providers', providerController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/schedules', scheduleController.index);

routes.get('/notifications', notificationController.index);
routes.put('/notifications/:id', notificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
