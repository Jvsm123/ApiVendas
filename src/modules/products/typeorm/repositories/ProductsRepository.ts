import postgresDataSource from '@shared/typeorm';

import Product from '../entities/Product';

const ProductsRepository = postgresDataSource.getRepository(Product);

export default ProductsRepository;

