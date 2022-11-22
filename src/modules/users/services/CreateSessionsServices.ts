import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { User } from '../typeorm/entities/User';

import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import auth from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsServices {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | null> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsServices;
