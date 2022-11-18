import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

import ListUserService from '../services/ListUserService';

class MainUsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();

	console.log(req.user.id);

    const users = await listUsers.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, avatar } = req.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
      name,
      email,
      password,
      avatar,
    });

    return res.json(newUser);
  }
}

export default MainUsersController;

