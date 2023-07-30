import RequisicaoIncorreta from './RequisicaoIncorreta';

class ErrorValidacao extends RequisicaoIncorreta {
  constructor(error: any) {
    const mensagensErro = Object.values(error.errors)
      .map((err: any) => err.message)
      .join('; ');

    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErrorValidacao;
