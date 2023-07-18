import StoreProvider from "redux/StoreProvider";
import {
  GlobalNav, GlobalFooter, ErrorModalRoot, ToastRoot,
} from "components/common";
import { PersistGateContext } from "components/auth";
import spoqaHanSansNeo from "styles/local.font";
import styles from "./page.module.scss";
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
            <main className={styles.layout}>
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
