import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

class GetUsersHandler {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const normalizedLimit = Number(limit);

    const skip = (Number(page) - 1) * normalizedLimit;

    const [users, total] = await this.repository.findAndCount({
      relations: ['roles'],
      take: limit,
      skip: skip,
    });

    return {
      data: users,
      total,
      page,
      limit,
      last_page: Math.ceil(total / normalizedLimit),
    };
  }
}

export default GetUsersHandler;
