import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  res.json({ message: 'Olá caro camarada!', status: 200 });
});

export default routes;

