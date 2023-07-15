export interface IShop {
  id?: string,
  name: string,
  category: string,
  address1: string,
  address2: string,
  description?: string,
  imageUrl?: string,
  originalHourlyPay: number
}

export interface INotice {
  id?: string,
  hourlyPay: number,
  description: string,
  startsAt: string,
  workhour: number,
  closed?: boolean,
  shop?: {
    item: IShop,
    href: string,
  },
}
