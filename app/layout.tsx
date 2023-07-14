import "styles/globals.scss";
import spoqaHanSansNeo from "styles/local.font";
import StoreProvider from "redux/StoreProvider";
import { GlobalNav, GlobalFooter } from "components/common";
import ToastRoot from "components/common/Toast/ToastRoot";
import { CookiesProvider } from "react-cookie";

export const metadata = {
  title: "더줄게",
  description: "알바 대타 찾을때, 더줄게",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <StoreProvider>
      <CookiesProvider>
        <html lang="ko">
          <body className={spoqaHanSansNeo.className}>
            <div id="toast-root" />
            <ToastRoot />
            <div id="modal-root" />
            <GlobalNav />
            <main>
              {children}
            </main>
            <GlobalFooter />
          </body>
        </html>
      </CookiesProvider>
    </StoreProvider>
  );
};

export default RootLayout;
