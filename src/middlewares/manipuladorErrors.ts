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
  } else if (error instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(error.errors)
      .map((err) => err.message)
      .join('; ');
    return res.status(400).send({
      message: `Os seguintes erros foram encontrados: ${mensagensErro}`,
    });
  }
  res.status(500).send({ message: 'Error interno do servidor' });
}

export default manipuladorErrors;
