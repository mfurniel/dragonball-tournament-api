import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { TournamentsGetAllDto } from '../common/pagination/dto/get-all-responses/tournaments-get-all.dto';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}

  async getAllTournaments(paginationRequestDto: PaginationRequestDto) {
    const { page = 1, limit = 10, order = 'asc' } = paginationRequestDto;
    const skip = (page - 1) * limit;

    const [data, count] = await Promise.all([
      this.prisma.tournament.findMany({
        skip,
        take: limit,
        orderBy: { id: order },
      }),
      this.prisma.tournament.count(),
    ]);

    const response = new TournamentsGetAllDto();
    response.tournaments = data;
    response.itemsPage = data.length;
    response.totalCount = count;

    return response;
  }

  async getTournament(id: string) {
    const data = await this.prisma.tournament.findUnique({
      where: { id },
    });
    return data;
  }
}
