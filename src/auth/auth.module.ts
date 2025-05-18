import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

import { AuthHandler } from 'src/auth/handler';
import { AuthController } from 'src/auth/auth.controller';
import { JwtAuthGuard, AdminGuard } from 'src/auth/guards';
import { JwtStrategy } from 'src/auth/strategies';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthHandler, JwtStrategy, JwtAuthGuard, AdminGuard],
  controllers: [AuthController],
})
export class AuthModule {}
