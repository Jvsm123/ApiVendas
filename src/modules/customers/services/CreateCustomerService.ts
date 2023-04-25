import AppError from '@shared/errors/AppError';

import { Customer } from '../typeorm/entities/Customers';

import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer | null> {
    const emailExists = await CustomersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one customer with this email!');
    }

    const customer = CustomersRepository.create({
      name,
      email,
    });

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
