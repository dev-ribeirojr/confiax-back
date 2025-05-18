import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UpdateUserDto } from 'src/users/dto';

class UpdateUserHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('user_not_found');

    let updateRoles: Role[] = [];

    if (updateUserDto.roles && updateUserDto.roles.length > 0) {
      const roles = await this.roleRepository.findBy({
        id: In(updateUserDto.roles),
      });

      updateRoles = roles;
    } else {
      delete updateUserDto.roles;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);
    }

    this.repository.merge(user, {
      ...updateUserDto,
      roles: updateRoles,
    });

    return this.repository.save(user);
  }
}

export default UpdateUserHandler;
