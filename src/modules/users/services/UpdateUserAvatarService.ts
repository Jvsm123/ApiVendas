import path from 'path';

import AppError from '@shared/errors/AppError';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

import { User } from '../typeorm/entities/User';

import { promisify } from 'util';

import fs from 'fs';

import multer from '@config/multer';

interface IRequest {
  userID: string;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({
    userID,
    avatarFilename,
  }: IRequest): Promise<User | null> {
    const user = await UsersRepository.findById(userID);

    const statsFileAsync = promisify(fs.stat);

    const unlinkFileAsync = promisify(fs.unlink);

    if (!user) throw new AppError('User not found');

    if (user.avatar) {
      const userAvatarFilePath = path.join(multer.directory, user.avatar);

      const userAvatarFileExists = await statsFileAsync(userAvatarFilePath);

      if (userAvatarFileExists) await unlinkFileAsync(userAvatarFilePath);
    }

    user.avatar = avatarFilename ? avatarFilename : '';

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
