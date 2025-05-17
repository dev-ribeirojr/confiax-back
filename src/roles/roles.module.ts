import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRolesHandler,
  GetRoleByIdHandler,
  GetRolesHandler,
  UpdateRoleByIdHandler,
} from 'src/roles/handler';
import { RolesController } from 'src/roles/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RolesController],
  providers: [
    CreateRolesHandler,
    GetRoleByIdHandler,
    GetRolesHandler,
    UpdateRoleByIdHandler,
  ],
})
export class RolesModule {}
