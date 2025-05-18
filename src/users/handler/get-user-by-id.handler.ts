import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

class GetUserByIdHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}

export default GetUserByIdHandler;
