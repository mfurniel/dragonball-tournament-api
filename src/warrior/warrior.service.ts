import { Injectable } from '@nestjs/common';
import { CreateWarriorDto } from './dto/create-warrior.dto';
import { UpdateWarriorDto } from './dto/update-warrior.dto';
import { PaginationRequestDto } from 'src/common/pagination/dto/pagination-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarriorService {
  constructor(private prisma: PrismaService) {}

  create(createWarriorDto: CreateWarriorDto) {
    console.log(createWarriorDto);
    return 'This action adds a new warrior';
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

  findOne(id: number) {
    return `This action returns a #${id} warrior`;
  }

  update(id: number, updateWarriorDto: UpdateWarriorDto) {
    console.log(updateWarriorDto);
    return `This action updates a #${id} warrior`;
  }

  remove(id: number) {
    return `This action removes a #${id} warrior`;
  }
}
