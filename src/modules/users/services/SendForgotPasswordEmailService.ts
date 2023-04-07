import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { UsersTokenRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await UsersTokenRepository.generateToken(user.id);

    if (!token) {
      throw new AppError('Token failed to create!');
    }

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
