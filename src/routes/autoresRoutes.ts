import { Router } from 'express';
import AutorController from '../controller/autoresController';
import paginar from '../middlewares/paginar';

const router = Router();

router
  .get('/autor', AutorController.listarAutor, paginar)
  .get('/autor/:id', AutorController.listarAutorPorId)
  .post('/autor', AutorController.cadastrarAutor)
  .put('/autor/:id', AutorController.atualizarAutor)
  .delete('/autor/:id', AutorController.excluirAutor);

export default router;
