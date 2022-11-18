import { Request, Response } from 'express';

import CreateSessionsServices from '../services/CreateSessionsServices';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSesssion = new CreateSessionsServices();

    const user = await createSesssion.execute({ email, password });

    return res.json(user);
  }
}

export default SessionController;

