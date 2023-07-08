import "styles/globals.scss";
import spoqaHanSansNeo from "styles/local.font";
import StoreProvider from "redux/StoreProvider";
import { NavBar } from "components/common";

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
          <div id="modal-root" />
          <NavBar />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
