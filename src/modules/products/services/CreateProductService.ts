import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | null> {
    const productsExists = await ProductsRepository.findOne({
      where: { name: name },
    });

    if (productsExists) {
      throw new AppError('There is already one product with this name!');
    }

    const product = ProductsRepository.create({
      name,
      price,
      quantity,
    });

    await ProductsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
