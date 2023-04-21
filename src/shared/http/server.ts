import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import routes from './routes';

import multer from '@config/multer';

import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import { PostgresDataSource } from '@shared/typeorm';

PostgresDataSource.initialize()
  .then(conn => {
    if (conn.isInitialized) console.log('Connect Successfuly');
    else throw new Error('Database has not been initialized!!!');

    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use('/files', express.static(multer.directory));

    app.use(errors());

    app.use(routes);

    app.use((error: Error, _: Request, res: Response) => {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: 'Error!',
          message: error.message,
        });
      }

      return res.status(500).json({
        status: 'Error!',
        message: `Message from server: ${error.message}`,
      });
    });

    app.listen(8080, () => console.log('>>>>> LISTENING 8080 <<<<<'));
  })
  .catch(err => {
    throw new Error(`Error on instanced database: ${err}`);
  });
