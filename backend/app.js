import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/env.js";
import authRouter from "./modules/auth/auth.routes.js";
import routes from "./routes/index.js"
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

export default app;