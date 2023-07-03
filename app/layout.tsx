import "styles/globals.scss";
import spoqaHanSansNeo from "styles/local.font";

export const metadata = {
  title: "",
  description: "Generated by create next app",
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
