import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUsersHandler,
  DeleteUserByIdHandler,
  GetUserByIdHandler,
  GetUsersHandler,
  UpdateUserHandler,
} from 'src/users/handler';
import { UsersController } from 'src/users/users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        GetUsersHandler,
        CreateUsersHandler,
        DeleteUserByIdHandler,
        GetUserByIdHandler,
        UpdateUserHandler,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
