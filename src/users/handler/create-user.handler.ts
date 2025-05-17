import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const DEFAULT_ID_ROLE = '7ea5dcd7-872b-4b85-a267-aa8072640481';
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
        id: DEFAULT_ID_ROLE,
      });

      if (defaultRole) {
        roles = [defaultRole];
      }
    }

    const user = this.repository.create({ ...props, roles });

    return this.repository.save(user);
  }
}

export default CreateUsersHandler;
