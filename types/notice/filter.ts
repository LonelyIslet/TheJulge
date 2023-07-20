export interface FilterOptions {
  address: Set<number>
  startsAtGte: Date | null,
  hourlyPayGte: number,
}

export interface GetNoticesParams {
  page?: number,
  keyword?: string,
  sort?: string,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}
