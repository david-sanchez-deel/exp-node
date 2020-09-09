import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './sign-up.controller';
import { UserService } from './user.service';
import { ServiceMock } from '../../test';

describe('SignUpController', () => {
  let signUpController: SignUpController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [{ provide: UserService, useValue: ServiceMock.instanceOf(UserService)}],
    }).compile();

    signUpController = app.get<SignUpController>(SignUpController);
    userService = app.get<UserService>(UserService);
  });

  describe('signUp', () => {
    it('should create the user', async () => {
      spyOn(userService, 'create').and.returnValue(Promise.resolve('created'));

      expect(await signUpController.signUp()).toBe('created');
      expect(userService.create).toBeCalledWith({
        name: 'name',
        password: 'password',
        salt: 'salt'
      })
    });
  });
});
