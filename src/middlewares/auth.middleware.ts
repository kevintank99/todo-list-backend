import { Response, NextFunction } from 'express';
import { validateToken } from '../utils/validateToken';
import { AuthRequest } from '../types/express';
import { sendResponse } from '../utils/responseHandler';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'No token provided',
    });
  }

  const decoded = validateToken(token);
  if (!decoded) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Invalid token',
    });
  }

  req.userId = decoded.userId;
  next();
};
