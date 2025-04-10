export class PaginatedResponseDto<T> {
  data: T;
  pagination: {
    method: 'offset';
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    nextCursor: null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  meta?: {
    timestamp?: string;
  };
}
