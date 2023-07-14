import StoreProvider from "redux/StoreProvider";
import { GlobalNav, GlobalFooter } from "components/common";
import { CookieProvider } from "components/auth";
import ToastRoot from "components/common/Toast/ToastRoot";
import spoqaHanSansNeo from "styles/local.font";
import "styles/globals.scss";

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
      <CookieProvider>
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
      </CookieProvider>
    </StoreProvider>
  );
};

export default RootLayout;
