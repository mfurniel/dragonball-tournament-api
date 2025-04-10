export class PaginationInfoDto {
  method: 'offset';
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  order?: 'asc' | 'desc';
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPage: number;
}
