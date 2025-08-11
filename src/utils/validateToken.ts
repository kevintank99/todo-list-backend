import jwt from 'jsonwebtoken';
import Config from '../config';
import { JwtPayload } from '../types/express';


export function validateToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, Config.JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
