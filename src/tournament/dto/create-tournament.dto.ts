import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Dragonball Z Championship' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  creatorId: string;

  @ApiProperty({ example: 'Namek' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  location: string;

  @ApiProperty({ example: '1000 Zenis', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  prize: string | null;

  @ApiProperty({ example: '2025-08-01T10:00:00Z' })
  @IsDateString()
  startDate: string;
}
