import express, { Express, Response } from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (
    req: express.Request,
    res: express.Response
  ) => {
    const query = await livros.find();
    res.status(200).json(query);
  };

  static cadastrarLivro = async (
    req: express.Request,
    res: express.Response
  ) => {
    let livro = new livros(req.body);
    console.log('\x1b[34m olha o livro \x1b[0m', livro);
    livro
      .save()
      .then((response) => {
        console.log('\x1b[32m deu bom \x1b[0m', response);
        res.status(201).send(livro.toJSON());
      })
      .catch((err) => {
        console.log('\x1b[31m dedu ruim \x1b[0m', err);
        res
          .status(500)
          .send({ message: `${err.message} - fala ao cadastrar um livro.` });
      });
  };
}

export default LivroController;
