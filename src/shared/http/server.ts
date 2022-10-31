import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

import AppError from '@shared/errors/AppError';

import "@shared/typeorm";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error: Error, _: Request, res: Response, ___: NextFunction) => {
  if (error instanceof AppError) {
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

