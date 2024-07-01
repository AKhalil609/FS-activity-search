import { useState } from 'react';
import './style.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  currentSearchTerm?: string;
}

export const SearchBar = ({ onSearch, currentSearchTerm }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleClearFilter = () => {
    onSearch('');
  };

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search activities..."
          value={query}
          onChange={handleChange}
          aria-label="Search activities"
        />
        {query && (
          <button type="button" onClick={handleClear} aria-label="Clear input">
            Clear
          </button>
        )}
        <button type="submit">Search</button>
      </div>

      {currentSearchTerm && (
        <div className="search-term-indicator-container">
          <div className="search-term-indicator">
            Showing results for: <strong>{currentSearchTerm}</strong>
          </div>
          <button
            type="button"
            onClick={handleClearFilter}
            aria-label="Clear filter"
          >
            Reset
          </button>
        </div>
      )}
    </form>
  );
};
