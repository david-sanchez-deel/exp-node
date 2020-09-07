import {User} from '../schemas';
import ForbiddenError from '../errors/forbidden-error';
import jwtService from './jwt-service';
import { PasswordService } from './password-service';
import { injectable } from 'tsyringe';

@injectable()
export class UserService {
  constructor(private passwordService: PasswordService) {}
  public create({ name, password }) {
    const newPassword = this.passwordService.hashPassword(password);

    return User.create({
      name,
      password: newPassword.password,
      salt: newPassword.salt,
    });
  }
  public async login({ name, password }) {
    const user = await User.findOne({
      name,
    });
    if (!user) {
      console.warn('Error, user not found');
      throw new ForbiddenError();
    }
    const newPassword = this.passwordService.hashPassword(password, user.salt);
    if (user.password !== newPassword.password) {
      console.warn('Error, password miss match');
      throw new ForbiddenError();
    }

    const token = jwtService.sign({ name });
    return token;
  }
  public getByName(name) {
    return User.findOne({
      name,
    });
  }
}
