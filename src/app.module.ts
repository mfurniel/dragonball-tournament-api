import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournament/tournament.module';
import { WarriorModule } from './warrior/warrior.module';
import { FightModule } from './fight/fight.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TournamentsModule,
    WarriorModule,
    FightModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
