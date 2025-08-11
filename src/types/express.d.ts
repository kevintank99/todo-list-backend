import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export type JwtPayload = {
  userId: string;
}

export interface ResponsePayload {
  statusCode: number;
  success: boolean;
  message?: string | undefined;
  data?: any;
}