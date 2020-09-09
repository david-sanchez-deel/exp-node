import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ServiceMock } from '../../test';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserService],
      providers: [{ provide: 'USER_REPOSITORY', useValue: ServiceMock.instanceOf(Repository)}],
    }).compile();

    userService = app.get<UserService>(UserService);
    userRepository = app.get<Repository<User>>('USER_REPOSITORY');
  });

  describe('create', () => {
    it('should create the user', async () => {
      spyOn(userRepository, 'insert').and.returnValue(Promise.resolve({ identifiers: [{ id: 'newId' }] }));
      spyOn(userRepository, 'findOne').and.returnValue(Promise.resolve('created'));

      expect(await userService.create({ name: 'name', password: 'password', salt: 'salt' })).toBe('created');
      expect(userRepository.insert).toBeCalledWith({
        name: 'name',
        password: 'password',
        salt: 'salt'
      })
      expect(userRepository.findOne).toBeCalledWith('newId')
    });
  });
});
