import {Request, Response} from "express";

const postAccept = (req: Request, res: Response) => {
  return res.send("hello accept")
}

const postReject = (req: Request, res: Response) => {
  return res.send("hello reject")
}

const decisionControllers = {
  postAccept,
  postReject
}

export default decisionControllers;