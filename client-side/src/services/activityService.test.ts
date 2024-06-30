import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getActivities,
  searchCachedActivities,
  __cache,
  __allCachedData,
} from './activityService';
import { mockGetActivitiesResponse, mockActivities } from '../mockData';
import { getConfig } from '../config';

const mock = new MockAdapter(axios);
const API_BASE_URL = getConfig().API_BASE_URL;

describe('activityService', () => {
  afterEach(() => {
    mock.reset();
    Object.keys(__cache).forEach((key) => delete __cache[key]);
    __allCachedData.clear();
  });

  it('should fetch activities from the backend', async () => {
    mock
      .onGet(`${API_BASE_URL}/activities`)
      .reply(200, mockGetActivitiesResponse);

    const response = await getActivities(1, 10, '');

    expect(response.data).toEqual(mockActivities);
    expect(response.total).toEqual(mockActivities.length);
  });

  it('should return cached activities if available and backend returns 304', async () => {
    const cacheKey = '1-10-';
    const cacheEntry = {
      data: { data: mockActivities, total: mockActivities.length },
      etag: '123',
    };
    __cache[cacheKey] = cacheEntry;

    mock.onGet(`${API_BASE_URL}/activities`).reply(304);

    const response = await getActivities(1, 10, '');

    expect(response.data).toEqual(mockActivities);
    expect(response.total).toEqual(mockActivities.length);
  });

  it('should return cached activities if backend is unreachable', async () => {
    const cacheKey = '1-10-';
    const cacheEntry = {
      data: { data: mockActivities, total: mockActivities.length },
      etag: '123',
    };
    __cache[cacheKey] = cacheEntry;

    mock.onGet(`${API_BASE_URL}/activities`).networkError();

    const response = await getActivities(1, 10, '');

    expect(response.data).toEqual(mockActivities);
    expect(response.total).toEqual(mockActivities.length);
  });

  it('should throw an error if backend is unreachable and no cache available', async () => {
    mock.onGet(`${API_BASE_URL}/activities`).networkError();

    await expect(getActivities(1, 10, '')).rejects.toThrow();
  });

  it('should search cached activities', () => {
    __allCachedData.set(mockActivities[0].id, mockActivities[0]);
    __allCachedData.set(mockActivities[1].id, mockActivities[1]);

    const searchQuery = 'Activity 1';
    const result = searchCachedActivities(searchQuery);

    expect(result).toEqual([mockActivities[0]]);
  });

  it('should return empty array if no cached activities match the search query', () => {
    __allCachedData.set(mockActivities[0].id, mockActivities[0]);
    __allCachedData.set(mockActivities[1].id, mockActivities[1]);

    const searchQuery = 'Non-existent Activity';
    const result = searchCachedActivities(searchQuery);

    expect(result).toEqual([]);
  });
});
