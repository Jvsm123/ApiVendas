import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { User } from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User | null> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one user with this email!');
    }

    const user = UsersRepository.create({
      name,
      email,
      password,
      avatar,
    });

    await UsersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

