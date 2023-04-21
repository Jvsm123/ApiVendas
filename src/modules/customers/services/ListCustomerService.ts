import { Customer } from '../typeorm/entities/Customers';

import { CustumersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustumersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
