import { IsString, MaxLength, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  creator: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  location: string;

  @IsString()
  @MaxLength(50)
  prize: string | null;

  @IsDate()
  startDate: Date;
}
