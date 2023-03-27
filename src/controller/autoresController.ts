import express from 'express';
import autores from '../models/Autor';

class AutorController {
  static listarAutor = async (
    req: express.Request,
    res: express.Response
  ) => {
    const query = await autores.find();
    res.status(200).json(query);
  };

  static listarAutorPorId = (req: express.Request, res: express.Response) => {
    const idAutor = req.params.id;
    autores
      .findById(idAutor)
      .exec()
      .then((autor) => {
        res.status(200).send(autor);
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: `${err.message} - autor não localizado` });
      });
  };

  static cadastrarAutor = (req: express.Request, res: express.Response) => {
    const autor = new autores(req.body);
    autor
      .save()
      .then(() => {
        res.status(201).send(autor.toJSON());
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar um autor.` });
      });
  };

  static atualizarAutor = (req: express.Request, res: express.Response) => {
    const idAutor: string = req.params.id;
    autores
      .findByIdAndUpdate(idAutor, { $set: req.body })
      .then(() => {
        res.status(200).send({ message: 'autor atualizado com sucesso!' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

  static excluirAutor = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    autores
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ message: 'autor excluído com sucesso!' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
}

export default AutorController;
