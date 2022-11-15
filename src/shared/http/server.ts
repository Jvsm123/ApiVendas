import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import routes from './routes';

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

    app.use(routes);

    app.use(errors());

    app.use((error: Error, _: Request, res: Response, ___: NextFunction) => {
      if (error instanceof AppError) {
        console.log('ERrrored!');

        return res.status(error.statusCode).json({
          status: 'Error!',
          message: error.message,
        });
      }

      return res.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error_!',
      });
    });

    app.listen(8080, () => console.log('>>>>> LISTENING 8080 <<<<<'));
  })
  .catch(err => {
    throw new Error(`Error on instanced database: ${err}`);
  });

