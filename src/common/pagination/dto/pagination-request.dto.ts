import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional, IsString, IsIn, Max } from 'class-validator';

export class PaginationRequestDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
