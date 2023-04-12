import AppError from '@shared/errors/AppError';

import { User } from '../typeorm/entities/User';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) throw new AppError('User not found!');

    return user;
  }
}

export default ShowProfileService;
