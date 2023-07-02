import { Request, Response, NextFunction } from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = await livros.find().populate('autor');
      res.status(200).json(query);
    } catch (error) {
      next(error);
    }
  };
  static listarLivroPorId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const idLivro = req.params.id;
    try {
      const livro = await livros
        .findById(idLivro)
        .populate('autor', 'nome')
        .exec();
      res.status(200).send(livro);
    } catch (error) {
      next(error);
    }
  };
  static cadastrarLivro = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      next(error);
    }
  };
  static atualizarLivro = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const idLivro: string = req.params.id;
    try {
      await livros.findByIdAndUpdate(idLivro, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso!' });
    } catch (error) {
      next(error);
    }
  };
  static excluirLivro = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro excluído com sucesso!' });
    } catch (error) {
      next(error);
    }
  };
  static listarLivroPorEditora = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livros.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
