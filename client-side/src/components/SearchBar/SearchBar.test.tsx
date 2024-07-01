import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './';

describe('SearchBar', () => {
  it('calls onSearch when the input value changes', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(/Search activities/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('search'));
    expect(handleSearch).toHaveBeenCalledWith('test');
  });

  it('clears the input when the clear button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(/Search activities/i);
    fireEvent.change(input, { target: { value: 'test' } });
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('calls onSearch with an empty string when the reset button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} currentSearchTerm="test" />);
    const resetButton = screen.getByRole('button', { name: /Clear filter/i });
    fireEvent.click(resetButton);
    expect(handleSearch).toHaveBeenCalledWith('');
  });

  it('shows the current search term indicator', () => {
    render(<SearchBar onSearch={() => {}} currentSearchTerm="test" />);
    const searchTermIndicator = screen.getByText((_content, element) => {
      return element?.textContent === 'Showing results for: test';
    });
    expect(searchTermIndicator).toBeInTheDocument();
  });
});
