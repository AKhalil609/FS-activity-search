import { render, screen } from '@testing-library/react';
import { ActivityList } from './';
import { mockActivities } from '../../mockData';

describe('ActivityList', () => {
  it('renders a list of activities', () => {
    render(<ActivityList activities={mockActivities} />);
    expect(screen.getByText(/Activity 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Activity 2/i)).toBeInTheDocument();
  });
});
