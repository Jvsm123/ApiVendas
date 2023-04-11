import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { UsersTokenRepository } from '../typeorm/repositories/UserTokensRepository';

import EtherealMail from '@config/mail/etherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await UsersTokenRepository.generateToken(user.id);

    if (!token) {
      throw new AppError('Token failed to create!');
    }

    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API Vendas] - Recuperação de senha',
      templateData: {
        template: `Change our password with this token: ${token}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
