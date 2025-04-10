import { PaginationInfoDto } from './pagination-info.dto';

describe('PaginationInfoDto', () => {
  it('should create a dto with correct values', () => {
    const dto = new PaginationInfoDto();
    dto.method = 'offset';
    dto.totalItems = 100;
    dto.totalPages = 10;
    dto.currentPage = 1;
    dto.itemsPerPage = 10;
    dto.order = 'asc';
    dto.hasNextPage = true;
    dto.hasPreviousPage = false;
    dto.itemsPage = 10;

    expect(dto).toEqual({
      method: 'offset',
      totalItems: 100,
      totalPages: 10,
      currentPage: 1,
      itemsPerPage: 10,
      order: 'asc',
      hasNextPage: true,
      hasPreviousPage: false,
      itemsPage: 10,
    });
  });
});
