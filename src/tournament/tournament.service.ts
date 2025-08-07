import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { TournamentsGetAllDto } from '../common/pagination/dto/get-all-responses/tournaments-get-all.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { plainToInstance } from 'class-transformer';

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
        include: {
          creator: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.tournament.count(),
    ]);

    const tournaments = plainToInstance(TournamentDto, data, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return new TournamentsGetAllDto({
      tournaments,
      itemsPage: tournaments.length,
      totalCount: count,
    });
  }

  async getTournament(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    const tournamentFormat = plainToInstance(TournamentDto, tournament, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return tournamentFormat;
  }

  async createTournament(dataTournament: CreateTournamentDto) {
    const newTournament = await this.prisma.tournament.create({
      data: {
        name: dataTournament.name,
        creatorId: dataTournament.creatorId,
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

  async deleteTournament(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}
