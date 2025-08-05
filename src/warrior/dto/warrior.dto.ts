import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WarriorDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  race: string;

  @ApiProperty()
  @Expose()
  powerLevel: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  userId: string;
}
