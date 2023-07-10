"use client";

import { useState, useEffect, RefObject } from "react";

interface Data {
  data: {
    ward: string[]
  }
}

const useDropdown = (ref: RefObject<HTMLElement>) => {
  const [toggle, setToggle] = useState(false);
  const [fetchData, setFetchData] = useState<Data>();

  const getDropdownData = async () => {
    try {
      const response = await fetch("/data/drop.json");
      const data = await response.json() as Data;
      setFetchData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDropdownData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && event.target.id !== "toggle") {
        setToggle(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return { toggle, setToggle, fetchData };
};

export default useDropdown;
