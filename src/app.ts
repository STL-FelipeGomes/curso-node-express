import express from 'express';
import db from './config/dbConnect';
import routes from './routes/routes';
import manipuladorErrors from './middlewares/manipuladorErrors';

db.on('error', console.log.bind(console, 'Error de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

const app = express();
app.use(express.json());

routes(app);

app.use(manipuladorErrors);

export default app;
