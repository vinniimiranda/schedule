import { Request, Response, Router } from 'express';
import validate from 'express-validation';

import User from '../models/UserModel';
import { UserStoreValidation } from '../validation/UserValidation';

class UserController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/', validate(UserStoreValidation), this.store);
    this.router.get('/', this.index);
    return this.router;
  }

  private async store(req: Request, res: Response): Promise<any> {
    const user = await User.create({ ...req.body });
    user.password_hash = undefined;
    user.password = undefined;
    res.status(201).json(user);
  }

  private async index(req: Request, res: Response): Promise<any> {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] }
    });
    res.status(200).json(users);
  }
}

export default new UserController();
