import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/, {
    message:
      'The password must contain at least one uppercase letter, one number, and one symbol.',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  @IsDateString()
  lastLoginAt?: string;
}
