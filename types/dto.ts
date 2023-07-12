import { ApplyStatus } from "./enums/apply.enum";
import { UserType } from "./enums/user.enum";

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

export interface IApplication {
  id?: string,
  status: ApplyStatus,
  createdAt?: string,
  IUser?: {
    item: IUser,
    href: string,
  }
  IShop?: {
    item: IShop,
    href: string,
  },
  INotice?: {
    item: INotice,
    href: string,
  }
}

export interface INotice {
  id?: string,
  hourlyPay: number,
  description: string,
  startsAt: string,
  workhour: number,
  closed?: boolean,
  IShop?: {
    item: IShop,
    href: string,
  },

}

export interface IAlert {
  id?: string,
  createdAt: string,
  result: ApplyStatus.ACCEPTED | ApplyStatus.REJECTED,
  read: boolean,
  IApplication: {
    item: IApplication,
    href: string,
  },
  IShop: {
    item: IShop,
    href: string,
  },
  INotice: {
    item: INotice,
    href: string,
  },
  links: object[],
}

export interface IUser {
  id?: string,
  email: string,
  password?: string,
  type: UserType,
  name?: string,
  phone?: string,
  address?: string,
  bio?: string,
  IShop?: {
    item: IShop,
    href: string,
  }
}
