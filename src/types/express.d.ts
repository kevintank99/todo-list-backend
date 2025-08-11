export type JwtPayload = {
  userId: string;
}

export interface ResponsePayload {
  statusCode: number;
  success: boolean;
  message?: string | undefined;
  data?: any;
}