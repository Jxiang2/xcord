import express from "express";
import expressValidation from "express-joi-validation"
import Joi from "joi";
import authControllers from "../controllers/auth.controllers";
import verifyToken from "../middlewares/auth.middlewares";

import type { Router, RequestHandler, Request, Response } from "express";

const validator = expressValidation.createValidator({});
const router: Router = express.Router();

/**
 * register require username, password and email
 */
const registerSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail:Joi.string().email().required(),
})

/**
 * login require mail and password
 */
const loginSchema: Joi.ObjectSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail:Joi.string().email().required(),
})

router.post("/register", validator.body(registerSchema), authControllers.postRegister);
router.post("/login", validator.body(loginSchema), authControllers.postLogin);

// test auth middleware
router.get("/test", verifyToken as RequestHandler, (req: Request, res: Response)=>{
  res.send("request passed");
})

export default router;
