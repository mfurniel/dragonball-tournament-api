import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FeatureFlagsModule } from 'src/common/features-flags/feature-flags.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    FeatureFlagsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_TIME_JWT },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    AuthGuard,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
