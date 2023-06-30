import { Request, Response } from 'express';
import autores from '../models/Autor';

class AutorController {
  static listarAutor = async (req: Request, res: Response) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  };
  static listarAutorPorId = async (req: Request, res: Response) => {
    const idAutor = req.params.id;
    try {
      const autor = await autores.findById(idAutor).exec();
      res.status(200).send(autor);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - autor não localizado` });
    }
  };
  static cadastrarAutor = async (req: Request, res: Response) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar um autor.` });
    }
  };
  static atualizarAutor = async (req: Request, res: Response) => {
    const idAutor: string = req.params.id;
    try {
      await autores.findByIdAndUpdate(idAutor, { $set: req.body });
      res.status(200).send({ message: 'autor atualizado com sucesso!' });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao atualizar o autor` });
    }
  };
  static excluirAutor = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: 'autor excluído com sucesso!' });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao excluir o autor` });
    }
  };
}

export default AutorController;
