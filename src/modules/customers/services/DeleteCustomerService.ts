import AppError from '@shared/errors/AppError';

import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<string | null> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) throw new AppError('Customer not found!!!');

    await CustomersRepository.remove(customer);

    return `Customer with ID: ${id} was deleted successfully`;
  }
}

export default DeleteCustomerService;
