import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreatorDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose({ name: 'username' }) // ← transforma "username" en "name"
  name: string;
}
export class TournamentDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  location: string;

  @ApiProperty({ nullable: true })
  @Expose()
  prize: string | null;

  @ApiProperty({ type: CreatorDto })
  @Expose()
  @Type(() => CreatorDto)
  creator: CreatorDto;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
