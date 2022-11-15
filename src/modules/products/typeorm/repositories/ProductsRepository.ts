import { PostgresDataSource } from '@shared/typeorm';

import { Product } from '../entities/Product';

export const ProductsRepository = PostgresDataSource.getRepository(Product);
