import { Tournament } from '@prisma/client';

export class TournamentsGetAllDto {
  tournaments: Tournament[];
  itemsPage: number;
  totalCount: number;
}
