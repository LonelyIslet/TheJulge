"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({
  className = "",
  placeholder = "",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/posts?q=${searchQuery}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
