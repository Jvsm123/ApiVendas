import AppError from '@shared/errors/AppError';

import { Product } from '../typeorm/entities/Product';

import  { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | null> {
    const product = await ProductsRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError('Product not found!!!');
    }

    return product;
  }
}

export default ShowProductService;

