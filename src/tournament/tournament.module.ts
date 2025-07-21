import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FeatureFlagsModule } from '../common/features-flags/feature-flags.module';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
  imports: [PrismaModule, FeatureFlagsModule],
})
export class TournamentsModule {}
