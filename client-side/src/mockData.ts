import { Activity } from './services/activityService';

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: 'Activity 1',
    price: 100,
    currency: '$',
    rating: 4.5,
    specialOffer: false,
    supplier: {
      id: 1,
      name: 'Supplier 1',
      address: '123 Main St',
      city: 'City 1',
      country: 'Country 1',
      zip: '12345',
    },
  },
  {
    id: 2,
    title: 'Activity 2',
    price: 200,
    currency: '$',
    rating: 4.0,
    specialOffer: true,
    supplier: {
      id: 2,
      name: 'Supplier 2',
      address: '456 Main St',
      city: 'City 2',
      country: 'Country 2',
      zip: '67890',
    },
  },
];

export const mockGetActivitiesResponse = {
  data: mockActivities,
  total: mockActivities.length,
};
