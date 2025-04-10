import { of } from 'rxjs';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiFormatter } from './api-formatter.interceptor';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { BaseResponseDto } from './dto/base-response.dto';
import { firstValueFrom } from 'rxjs';

describe('ApiFormatter', () => {
  let interceptor: ApiFormatter<any>;

  beforeEach(() => {
    interceptor = new ApiFormatter<any>();
  });

  describe('when response is a PaginatedResponseDto', () => {
    it('should wrap response with pagination and meta', async () => {
      const responseData = new PaginatedResponseDto<any>();
      responseData.data = [{ id: 1 }];
      responseData.pagination = {
        method: 'offset',
        totalItems: 100,
        totalPages: 10,
        currentPage: 1,
        itemsPerPage: 10,
        nextCursor: null,
        hasNextPage: true,
        hasPreviousPage: false,
      };

      const callHandler: CallHandler = {
        handle: () => of(responseData),
      };

      const context = {} as ExecutionContext;

      const result = await firstValueFrom(
        interceptor.intercept(context, callHandler),
      );

      expect(result).toBeInstanceOf(PaginatedResponseDto);
      expect((result as PaginatedResponseDto<any>).pagination).toEqual(
        responseData.pagination,
      );
      expect((result as PaginatedResponseDto<any>).data).toEqual(
        responseData.data,
      );
      expect(
        (result as PaginatedResponseDto<any>).meta?.timestamp,
      ).toBeDefined();
    });
  });

  describe('when response is a regular object', () => {
    it('should wrap response in BaseResponseDto with meta', async () => {
      const responseData = { id: 42, name: 'Goku' };

      const callHandler: CallHandler = {
        handle: () => of(responseData),
      };

      const context = {} as ExecutionContext;

      const result = await firstValueFrom(
        interceptor.intercept(context, callHandler),
      );

      expect(result).toBeInstanceOf(BaseResponseDto);
      expect((result as BaseResponseDto<any>).data).toEqual(responseData);
      expect((result as BaseResponseDto<any>).meta?.timestamp).toBeDefined();
    });
  });
});
