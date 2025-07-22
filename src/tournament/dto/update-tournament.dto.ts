import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  creator?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  prize?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;
}
