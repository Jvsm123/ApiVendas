import { User } from '../typeorm/entities/User';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await UsersRepository.find();

    return users;
  }
}

export default ListUserService;
