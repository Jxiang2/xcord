import type {RequestHandler, Router} from "express";
import express from "express";
import expressValidation from "express-joi-validation";
import Joi from "joi";
import {verifyToken} from "../middlewares/auth.middlewares";
import friendControllers from "../controllers/friend.controllers";

const validator = expressValidation.createValidator({});
const router: Router = express.Router();

/**
 * send friend invite require an email
 */
const friendInviteSchema: Joi.ObjectSchema = Joi.object({
  targetMail: Joi.string().email().required(),
});

router.post(
  "/invite", verifyToken as RequestHandler,
  validator.body(friendInviteSchema), friendControllers.postInvite
);

export default router;