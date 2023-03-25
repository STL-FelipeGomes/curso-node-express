import * as express from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (
    req: express.Request,
    res: express.Response
  ) => {
    const query = await livros.find();
    res.status(200).json(query);
  };
}

export default LivroController;
