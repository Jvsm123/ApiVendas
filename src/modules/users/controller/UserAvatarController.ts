import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const avatarService = new UpdateUserAvatarService();

    const user = avatarService.execute({
      userID: req.user.id,
      avatarFilename: req.file && req.file.filename,
    });

    return res.json(user);
  }
}

export default UserAvatarController;
