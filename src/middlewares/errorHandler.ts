import { ValidationError } from "yup";
import { formatYupErrors } from "../helpers/lib";
import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/NotFoundError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    res.sendStatus(404);
  }

  if (err instanceof ValidationError) {
    res.status(422).json({ errors: formatYupErrors(err) });
  }
  next();
};
