import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWarriorDto } from './dto/create-warrior.dto';
import { UpdateWarriorDto } from './dto/update-warrior.dto';
import { PaginationRequestDto } from 'src/common/pagination/dto/pagination-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarriorService {
  constructor(private prisma: PrismaService) {}

  async create(createWarriorDto: CreateWarriorDto) {
    const { userId } = createWarriorDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

    const existingWarrior = await this.prisma.warrior.findUnique({
      where: { userId },
    });

    if (existingWarrior) {
      throw new ConflictException(
        `User with id ${userId} already has a warrior`,
      );
    }

    const newWarrior = await this.prisma.warrior.create({
      data: createWarriorDto,
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

  async remove(warriorId: string, userId: string) {
    const warrior = await this.prisma.warrior.findUnique({
      where: { id: warriorId },
    });

    if (!warrior) {
      throw new NotFoundException(`Tournament with ID ${warriorId} not found`);
    }

    if (warrior.userId !== userId) {
      throw new ForbiddenException(
        `You are not allowed to delete this warrior`,
      );
    }

    return this.prisma.warrior.delete({
      where: { id: warriorId },
    });
  }
}
