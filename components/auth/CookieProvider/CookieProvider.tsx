import { CookiesProvider } from "react-cookie";

const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default CookieProvider;
