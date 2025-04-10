import { PaginationInterceptor } from './pagination.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { DataGetAllDto } from './dto/data-get-all.dto';
import { TournamentsGetAllDto } from './dto/get-all-responses/tournaments-get-all.dto';

describe('PaginationInterceptor', () => {
  let interceptor: PaginationInterceptor<any>;
  let mockExecutionContext: Partial<ExecutionContext>;
  let mockCallHandler: Partial<
    CallHandler<DataGetAllDto<any> | TournamentsGetAllDto>
  >;

  beforeEach(() => {
    interceptor = new PaginationInterceptor();
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          query: {},
        } as any),
      }),
    };

    mockCallHandler = {
      handle: jest.fn().mockReturnValue(
        of({
          totalCount: 20,
          itemsPage: [],
          data: [],
        } as unknown as DataGetAllDto<any>),
      ),
    };
  });

  it('should use default pagination parameters when none are provided', async () => {
    const result = await interceptor
      .intercept(
        mockExecutionContext as ExecutionContext,
        mockCallHandler as CallHandler<
          DataGetAllDto<any> | TournamentsGetAllDto
        >,
      )
      .toPromise();

    expect(result!).toHaveProperty('pagination');
    const paginationInfo = result!.pagination;

    expect(paginationInfo.currentPage).toBe(1);
    expect(paginationInfo.itemsPerPage).toBe(10);
    expect(paginationInfo.order).toBe('asc');

    expect(paginationInfo.totalItems).toBe(20);
    expect(paginationInfo.totalPages).toBe(2);
    expect(paginationInfo.hasNextPage).toBe(true);
    expect(paginationInfo.hasPreviousPage).toBe(false);
  });
});
