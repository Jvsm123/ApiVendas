import AppError from '@shared/errors/AppError';
import { CustumersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<string | null> {
    const customer = await CustumersRepository.findById(id);

    if (!customer) throw new AppError('Customer not found!!!');

    await CustumersRepository.remove(customer);

    return `Customer with ID: ${id} was deleted successfully`;
  }
}

export default DeleteProductService;
