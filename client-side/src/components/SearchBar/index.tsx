import { useState } from 'react';
import './style.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <form className="search-bar" role="search">
      <input
        type="text"
        placeholder="Search activities..."
        value={query}
        onChange={handleChange}
        aria-label="Search activities"
      />
    </form>
  );
};
