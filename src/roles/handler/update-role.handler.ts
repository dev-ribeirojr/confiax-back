import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { UpdateRoleDto } from 'src/roles/dto';
import { NotFoundException } from '@nestjs/common';

class UpdateRoleByIdHandler {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.repository.findOneBy({ id });

    if (!role) throw new NotFoundException();

    this.repository.merge(role, updateRoleDto);

    return this.repository.save(role);
  }
}

export default UpdateRoleByIdHandler;
