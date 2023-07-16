import StoreProvider from "redux/StoreProvider";
import { GlobalNav, GlobalFooter } from "components/common";
import ToastRoot from "components/common/Toast/ToastRoot";
import PersistGateContext from "components/auth/PersistGateContext/PersistGateContext";
import ErrorModalRoot from "components/common/Modal/ErrorModalRoot";
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
      <html lang="ko">
        <body className={spoqaHanSansNeo.className}>
          <PersistGateContext>
            <div id="toast-root" />
            <ToastRoot />
            <div id="modal-root" />
            <ErrorModalRoot />
            <GlobalNav />
            <main>
              {children}
            </main>
            <GlobalFooter />
          </PersistGateContext>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
