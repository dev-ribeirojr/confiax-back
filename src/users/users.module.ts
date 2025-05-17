import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  GetUsersHandler,
  CreateUsersHandler,
  DeleteUserByIdHandler,
  GetUserByIdHandler,
  UpdateUserHandler,
} from 'src/users/handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    GetUsersHandler,
    CreateUsersHandler,
    DeleteUserByIdHandler,
    GetUserByIdHandler,
    UpdateUserHandler,
  ],
})
export class UsersModule {}
