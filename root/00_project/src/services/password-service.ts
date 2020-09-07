import * as crypto from 'crypto';
import { injectable } from 'tsyringe';

@injectable()
export class PasswordService {
  private genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
  private sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  }
  public hashPassword(userPassword, salt = this.genRandomString(16)) {
    const password = this.sha512(userPassword, salt);
    return { password, salt };
  }
}
