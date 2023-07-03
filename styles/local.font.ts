import localFont from "next/font/local";

const spoqaHanSansNeo = localFont({
  src: [
    {
      path: "../app/fonts/SpoqaHanSansNeo-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/SpoqaHanSansNeo-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export default spoqaHanSansNeo;
