import { Router } from 'express';
import userRouter from './user.routes';
import todoRouter from './todo.routes';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.use('/user', userRouter);

// Protected routes (require authMiddleware in todo.routes)
router.use('/todo', authMiddleware, todoRouter);

export default router;
