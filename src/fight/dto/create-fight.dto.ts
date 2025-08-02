import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { FightStatus } from '@prisma/client';

export class CreateFightDto {
  @IsString()
  tournamentId: string;

  @IsOptional()
  @IsString()
  warrior1Id?: string;

  @IsOptional()
  @IsString()
  warrior2Id?: string;

  @IsOptional()
  @IsString()
  winnerId?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  creator?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsEnum(FightStatus)
  status?: FightStatus;
}
