import AppError from '@shared/errors/AppError';

import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<string | null> {
    const product = await ProductsRepository.findOne({ where: { id: id } });

    if (!product) throw new AppError('Product not found!!!');

    await ProductsRepository.remove(product);

    return `Product with ID: ${id} was deleted successfully`;
  }
}

export default DeleteProductService;
