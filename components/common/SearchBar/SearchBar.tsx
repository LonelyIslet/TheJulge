"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({
  className = "",
  placeholder = "",
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [searchQuery, setSearchQuery] = useState(keyword || "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/notices/?keyword=${searchQuery}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!keyword) {
      setSearchQuery("");
    }
  }, [keyword]);

  return (
    <form
      className={`${styles.container} ${className}`}
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
      />
      <div className={styles.icon}>
        <Image
          fill
          src="/images/search.svg"
          alt="Search Icon"
        />
      </div>
    </form>
  );
};

export default SearchBar;
