import { Router } from 'express';
import LivroController from '../controller/livrosController';
import paginar from '../middlewares/paginar';

const router = Router();

router
  .get('/livros', LivroController.listarLivros, paginar)
  .get('/livros/busca', LivroController.listarLivroPorFiltro, paginar)
  .get('/livros/:id', LivroController.listarLivroPorId)
  .post('/livros', LivroController.cadastrarLivro)
  .put('/livros/:id', LivroController.atualizarLivro)
  .delete('/livros/:id', LivroController.excluirLivro);

export default router;
