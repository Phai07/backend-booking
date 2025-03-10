import express from 'express';
import { registerUserController, loginController  } from '../controllers/userController.js';

const  userRouter = express.Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login', loginController);

export default userRouter;