import express from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (
    req: express.Request,
    res: express.Response
  ) => {
    const query = await livros.find().populate('autor');
    res.status(200).json(query);
  };

  static listarLivroPorId = (req: express.Request, res: express.Response) => {
    const idLivro = req.params.id;
    livros
      .findById(idLivro)
      .populate('autor', 'nome')
      .exec()
      .then((livro) => {
        res.status(200).send(livro);
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: `${err.message} - livro não localizado` });
      });
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

  static atualizarLivro = (req: express.Request, res: express.Response) => {
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

  static excluirLivro = (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    livros
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ message: 'Livro excluído com sucesso!' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

  static listarLivroPorEditora = (
    req: express.Request,
    res: express.Response
  ) => {
    const editora = req.query.editora;
    livros
      .find({ editora: editora })
      .then((response) => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
}

export default LivroController;
