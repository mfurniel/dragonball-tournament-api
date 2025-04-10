import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from './dto/base-response.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

@Injectable()
export class ApiFormatter<T>
  implements NestInterceptor<T, BaseResponseDto<T> | PaginatedResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | PaginatedResponseDto<T>>,
  ): Observable<BaseResponseDto<T> | PaginatedResponseDto<T>> {
    const now = new Date().toISOString();

    return next.handle().pipe(
      map((response: T | PaginatedResponseDto<T>) => {
        if (response instanceof PaginatedResponseDto) {
          const paginatedResponseDto = new PaginatedResponseDto<T>();
          paginatedResponseDto.data = response.data;
          paginatedResponseDto.pagination = response.pagination;
          paginatedResponseDto.meta = { timestamp: now };
          return paginatedResponseDto;
        } else {
          const baseResponseDto = new BaseResponseDto<T>();
          baseResponseDto.data = response;
          baseResponseDto.meta = { timestamp: now };
          return baseResponseDto;
        }
      }),
    );
  }
}
