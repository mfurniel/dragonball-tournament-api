import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournament/tournament.module';

@Module({
  imports: [TournamentsModule],
})
export class AppModule {}
