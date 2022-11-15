import "reflect-metadata";

import { DataSource } from 'typeorm';

import { Product } from '@modules/products/typeorm/entities/Product';

export const PostgresDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'teste',
  database: 'vendas',
  entities: [Product],
  migrations: [__dirname + '/migrations/*.ts'],
});
