import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';

@Injectable()
export class FightService {
  constructor(private prisma: PrismaService) {}

  async create(createFightDto: CreateFightDto) {
    const newFight = await this.prisma.fight.create({
      data: {
        tournamentId: createFightDto.tournamentId,
        warrior1Id: createFightDto.warrior1Id,
        warrior2Id: createFightDto.warrior2Id,
        winnerId: createFightDto.winnerId,
        description: createFightDto.description,
        creator: createFightDto.creator,
        startTime: createFightDto.startTime,
        endTime: createFightDto.endTime,
        status: createFightDto.status,
      },
    });
    return newFight;
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 10, order = 'asc' } = paginationDto;
    const skip = (page - 1) * limit;

    return this.prisma.fight.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: order },
      include: {
        warrior1: true,
        warrior2: true,
        winner: true,
        tournament: true,
      },
    });
  }

  async findOne(id: string) {
    const fight = await this.prisma.fight.findUnique({
      where: { id },
      include: {
        warrior1: true,
        warrior2: true,
        winner: true,
        tournament: true,
      },
    });

    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }

    return fight;
  }

  async update(id: string, updateFightDto: UpdateFightDto) {
    const fight = await this.prisma.fight.findUnique({ where: { id } });

    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }

    return this.prisma.fight.update({
      where: { id },
      data: {
        ...updateFightDto,
      },
    });
  }

  async remove(id: string) {
    const fight = await this.prisma.fight.findUnique({ where: { id } });

    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }

    return this.prisma.fight.delete({ where: { id } });
  }
}
