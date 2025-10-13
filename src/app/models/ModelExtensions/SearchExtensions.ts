export interface PaginationResult<T> {
  totalItems: number;
  totalPages: number;
  pageSizes: number;
  currentPages: number;
  items: T;
}

export interface SearchRequest {
  currentPage?: number | 0; 
  pageSize?: number | 5;
}