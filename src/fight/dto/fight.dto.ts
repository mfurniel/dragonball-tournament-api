import { Expose, Type } from 'class-transformer';
import { FightStatus } from '@prisma/client';

export class FightDto {
  @Expose()
  id: string;

  @Expose()
  tournamentId: string;

  @Expose()
  warrior1Id?: string;

  @Expose()
  warrior2Id?: string;

  @Expose()
  winnerId?: string;

  @Expose()
  description?: string;

  @Expose()
  creator?: string;

  @Expose()
  startTime?: Date;

  @Expose()
  endTime?: Date;

  @Expose()
  status: FightStatus;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
