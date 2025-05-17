import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto';

class UpdateUserHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new NotFoundException();

    this.repository.merge(user, updateUserDto);

    return this.repository.save(user);
  }
}

export default UpdateUserHandler;
