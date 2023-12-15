import { Router } from "express";
import * as controllers from "./authControllers";
export const authRouter = Router();

//REGISTER
authRouter.post("/register", controllers.registerUserController);

//LOGIN
authRouter.post("/login", controllers.loginController);

//REFRESH
authRouter.post("/refresh", controllers.refreshTokenController);
