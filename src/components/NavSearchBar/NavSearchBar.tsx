import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", clearSearch);

    return () => {
      document.removeEventListener("click", clearSearch);
    };
  }, []);

  function handleSearch(e: any) {
    e.preventDefault();

    if (!searchTerm) {
      return;
    }

    navigate(`/search?search=${searchTerm}`);
    setSearchTerm("");
  }

  function clearSearch(e: any) {
    // clear the search term if the target is not the search bar
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setSearchTerm("");
    }
  }

  return (
    <div ref={searchBarRef}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NavSearchBar;
