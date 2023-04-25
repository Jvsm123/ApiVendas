import { PostgresDataSource } from '@shared/typeorm';

import { Customer } from '../entities/Customers';

export const CustomersRepository = PostgresDataSource.getRepository(
  Customer,
).extend({
  async findByName(name: string): Promise<null | Customer> {
    const customer = await this.findOne({ where: { name } });

    return customer;
  },

  async findById(id: string): Promise<null | Customer> {
    const customer = await this.findOne({ where: { id } });

    return customer;
  },

  async findByEmail(email: string): Promise<null | Customer> {
    const customer = await this.findOne({ where: { email } });

    return customer;
  },
});
