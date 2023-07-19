export interface FilterOptions {
  address: Set<number>
  startsAtGte: Date | null,
  hourlyPayGte: number,
}

export interface GetNoticesParams {
  keyword?: string,
  sort?: string,
  filter?: string,
}
