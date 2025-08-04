import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { username: username },
      });
      if (user) return user;
      return null;
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      if (users) return users;
      return null;
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          lastLoginAt: new Date(),
        },
      });
      const userResponse = plainToInstance(UserResponseDto, newUser);
      return userResponse;
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async getUserID(id: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) throw new NotFoundException(`User with id: ${id} not found`);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }
}
