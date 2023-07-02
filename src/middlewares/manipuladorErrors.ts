import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

function manipuladorErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .send({ message: 'Um ou mais dados fornecidos estão incorretos' });
  }
  res
    .status(500)
    .send({ message: `${error.message} - autor não localizado` });
}

export default manipuladorErrors;
