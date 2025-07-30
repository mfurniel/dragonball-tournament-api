import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournament/tournament.module';
import { WarriorModule } from './warrior/warrior.module';

@Module({
  imports: [TournamentsModule, WarriorModule],
})
export class AppModule {}
