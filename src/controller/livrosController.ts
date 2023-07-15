import { Request, Response, NextFunction } from 'express';
import { livros } from '../models/index';
import NaoEncontrado from '../erros/Naoencontrado';

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
      if (!livro) {
        return next(new NaoEncontrado('Id do livro não encontrado'));
      }
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
      const livroUpdated = await livros.findByIdAndUpdate(idLivro, {
        $set: req.body,
      });
      if (!livroUpdated) {
        return next(new NaoEncontrado('Id do livro não encontrado'));
      }
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
      const deleteLivro = await livros.findByIdAndDelete(id);
      if (!deleteLivro) {
        return next(new NaoEncontrado('Id do livro não encontrado'));
      }
      res.status(200).send({ message: 'Livro excluído com sucesso!' });
    } catch (error) {
      next(error);
    }
  };
  static listarLivroPorFiltro = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { editora, titulo, minPaginas, maxPaginas } = req.query as {
      editora: string;
      titulo: string;
      minPaginas: string;
      maxPaginas: string;
    };
    try {
      const busca = {} as {
        editora: { $regex: string; $options: string };
        titulo: { $regex: string; $options: string };
        numeroPaginas: { $lte?: number; $gte?: number };
      };
      if (editora) busca.editora = { $regex: titulo, $options: 'i' };
      if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };
      if (minPaginas) busca.numeroPaginas = { $gte: Number(minPaginas) };
      if (maxPaginas) busca.numeroPaginas = { $lte: Number(maxPaginas) };
      if (minPaginas && maxPaginas) {
        busca.numeroPaginas = {
          $gte: Number(minPaginas),
          $lte: Number(maxPaginas),
        };
      }
      const livrosPorEditora = await livros.find(busca);
      if (!livrosPorEditora) {
        return next(new NaoEncontrado('Livro pela editora não encontrado'));
      }
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
