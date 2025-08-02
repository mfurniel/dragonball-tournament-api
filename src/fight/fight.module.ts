import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightController } from './fight.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FeatureFlagsModule } from '../common/features-flags/feature-flags.module';

@Module({
  controllers: [FightController],
  providers: [FightService],
  imports: [PrismaModule, FeatureFlagsModule],
})
export class FightModule {}
