import express from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (
    req: express.Request,
    res: express.Response
  ) => {
    const query = await livros.find();
    res.status(200).json(query);
  };

  static cadastrarLivro = (req: express.Request, res: express.Response) => {
    const livro = new livros(req.body);
    livro
      .save()
      .then(() => {
        res.status(201).send(livro.toJSON());
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar um livro.` });
      });
  };

  static atualizarLivro = async (
    req: express.Request,
    res: express.Response
  ) => {
    const idLivro: string = req.params.id;
    livros
      .findByIdAndUpdate(idLivro, { $set: req.body })
      .then(() => {
        res.status(200).send({ message: 'Livro atualizado com sucesso!' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
}

export default LivroController;
