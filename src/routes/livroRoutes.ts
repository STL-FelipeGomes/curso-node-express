import * as express from 'express';
import LivroController from '../controller/livrosController';

const router = express.Router();

router.get('/livros', LivroController.listarLivros);

export default router;
