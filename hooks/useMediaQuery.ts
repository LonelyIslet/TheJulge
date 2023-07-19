import { useState, useEffect } from "react";

const useMediaQuery = (breakpoint: number) => {
  const [mediaQuery, setMediaQuery] = useState({
    matches: window.innerWidth < breakpoint,
    media: "",
  });

  useEffect(() => {
    const mediaQueryList = matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChangeMedia = (e: MediaQueryListEvent) => {
      setMediaQuery(e);
    };
    mediaQueryList.addEventListener("change", handleChangeMedia);
    return () => {
      mediaQueryList.removeEventListener("change", handleChangeMedia);
    };
  }, [breakpoint]);

  return mediaQuery;
};

export default useMediaQuery;
