import express, { Express } from 'express';

import livros from './livroRoutes';

const routes = (app: Express) => {
  app.route('/').get((req: express.Request, res: express.Response) => {
    res.status(200).send({ titulo: 'Curso de node' });
  });

  app.use(express.json(), livros);
};

export default routes;
