import { Module } from '@nestjs/common';
import { WarriorService } from './warrior.service';
import { WarriorController } from './warrior.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FeatureFlagsModule } from '../common/features-flags/feature-flags.module';

@Module({
  controllers: [WarriorController],
  providers: [WarriorService],
  imports: [PrismaModule, FeatureFlagsModule],
})
export class WarriorModule {}
