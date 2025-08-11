import { Router } from 'express';
import { userController } from '../contollers'; 

const userRouter = Router({ mergeParams: true });

userRouter.post('/signup', userController.signup);

userRouter.post('/login', userController.login);

export default userRouter;
