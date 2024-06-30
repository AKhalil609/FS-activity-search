import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ActivityProvider } from '../../context/ActivityContext';
import { ActivityExplorer } from './';
import { getActivities } from '../../services/activityService';
import { mockGetActivitiesResponse } from '../../mockData';

jest.mock('../../services/activityService');

jest.mock('../../config', () => ({
  __esModule: true,
  default: () => ({
    API_BASE_URL: 'http://localhost:3000',
  }),
}));

const mockedGetActivities = getActivities as jest.MockedFunction<
  typeof getActivities
>;

mockedGetActivities.mockImplementation((_page, _limit, search) => {
  if (search === 'Non-existent Activity') {
    return Promise.resolve({ data: [], total: 0 });
  }
  return Promise.resolve(mockGetActivitiesResponse);
});

describe('ActivityExplorer', () => {
  it('renders the activity explorer with activities', async () => {
    render(
      <ActivityProvider>
        <ActivityExplorer />
      </ActivityProvider>
    );

    expect(
      screen.getByPlaceholderText(/Search activities/i)
    ).toBeInTheDocument();

    expect(await screen.findByText(/Activity 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Activity 2/i)).toBeInTheDocument();
  });

  it('shows no activities message when there are no activities', async () => {
    mockedGetActivities.mockResolvedValueOnce({ data: [], total: 0 });

    render(
      <ActivityProvider>
        <ActivityExplorer />
      </ActivityProvider>
    );

    expect(await screen.findByText(/No activities found/i)).toBeInTheDocument();
  });

  it('shows no activity titles message when there are activities but no matches', async () => {
    render(
      <ActivityProvider>
        <ActivityExplorer />
      </ActivityProvider>
    );

    const input = screen.getByPlaceholderText(/Search activities/i);
    fireEvent.change(input, { target: { value: 'Non-existent Activity' } });

    await waitFor(() => {
      expect(
        screen.getByText(/No activity titles match your search/i)
      ).toBeInTheDocument();
    });
  });
});
