import AppError from '@shared/errors/AppError';

import { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

import auth from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, auth.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    req.user = { id: sub };

    return next();
  }
  catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}

