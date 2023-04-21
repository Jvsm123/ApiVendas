import AppError from '@shared/errors/AppError';

import { Customer } from '../typeorm/entities/Customers';

import { CustumersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer | null> {
    const emailExists = await CustumersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one customer with this email!');
    }

    const customer = CustumersRepository.create({
      name,
      email,
    });

    await CustumersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
