import express, { Express } from 'express';
import livroRoutes from './livroRoutes';
import autorRouter from './autoresRoutes';

const routes = (app: Express) => {
  app.route('/').get((req: express.Request, res: express.Response) => {
    res.status(200).send({ titulo: 'Curso de node' });
  });

  app.use(express.json(), livroRoutes, autorRouter);
};

export default routes;
