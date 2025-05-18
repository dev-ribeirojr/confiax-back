import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GetUsersHandler,
  CreateUsersHandler,
  GetUserByIdHandler,
  UpdateUserHandler,
  DeleteUserByIdHandler,
} from 'src/users/handler';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { PaginationDto } from 'src/common/dto';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/users/decorator';
@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
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
  findAll(@Query() pagination: PaginationDto) {
    return this.getUsersHandler.execute(pagination);
  }

  @Get('me')
  getMe(@CurrentUser() user: { userId: string }) {
    return this.getUserByIdHandler.execute(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUserByIdHandler.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserHandler.execute(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUserByIdHandler.execute(id);
  }
}
