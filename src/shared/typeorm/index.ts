import { DataSource } from 'typeorm';

const postgresDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'teste',
  database: 'vendas',
  migrations: [ __dirname + "/migrations/*.ts" ],
});

export default postgresDataSource;
