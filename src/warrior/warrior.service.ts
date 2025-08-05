import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarriorDto } from './dto/create-warrior.dto';
import { UpdateWarriorDto } from './dto/update-warrior.dto';
import { PaginationRequestDto } from 'src/common/pagination/dto/pagination-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarriorService {
  constructor(private prisma: PrismaService) {}

  async create(createWarriorDto: CreateWarriorDto) {
    const newWarrior = await this.prisma.warrior.create({
      data: {
        name: createWarriorDto.name,
        userId: createWarriorDto.userId,
        race: createWarriorDto.race,
        powerLevel: createWarriorDto.powerLevel,
      },
    });
    return newWarrior;
  }

  async findAll(paginationRequestDto: PaginationRequestDto) {
    const { page = 1, limit = 10, order = 'asc' } = paginationRequestDto;
    const skip = (page - 1) * limit;

    return await this.prisma.warrior.findMany({
      skip,
      take: limit,
      orderBy: { id: order },
    });
  }

  async findOne(id: string) {
    const warrior = await this.prisma.warrior.findUnique({
      where: { id },
    });
    if (!warrior) {
      throw new NotFoundException(`Warrior with ID ${id} not found`);
    }
    return warrior;
  }

  async update(id: string, updateWarriorDto: UpdateWarriorDto) {
    const warrior = await this.prisma.warrior.findUnique({
      where: { id },
    });

    if (!warrior) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return this.prisma.warrior.update({
      where: { id },
      data: {
        ...updateWarriorDto,
      },
    });
  }

  async remove(id: string) {
    const warrior = await this.prisma.warrior.findUnique({
      where: { id },
    });

    if (!warrior) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return this.prisma.warrior.delete({
      where: { id },
    });
  }
}
