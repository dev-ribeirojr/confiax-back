import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  GetUsersHandler,
  CreateUsersHandler,
  GetUserByIdHandler,
  UpdateUserHandler,
  DeleteUserByIdHandler,
} from 'src/users/handle';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUsersHandler: CreateUsersHandler,
    private readonly getUsersHandler: GetUsersHandler,
    private readonly getUserByIdHandler: GetUserByIdHandler,
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly deleteUserByIdHandler: DeleteUserByIdHandler,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUsersHandler.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.getUsersHandler.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUserByIdHandler.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserHandler.execute(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.deleteUserByIdHandler.execute(id);
  }
}
