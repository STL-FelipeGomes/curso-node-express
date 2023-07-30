import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ErroBase from '../erros/ErroBase';
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta';
import ErrorValidacao from '../erros/ErroValidacao';

function manipuladorErrors(error: Error, req: Request, res: Response) {
  if (error instanceof mongoose.Error.CastError) {
    return new RequisicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    return new ErrorValidacao(error).enviarResposta(res);
  } else if (error instanceof ErroBase) {
    return error.enviarResposta(res);
  }
  new ErroBase().enviarResposta(res);
}

export default manipuladorErrors;
