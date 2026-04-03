function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrap">
      <input
        type="text"
        placeholder="Search a seafood recipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;