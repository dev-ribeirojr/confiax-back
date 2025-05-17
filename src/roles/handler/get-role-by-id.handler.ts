import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { NotFoundException } from '@nestjs/common';

class GetRoleByIdHandler {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(id: string) {
    const role = await this.repository.findOneBy({ id });

    if (!role) throw new NotFoundException();

    return role;
  }
}

export default GetRoleByIdHandler;
