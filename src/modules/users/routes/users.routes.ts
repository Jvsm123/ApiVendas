import { Router } from 'express';

import MainUsersController from '../controller/MainUsersController';

import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();

const usersController = new MainUsersController();

usersRouter.get('/', usersController.index);

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

