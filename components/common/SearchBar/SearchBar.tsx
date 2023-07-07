import Image from "next/image";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({
  className = "",
  placeholder = "",
}: SearchBarProps) => {
  return (
    <form className={`${styles.container} ${className}`}>
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
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
