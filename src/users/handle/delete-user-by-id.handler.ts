import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

class DeleteUserByIdHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string) {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new NotFoundException();

    return this.repository.remove(user);
  }
}

export default DeleteUserByIdHandler;
