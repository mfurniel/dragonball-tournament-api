import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateWarriorDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ example: 'Goku' })
  name: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Sayan' })
  race: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: '9000' })
  powerLevel: number;
}
