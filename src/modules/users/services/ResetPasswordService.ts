import AppError from '@shared/errors/AppError';

import { hash } from 'bcryptjs';

import { isAfter, addHours } from 'date-fns';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { UsersTokenRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<string> {
    const userToken = await UsersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token is not valid!');
    }

    const user = await UsersRepository.findById(userToken.id);

    if (!user) {
      throw new AppError('User is not valid!');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired!');
    }

    user.password = await hash(password, 8);

    return 'Password changed susscessfuly!';
  }
}

export default ResetPasswordService;
