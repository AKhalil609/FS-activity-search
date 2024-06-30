import { render, screen, fireEvent } from '@testing-library/react';
import { Notification } from './';

describe('Notification', () => {
  it('renders the notification with the correct message', () => {
    const message = 'Test Notification';
    render(<Notification message={message} onClose={() => {}} />);
    expect(screen.getByText(/Test Notification/i)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Notification message="Test Notification" onClose={handleClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});
