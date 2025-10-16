export interface PaginationResult<T> {
    currentPage : number,
    pageSizes : number,
    totalItems : number,
    totalPages : number,
    empty : boolean
    content : T[]
}

export interface SearchRequest {
    page : number,
    size : number,
    sortBy : string,
    sortDirection : string
}