import { Cookies } from "react-cookie";

const cookies = new Cookies();

interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  encode?: (value: string) => string;
}

export const setCookie = (name: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: CookieSetOptions) => {
  cookies.remove(name, { ...option });
};
