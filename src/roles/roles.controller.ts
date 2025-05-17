import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  CreateRolesHandler,
  GetRoleByIdHandler,
  GetRolesHandler,
  UpdateRoleByIdHandler,
} from 'src/roles/handler';
import { CreateRoleDto, UpdateRoleDto } from 'src/roles/dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRoleHandler: CreateRolesHandler,
    private readonly getRolesHandler: GetRolesHandler,
    private readonly getRoleByIdHandler: GetRoleByIdHandler,
    private readonly updateRoleByIdHandler: UpdateRoleByIdHandler,
  ) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.createRoleHandler.execute(createRoleDto);
  }

  @Get()
  findAll() {
    return this.getRolesHandler.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getRoleByIdHandler.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.updateRoleByIdHandler.execute(id, updateRoleDto);
  }
}
