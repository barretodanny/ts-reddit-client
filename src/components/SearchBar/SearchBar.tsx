import { useState } from "react";
import { Subreddit } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  subreddit: Subreddit;
}

function SearchBar({ subreddit }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function handleSearch(e: any) {
    e.preventDefault();

    if (!searchTerm) {
      return;
    }

    navigate(`/r/${subreddit.name}/search?search=${searchTerm}`);
    setSearchTerm("");
  }

  return (
    <div className={styles.container}>
      <AiOutlineSearch size={20} />
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
      </form>
    </div>
  );
}

export default SearchBar;
