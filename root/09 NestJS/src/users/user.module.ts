import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SignUpController } from './sign-up.controller';

@Module({
  controllers: [SignUpController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: ['DATABASE_CONNECTION'],
    },
    UserService,
  ],
})
export class UserModule {}