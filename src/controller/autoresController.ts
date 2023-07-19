import { Request, Response, NextFunction } from 'express';
import { autores } from '../models/index';
import NaoEncontrado from '../erros/Naoencontrado';

class AutorController {
  static listarAutor = async (req: Request, res: Response) => {
    try {
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  };
  static listarAutorPorId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const idAutor = req.params.id;
    try {
      const autor = await autores.findById(idAutor).exec();
      if (!autor) {
        return next(new NaoEncontrado('Id do autor não encontrado'));
      }
      res.status(200).send(autor);
    } catch (error) {
      next(error);
    }
  };
  static cadastrarAutor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      next(error);
    }
  };
  static atualizarAutor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const idAutor: string = req.params.id;
    try {
      const updatedAutor = await autores.findByIdAndUpdate(idAutor, {
        $set: req.body,
      });
      if (!updatedAutor) {
        return next(new NaoEncontrado('Id do autor não encontrado'));
      }
      res.status(200).send({ message: 'autor atualizado com sucesso!' });
    } catch (error) {
      next(error);
    }
  };
  static excluirAutor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const deleteAutor = await autores.findByIdAndDelete(id);
      if (!deleteAutor) {
        return next(new NaoEncontrado('Id do autor não encontrado'));
      }
      res.status(200).send({ message: 'autor excluído com sucesso!' });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;
