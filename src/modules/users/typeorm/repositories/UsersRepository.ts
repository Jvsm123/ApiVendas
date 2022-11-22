import { PostgresDataSource } from '@shared/typeorm';

import { User } from '../entities/User';

export const UsersRepository = PostgresDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<null | User> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  },
  async findById(id: string): Promise<null | User> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  },
  async findByEmail(email: string): Promise<null | User> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  },
});

// export const UsersRepository = PostgresDataSource.getRepository(User)
