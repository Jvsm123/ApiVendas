import AppError from '@shared/errors/AppError';

import { Product } from '../typeorm/entities/Product';

import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | null> {
    const product = await ProductsRepository.findOne({ where: { id: id } });

    if (!product) throw new AppError('Product not found!!!');

    const productExists = await ProductsRepository.find({
      where: { name: name },
    });

    if (productExists && name !== product.name) throw new AppError('This product already exists!');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;

