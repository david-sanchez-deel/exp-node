import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/sign-up')
export class SignUpController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  signUp() {
    return this.userService.create({
      name: 'name',
      password: 'password',
      salt: 'salt'
    });
  }
}
