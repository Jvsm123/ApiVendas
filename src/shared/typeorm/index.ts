import { DataSource } from 'typeorm';

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'teste',
  database: 'vendas',
});

export default postgresDataSource;

