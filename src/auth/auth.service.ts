import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare, encrypt } from './libs/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  getUsers() {
    return this.usersService.findAll();
  }

  async logIn(user: UserDto) {
    try {
      const correctUser = await this.usersService.findOne(user.username);
      if (!correctUser)
        throw new BadRequestException('Invalid username or password');
      const isPasswordMatch = await compare(
        user.password,
        correctUser.password,
      );
      if (!isPasswordMatch)
        throw new BadRequestException('Invalid username or password');
      const payload = {
        sub: correctUser.id, // Estándar JWT para subject
        username: correctUser.username,
        role: correctUser.role,
      };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error when logging in');
    }
  }

  async signUp(user: CreateUserDto) {
    try {
      const userFound = await this.usersService.findOne(user.username);
      if (userFound) throw new BadRequestException('The user already exists');
      const hashedPassword = await encrypt(user.password);
      const newUser = await this.usersService.create({
        username: user.username,
        password: hashedPassword,
      });
      const userResponse = plainToInstance(UserResponseDto, newUser);
      const payload = {
        sub: userResponse.id,
        username: userResponse.username,
        role: userResponse.role,
      };
      const access_token = await this.jwtService.signAsync(payload);

      return {
        access_token,
        user: userResponse,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Error when signing up');
    }
  }
}
