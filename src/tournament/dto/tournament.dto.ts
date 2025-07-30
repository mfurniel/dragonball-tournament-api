import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TournamentDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  creator: string;

  @ApiProperty()
  @Expose()
  location: string;

  @ApiProperty({ nullable: true })
  @Expose()
  prize: string | null;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
