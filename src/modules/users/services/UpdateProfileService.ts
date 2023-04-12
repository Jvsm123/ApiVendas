import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

import { User } from '../typeorm/entities/User';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  // avatar: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) throw new AppError('User not found!');

    const userUpdateEmail = await UsersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id)
      throw new AppError('Email already registred!');

    if (password && !oldPassword)
      throw new AppError('Old password is required!');

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) throw new AppError('Password is incorrect!');

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
