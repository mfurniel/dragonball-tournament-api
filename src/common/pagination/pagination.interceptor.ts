import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { DataGetAllDto } from './dto/data-get-all.dto';
import { TournamentsGetAllDto } from './dto/get-all-responses/tournaments-get-all.dto';
import { Request } from 'express';
import { PaginationInfoDto } from './dto/pagination-info.dto';
import { Tournament } from '@prisma/client';

type PaginatedResponseBase = {
  pagination: PaginationInfoDto;
};

type PaginatedResponseWithData<T> = PaginatedResponseBase & {
  data: T | T[];
};

type PaginatedResponseWithTournaments = PaginatedResponseBase & {
  tournaments: Tournament[];
};

type PaginatedResponse<T> =
  | PaginatedResponseWithData<T>
  | PaginatedResponseWithTournaments;

@Injectable()
export class PaginationInterceptor<T>
  implements
    NestInterceptor<
      DataGetAllDto<T> | TournamentsGetAllDto,
      PaginatedResponse<T>
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<DataGetAllDto<T> | TournamentsGetAllDto>,
  ): Observable<PaginatedResponse<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const paginationRequestDto: PaginationRequestDto = {
      page: parseInt(request.query.page as string) || 1,
      limit: parseInt(request.query.limit as string) || 10,
      order: (request.query.order as 'asc' | 'desc') || 'asc',
    };

    return next.handle().pipe(
      map(
        (
          response: DataGetAllDto<T> | TournamentsGetAllDto,
        ): PaginatedResponse<T> => {
          const { page = 1, limit = 10, order = 'asc' } = paginationRequestDto;

          const totalPages = Math.ceil(response.totalCount / limit);
          const hasNextPage = page < totalPages;
          const hasPreviousPage = page > 1;

          const paginationInfo: PaginationInfoDto = {
            method: 'offset',
            totalItems: response.totalCount,
            currentPage: page,
            totalPages,
            itemsPerPage: limit,
            itemsPage: response.itemsPage,
            hasPreviousPage,
            hasNextPage,
            order,
          };

          if (response instanceof DataGetAllDto) {
            return { data: response.data, pagination: paginationInfo };
          } else if (response instanceof TournamentsGetAllDto) {
            return {
              tournaments: response.tournaments,
              pagination: paginationInfo,
            };
          } else {
            return {
              data: response as T | T[],
              pagination: paginationInfo,
            };
          }
        },
      ),
    );
  }
}
