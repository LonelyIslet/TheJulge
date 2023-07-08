import "styles/globals.scss";
import spoqaHanSansNeo from "styles/local.font";
import StoreProvider from "redux/StoreProvider";

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
        <body className={spoqaHanSansNeo.className}>{children}</body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
