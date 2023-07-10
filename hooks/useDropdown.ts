"use client";

import { useState, useEffect, RefObject } from "react";

interface Data {
  data: string[]
}

const useDropdown = (ref: RefObject<HTMLElement>, category: string) => {
  const [toggle, setToggle] = useState(false);
  const [fetchData, setFetchData] = useState<Data>();

  const getDropdownData = async () => {
    try {
      let response;
      if (category === "location") {
        response = await fetch("/data/dropdownLocation.json");
      }
      if (category === "shop") {
        response = await fetch("/data/dropdownShopCategory.json");
      }
      if (response && response.ok) {
        const data = await response.json() as Data;
        setFetchData(data);
      } else {
        throw new Error("Error fetching dropdown data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDropdownData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)
      && (event.target as HTMLElement).id !== "toggle") {
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
