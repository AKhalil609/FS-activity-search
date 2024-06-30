import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './';

describe('activityService', () => {
  it('calls onSearch when the input value changes', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(/Search activities/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleSearch).toHaveBeenCalledWith('test');
  });
});
