import postgresDataSource from '@shared/typeorm';

import Product from '../entities/Product';

export const ProductsRepository = async (
  name: string,
): Promise<Product | null> => {
  const repository = postgresDataSource.getRepository(Product);

  const product = repository.findOne({ where: { name: name } });

  return product;
};

