import { Request, Response } from 'express';
import { userServices } from '../services';
import { sendResponse } from '../utils/responseHandler.js';
import { userSchema } from '../validations/user.validation.js';

 const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: error.details?.[0]?.message,
      });
    }

    const { email } = value;

    const isEmailExists = await userServices.checkEmailExists(email);
    
    if (isEmailExists) {
      return sendResponse(res, {
        success: false,
        statusCode: 409,
        message: 'Email already registered',
      });
    }

    const isUserSaved = await userServices.createUser(value);

    if (!isUserSaved) {
      return sendResponse(res, {
        success: false,
        statusCode: 500,
        message: 'Failed to create user',
      });
    }
    
    return sendResponse(res, {
        success: true,
      statusCode: 201,
      data: {
        email,
      },
      message: 'User registered successfully',
    });
  } catch (err: unknown) {
    console.error('Error while creating user:', err);
    let message = 'Internal server error';
    if (err instanceof Error) {
      message = err.message;
    }
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: error.details?.[0]?.message
      });
    }

    const { email, password } = value;
    const user = await userServices.checkEmailExists(email);

    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'User not found'
      });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    const token = userServices.generateToken(user);
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      data: { token },
      message: 'User authenticated successfully',
    });
   
  } catch (err: unknown) {
    console.error('Error while logging in user:', err);
    let message = 'Internal server error';
    if (err instanceof Error) {
      message = err.message;
    }
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message,
    });
  }
};


export const userController = {
  signup,
  login
}