import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import {  IUser, IUserModel } from '../types/user.types';
import User from '../models/user.model';
import config from '../config';

export const userServices = {

  /**
   * Check if user exists by email
   */
  async checkEmailExists(email: string): Promise<IUserModel | null> {
    return User.findOne({ email });
  },

  /**
   * Create a new user
   */
  async createUser(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    return user.save();
  },

  /**
   * Validate user password
   */
  async validatePassword(user: IUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  },

  /**
   * Generate JWT token
   */
  generateToken(user: IUserModel): string {
    return jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRATION } as SignOptions
    );
  },
};
