import { FactoryInterface } from './FactoryInterface';

import * as faker from 'faker';
import User from '../../models/UserModel';

export class UserFactory implements FactoryInterface {
  public async create(): Promise<User> {
    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    await user.save();

    return user.toJSON();
  }

  public attrs(): User {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    } as User;
  }
}
