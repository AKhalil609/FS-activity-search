import { render, screen } from '@testing-library/react';
import { Header } from './';

describe('Header', () => {
  it('renders the header with the correct title', () => {
    render(<Header />);
    expect(screen.getByText(/Activity Explorer/i)).toBeInTheDocument();
  });
});
