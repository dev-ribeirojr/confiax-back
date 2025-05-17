import * as bcrypt from 'bcrypt';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class AuthHandler {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute({ email, password }: AuthDto) {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException();

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('invalid_credentials');
    }

    const hasPermission = user.roles.some(
      (role) => role.id === process.env.ADMIN_ROLE_ID,
    );

    if (!hasPermission) throw new UnauthorizedException('not_have_permission');

    const token = this.jwtService.sign({ sub: user.id });

    return {
      access_token: token,
    };
  }
}
