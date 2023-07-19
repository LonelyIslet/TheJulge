"use client";

import {
  useState, useEffect, RefObject, useCallback,
} from "react";

interface IData {
  data: string[]
}

const useDropdown = (ref: RefObject<HTMLElement>, type: string) => {
  const [toggle, setToggle] = useState(false);
  const [fetchData, setFetchData] = useState<IData>();

  const getDropdownData = useCallback(async () => {
    try {
      let response;
      if (type === "address") {
        response = await fetch("/data/dropdownAddress.json");
      }
      if (type === "category") {
        response = await fetch("/data/dropdownShopCategory.json");
      }
      if (response && response.ok) {
        const data = await response.json() as IData;
        setFetchData(data);
      } else {
        throw new Error("데이터 통신 오류");
      }
    } catch (err) {
      console.error(err);
    }
  }, [type]);

  useEffect(() => {
    getDropdownData().catch((err) => { return console.error(err); });
  }, [getDropdownData]);

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
