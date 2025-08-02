import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournament/tournament.module';
import { WarriorModule } from './warrior/warrior.module';
import { FightModule } from './fight/fight.module';

@Module({
  imports: [TournamentsModule, WarriorModule, FightModule],
})
export class AppModule {}
