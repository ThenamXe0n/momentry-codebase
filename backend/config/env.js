import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME || "momentry",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtkeyforauth12345",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};