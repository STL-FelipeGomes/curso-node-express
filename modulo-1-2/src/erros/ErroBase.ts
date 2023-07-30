import { Response } from 'express';

class ErroBase extends Error {
  status: number;
  constructor(messagem = 'Erro interno do servidor', status = 500) {
    super();
    this.message = messagem;
    this.status = status;
  }

  enviarResposta(res: Response) {
    return res
      .status(this.status)
      .send({ mensagem: this.message, status: this.status });
  }
}

export default ErroBase;
