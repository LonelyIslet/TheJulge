export interface FilterOptions {
  address: Set<number>
  startsAtGte: Date | null,
  hourlyPayGte: number,
}

export interface GetNoticesProps {
  keyword?: string,
  sort?: string,
  filter?: string,
}
