import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'tetedenoeil',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, RoleService],
  controllers: [AuthController],
})
export class AuthModule {}
