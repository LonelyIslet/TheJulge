import { ApplyStatus } from "./enums/apply.enum";
import { UserType } from "./enums/user.enum";

export interface Shop {
  id?: string,
  name: string,
  category: string,
  address1: string,
  address2: string,
  description?: string,
  imageUrl?: string,
  originalHourlyPay: number
}

export interface Application {
  id?: string,
  status: ApplyStatus,
  createdAt?: string,
  user?: {
    item: User,
    href: string,
  }
  shop?: {
    item: Shop,
    href: string,
  },
  notice?: {
    item: Notice,
    href: string,
  }
}

export interface Notice {
  id?: string,
  hourlyPay: number,
  description: string,
  startsAt: string,
  workhour: number,
  closed?: boolean,
  shop?: {
    item: Shop,
    href: string,
  },

}

export interface Alert {
  id?: string,
  createdAt: string,
  result: ApplyStatus.ACCEPTED | ApplyStatus.REJECTED,
  read: boolean,
  application: {
    item: Application,
    href: string,
  },
  shop: {
    item: Shop,
    href: string,
  },
  notice: {
    item: Notice,
    href: string,
  },
  links: object[],
}

export interface User {
  id?: string,
  email: string,
  password?: string,
  type: UserType,
  name?: string,
  phone?: string,
  address?: string,
  bio?: string,
  shop?: {
    item: Shop,
    href: string,
  }
}
