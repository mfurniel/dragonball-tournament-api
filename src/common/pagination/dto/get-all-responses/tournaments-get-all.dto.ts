import { ApiProperty } from '@nestjs/swagger';
import { Tournament } from '@prisma/client';
import { TournamentDto } from '../../../../tournament/dto/tournament.dto';

export class TournamentsGetAllDto {
  @ApiProperty({
    type: [TournamentDto],
    description: 'List of tournaments on this page',
  })
  tournaments: Tournament[];

  @ApiProperty({ description: 'Number of items on this page' })
  itemsPage: number;

  @ApiProperty({ description: 'Total count of tournaments' })
  totalCount: number;
}
