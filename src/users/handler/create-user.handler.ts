import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

class CreateUsersHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  execute(props: CreateUserDto) {
    const user = this.repository.create(props);

    return this.repository.save(user);
  }
}

export default CreateUsersHandler;
