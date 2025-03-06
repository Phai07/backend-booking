import express from 'express';
import { bookingsController, createBookingController } from '../controllers/bookingController.js';
import  authMiddleware  from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.get('/get', authMiddleware, bookingsController);
bookingRouter.post('/add', authMiddleware, createBookingController);

export default bookingRouter;