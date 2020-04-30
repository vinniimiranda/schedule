import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import User from '../models/UserModel';

class AuthController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/login', this.login);
    return this.router;
  }

  private async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found, please verify your credentials and try again'
      });
    }

    const validatePassword = await bcryptjs.compare(
      password,
      user.password_hash
    );

    if (!validatePassword) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      user: { ...user.toJSON(), password_hash: undefined },
      token
    });
  }
}

export default new AuthController();
