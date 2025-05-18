import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new UnauthorizedException('invalid_token');

    const result = await this.dataSource
      .createQueryBuilder()
      .select('1')
      .from('user_roles', 'ur')
      .where('ur.user_id = :userId', { userId: user.userId })
      .andWhere('ur.role_id = :roleId', {
        roleId: process.env.ADMIN_ROLE_ID,
      })
      .getRawOne();

    if (!result) {
      throw new UnauthorizedException('not_have_permission');
    }

    return true;
  }
}
