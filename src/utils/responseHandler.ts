import { Response } from 'express';
import { ResponsePayload } from '../types/express';


export const sendResponse = (res: Response, payload: ResponsePayload): Response => {
	const { statusCode, message, data, success } = payload;
	return res.status(statusCode).json({
		success,
		message: message ?? (success ? null : 'Error'),
		data: success ? data ?? null : null,
	});
};