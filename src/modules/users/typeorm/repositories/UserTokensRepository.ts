import { PostgresDataSource } from '@shared/typeorm';

import { UserToken } from '../entities/UserToken';

export const UsersTokenRepository = PostgresDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  },

  async generateToken(user_id: string): Promise<UserToken> {
    const userToken = this.create({ user_id });

    await this.save(userToken);

    return userToken;
  },
});
