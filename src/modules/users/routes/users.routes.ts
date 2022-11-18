import { Router } from 'express';

import MainUsersController from '../controller/MainUsersController';

import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();

const usersController = new MainUsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string(),
    },
  }),
  usersController.create,
);

export default usersRouter;

