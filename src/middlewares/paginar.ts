import { NextFunction, Request, Response } from 'express';
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta';

async function paginar(req: Request, res: Response, next: NextFunction) {
  try {
    let {
      limite = 5,
      pagina = 1,
      ordenacao = '_id:-1',
    } = req.query as {
      limite: string | number | undefined;
      pagina: string | number | undefined;
      ordenacao: string | undefined;
    };

    let [campoOrdenacao, ordem] = ordenacao.split(':') as [
      campoOrdenacao: string | undefined,
      ordem: string | number | undefined
    ];

    limite = Number(limite);
    pagina = Number(pagina);
    ordem = Number(ordem);

    campoOrdenacao = String(campoOrdenacao);

    console.log('>>>>>>>>>>>', res.locals);
    const resultado = res.locals.resultado;

    if (limite < 0 && pagina < 0) {
      return next(new RequisicaoIncorreta());
    }

    const query = await resultado
      .find()
      .sort({ [campoOrdenacao]: ordem })
      .skip((Number(pagina) - 1) * Number(limite))
      .limit(Number(limite));
    res.status(200).json(query);
  } catch (error) {
    next(error);
  }
}

export default paginar;
