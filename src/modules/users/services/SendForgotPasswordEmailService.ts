import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { UsersTokenRepository } from '../typeorm/repositories/UserTokensRepository';

import EtherealMail from '@config/mail/etherealMail';

interface IRequest {
  email: string;
}

interface ITokenResponse {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<ITokenResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await UsersTokenRepository.generateToken(user.id);

    if (!token) {
      throw new AppError('Token failed to create!');
    }

    await EtherealMail.sendMail({
      to: email,
      body: `Change our password with this token: ${token?.token}`,
    });

    return token;
  }
}

export default SendForgotPasswordEmailService;
