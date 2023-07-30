import { NextFunction, Request, Response } from 'express';
import NaoEncontrado from '../erros/Naoencontrado';

function manipulador404(req: Request, res: Response, next: NextFunction) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}

export default manipulador404;
