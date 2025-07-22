import { ApiProperty } from '@nestjs/swagger';

export class TournamentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  creator: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ nullable: true })
  prize?: string | null;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
