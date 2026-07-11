import { Router } from "express";

import authRouter from "../modules/auth/auth.routes.js";
// import postRouter from "../modules/post/post.routes.js";
// import userRouter from "../modules/user/user.routes.js";

const router = Router();

router.use("/auth", authRouter);

export default router;
