import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create({ name, password, salt }: Partial<User>): Promise<User> {
    const { identifiers } = await this.userRepository.insert({ name, password, salt });
    return this.userRepository.findOne(identifiers[0].id);
  }
}
