import dotenv from "dotenv";
import { Config } from "../types/config.types.js";

dotenv.config();

const config: Config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/todo-app",
  JWT_SECRET: process.env.JWT_SECRET || "1hTjeIlv3osie1snEltulYe4W0BRoQJN",
  PORT: parseInt(process.env.PORT || "3000", 10),
  VERSION: process.env.VERSION || "v1",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "7d",
};

export default config;
