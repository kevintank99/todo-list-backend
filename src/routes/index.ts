import { Router } from 'express';
import userRouter from './user.routes';

const router = Router();

// Public routes
router.use('/user', userRouter);


export default router;
