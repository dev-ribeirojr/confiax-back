import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryFailedError, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

class CreateUsersHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute(props: CreateUserDto) {
    let roles: Role[] = [];

    if (props.roles && props.roles.length > 0) {
      roles = await this.roleRepository.findBy({
        id: In(props.roles),
      });
    } else {
      const defaultRole = await this.roleRepository.findOneBy({
        id: process.env.DEFAULT_ROLE_ID,
      });

      if (defaultRole) {
        roles = [defaultRole];
      }
    }

    const hashedPassword = await bcrypt.hash(props.password, 8);

    const user = this.repository.create({
      ...props,
      password: hashedPassword,
      roles,
    });

    try {
      return await this.repository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === 'ER_DUP_ENTRY'
      ) {
        throw new ConflictException('user_already_exist');
      }

      throw new InternalServerErrorException('internal_server_error');
    }
  }
}

export default CreateUsersHandler;
