import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

class GetUsersHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  execute() {
    return this.repository.find({
      relations: ['roles'],
    });
  }
}

export default GetUsersHandler;
