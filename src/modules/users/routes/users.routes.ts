import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';

import multerConfig from '@config/multer';

import MainUsersController from '../controller/MainUsersController';

import UserAvatarController from '../controller/UserAvatarController';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();

const usersController = new MainUsersController();

const userAvatarController = new UserAvatarController();

const upload = multer(multerConfig)

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

usersRouter.patch(
  '/uploadAvatar',
  isAuthenticated,
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  userAvatarController.update,
);

export default usersRouter;
