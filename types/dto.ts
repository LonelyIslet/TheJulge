import { ApplyStatus } from "./enums/apply.enum";
import { UserType } from "./enums/user.enum";
import { Address1 } from "./shop/address";

export interface IShop {
  id?: string;
  name: string;
  category?: string;
  address1: string;
  address2?: string;
  description?: string;
  imageUrl?: string;
  originalHourlyPay: number;
  user?: IUser;
}

export interface IApplication {
  id?: string;
  status: ApplyStatus;
  createdAt?: string;
  user?: {
    item: IUser;
    href: string;
  };
  shop?: {
    item: IShop;
    href: string;
  };
  notice: {
    item: INotice;
    href: string;
  };
}

export interface INoticeData {
  offset: number;
  limit: number;
  address: string[];
  keyword?: string;
  items: Iitem;
  links: ILink[];
}

export interface INotice {
  id?: string,
  hourlyPay: number,
  description?: string,
  startsAt: string,
  workhour: number,
  closed: boolean,
  currentUserApplication?: {
    item: {
      id?: "string", // application.id,
      status: "pending | accepted | rejected | canceled", // application.status
      createdAt: "string", // application.createdAt
    },
  }
  shop: {
    item: IShop;
    href?: string;
  };
}

export interface IgetNoticesParams {
  keyword: string;
  sort: string;
}

export interface Iitem {
  item: INotice;
}

export interface IUser {
  id?: string;
  email: string;
  password?: string;
  type: UserType;
  name?: string;
  phone?: string;
  address?: Address1;
  bio?: string;
  shop?: {
    item: IShop;
    href: string;
  };
}

export interface ILink {
  rel: string;
  description: string;
  method: string;
  href: string;
}

export interface IAlert {
  id?: string;
  createdAt: string;
  result: ApplyStatus.ACCEPTED | ApplyStatus.REJECTED;
  read: boolean;
  application: {
    item: IApplication;
    href: string;
  };
  shop: {
    item: IShop;
    href: string;
  };
  notice: {
    item: INotice;
    href: string;
  };
  links: ILink[];
}
