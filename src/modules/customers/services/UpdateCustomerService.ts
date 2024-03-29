import AppError from '@shared/errors/AppError';

import { Customer } from '../typeorm/entities/Customers';

import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) throw new AppError('Customer not found!');

    const customerUpdateEmail = await CustomersRepository.findByEmail(email);

    if (customerUpdateEmail && email !== customer.email)
      throw new AppError('Email already registred!');

    customer.name = name;
    customer.email = email;

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
