import { Request, Response } from 'express';
import livros from '../models/Livro';

class LivroController {
  static listarLivros = async (req: Request, res: Response) => {
    try {
      const query = await livros.find().populate('autor');
      res.status(200).json(query);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao buscar livros` });
    }
  };
  static listarLivroPorId = async (req: Request, res: Response) => {
    const idLivro = req.params.id;
    try {
      const livro = await livros
        .findById(idLivro)
        .populate('autor', 'nome')
        .exec();
      res.status(200).send(livro);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - livro não localizado` });
    }
  };
  static cadastrarLivro = async (req: Request, res: Response) => {
    const livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar um livro.` });
    }
  };
  static atualizarLivro = async (req: Request, res: Response) => {
    const idLivro: string = req.params.id;
    try {
      await livros.findByIdAndUpdate(idLivro, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso!' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  static excluirLivro = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro excluído com sucesso!' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  static listarLivroPorEditora = async (req: Request, res: Response) => {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livros.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao buscar os livros` });
    }
  };
}

export default LivroController;
