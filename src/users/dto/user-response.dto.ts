import { IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @Exclude()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  lastLoginAt: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
