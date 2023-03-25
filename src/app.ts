import express from 'express';
import db from './config/dbConnect';
import routes from './routes/index';

db.on('error', console.log.bind(console, 'Error de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

const app = express();
app.use(express.json());

routes(app);

// app.put('/livros/:id', (req: express.Request, res: express.Response) => {
//   const index = buscaLivro(req.params.id);
//   livros[index].titulo = req.body.titulo;
//   res.json(livros);
// });

// app.delete('/livros/:id', (req: express.Request, res: express.Response) => {
//   const { id } = req.params;
//   const index = buscaLivro(id);
//   livros.splice(index, 1);
//   res.send(`Livro ${id} removido com sucesso`);
// });

// function buscaLivro(id: string) {
//   return livros.findIndex((livro) => livro.id === id);
// }

export default app;
