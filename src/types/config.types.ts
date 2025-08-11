export interface Config {
    MONGO_URI: string;
    JWT_SECRET: string;
    PORT: number;
    VERSION: string;
    JWT_EXPIRATION: string | number;
  }
  