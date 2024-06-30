import axios from 'axios';
import { getConfig } from '../config';

export interface Activity {
  id: number;
  title: string;
  price: number;
  currency: string;
  rating: number;
  specialOffer: boolean;
  supplier: {
    id: number;
    address: string;
    name: string;
    city: string;
    country: string;
    zip: string;
  };
}

interface GetActivitiesResponse {
  data: Activity[];
  total: number;
}

interface CacheEntry {
  data: GetActivitiesResponse;
  etag: string;
}

const cache: { [key: string]: CacheEntry } = {};
const allCachedData = new Map<number, Activity>();

const buildCacheKey = (page: number, limit: number, search: string): string => {
  return `${page}-${limit}-${search}`;
};

const addToAllCachedData = (activities: Activity[]) => {
  activities.forEach((activity) => {
    allCachedData.set(activity.id, activity);
  });
};

export const getActivities = async (
  page: number,
  limit: number,
  search: string
): Promise<GetActivitiesResponse> => {
  const cacheKey = buildCacheKey(page, limit, search);
  const cacheEntry = cache[cacheKey];

  if (cacheEntry) {
    try {
      const response = await axios.get<GetActivitiesResponse>(
        `${getConfig().API_BASE_URL}/activities`,
        {
          params: { page, limit, search },
          headers: { 'If-None-Match': cacheEntry.etag },
          validateStatus: (status) => status === 200 || status === 304,
        }
      );

      if (response.status === 304) {
        return cacheEntry.data;
      }

      const etag = response.headers['etag'];
      if (etag) {
        cache[cacheKey] = {
          data: response.data,
          etag,
        };
      }

      addToAllCachedData(response.data.data);

      return response.data;
    } catch (error) {
      if (cacheEntry) {
        return cacheEntry.data;
      }
      throw error;
    }
  } else {
    try {
      const response = await axios.get<GetActivitiesResponse>(
        `${getConfig().API_BASE_URL}/activities`,
        {
          params: { page, limit, search },
        }
      );

      const etag = response.headers['etag'];
      if (etag) {
        cache[cacheKey] = {
          data: response.data,
          etag,
        };
      }

      addToAllCachedData(response.data.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const searchCachedActivities = (search: string): Activity[] => {
  return Array.from(allCachedData.values()).filter((activity) =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );
};

// Export cache and allCachedData for testing purposes
export const __cache = cache;
export const __allCachedData = allCachedData;
