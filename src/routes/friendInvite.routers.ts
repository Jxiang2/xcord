import type {RequestHandler, Router} from "express";
import express from "express";
import expressValidation from "express-joi-validation";
import Joi from "joi";
import {verifyToken} from "../middlewares/auth.middlewares";
import friendInviteControllers from "../controllers/friendInvite.controllers";
import decisionControllers from "../controllers/decision.controllers";

const validator = expressValidation.createValidator({});
const router: Router = express.Router();

/**
 * send friend invite require an email
 */
const friendInviteSchema: Joi.ObjectSchema = Joi.object({
  targetMail: Joi.string().email().required(),
});

/**
 * accept/ reject friend invite require the user's id
 */
const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
})

router.post(
  "/invite", verifyToken as RequestHandler,
  validator.body(friendInviteSchema), friendInviteControllers.postInvite
);

router.post(
  "/accept", verifyToken as RequestHandler,
  validator.body(inviteDecisionSchema), decisionControllers.postAccept
);

router.post(
  "/reject", verifyToken as RequestHandler,
  validator.body(inviteDecisionSchema), decisionControllers.postReject
);

export default router;