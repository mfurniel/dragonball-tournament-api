import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { TournamentsGetAllDto } from '../common/pagination/dto/get-all-responses/tournaments-get-all.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

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
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async createTournament(dataTournament: CreateTournamentDto) {
    const newTournament = await this.prisma.tournament.create({
      data: {
        name: dataTournament.name,
        creator: dataTournament.creator,
        location: dataTournament.location,
        prize: dataTournament.prize,
        startDate: new Date(dataTournament.startDate),
      },
    });

    return newTournament;
  }

  async updateTournament(id: string, data: UpdateTournamentDto) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    const updateTournament = await this.prisma.tournament.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
      },
    });

    return updateTournament;
  }
}
