import { Product } from '../typeorm/entities/Product';

import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await ProductsRepository.find();

    return products;
  }
}

export default ListProductService;
