import AppError from '@shared/errors/AppError';

import { Customer } from '../typeorm/entities/Customers';

import { CustumersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustumersRepository.findById(id);

    if (!customer) throw new AppError('Customer not found!');

    return customer;
  }
}

export default ShowCustomerService;
