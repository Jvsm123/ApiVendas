import "reflect-metadata";

import { DataSource } from 'typeorm';

// Bug on import with @path
import { Product } from '../../modules/products/typeorm/entities/Product';
import { User } from '../../modules/users/typeorm/entities/User'

export const PostgresDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'teste',
  database: 'vendas',
  entities: [Product, User],
  migrations: [__dirname + '/migrations/*.ts'],
});
