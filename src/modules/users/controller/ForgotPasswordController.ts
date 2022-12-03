import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    const result = await sendForgotPasswordEmail.execute({ email });

    return res.json(result);
  }
}

export default ForgotPasswordController;

