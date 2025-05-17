import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { Role } from 'src/roles/entities/role.entity';

class CreateRolesHandler {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  execute(props: CreateRoleDto) {
    const user = this.repository.create(props);

    return this.repository.save(user);
  }
}

export default CreateRolesHandler;
