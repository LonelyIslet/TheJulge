import "styles/globals.scss";
import spoqaHanSansNeo from "styles/local.font";

export const metadata = {
  title: "더줄게",
  description: "알바 대타 찾을때, 더줄게",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={spoqaHanSansNeo.className}>{children}</body>
    </html>
  );
}
