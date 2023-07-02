import { Router } from 'express';
import AutorController from '../controller/autoresController';

const router = Router();

router
  .get('/autor', AutorController.listarAutor)
  .get('/autor/:id', AutorController.listarAutorPorId)
  .post('/autor', AutorController.cadastrarAutor)
  .put('/autor/:id', AutorController.atualizarAutor)
  .delete('/autor/:id', AutorController.excluirAutor);

export default router;
