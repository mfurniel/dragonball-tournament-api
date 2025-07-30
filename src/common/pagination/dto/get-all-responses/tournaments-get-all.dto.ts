import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from '../../../../tournament/dto/tournament.dto';

export class TournamentsGetAllDto {
  constructor(params?: Partial<TournamentsGetAllDto>) {
    Object.assign(this, params);
  }

  @ApiProperty({
    type: [TournamentDto],
    description: 'List of tournaments on this page',
  })
  tournaments: TournamentDto[] = [];

  @ApiProperty({ description: 'Number of items on this page' })
  itemsPage: number = 0;

  @ApiProperty({ description: 'Total count of tournaments' })
  totalCount: number = 0;
}
