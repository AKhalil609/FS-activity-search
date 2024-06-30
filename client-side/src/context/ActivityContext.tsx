import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import {
  getActivities,
  searchCachedActivities,
  Activity,
} from '../services/activityService';

interface ActivityContextProps {
  activities: Activity[];
  totalActivities: number;
  currentPage: number;
  loading: boolean;
  search: string;
  notification: string;
  backendAvailable: boolean;
  handleSearch: (query: string) => void;
  handlePageChange: (page: number) => void;
  handleCloseNotification: () => void;
}

const ActivityContext = createContext<ActivityContextProps | undefined>(
  undefined
);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalActivities, setTotalActivities] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [backendAvailable, setBackendAvailable] = useState<boolean>(true);

  const limit = 10;

  useEffect(() => {
    fetchActivities(currentPage, search);
  }, [currentPage]);

  const fetchActivities = async (page: number, search: string) => {
    setLoading(true);
    try {
      const { data, total } = await getActivities(page, limit, search);
      setActivities(data);
      setTotalActivities(total);
      setNotification('');
      setBackendAvailable(true);
    } catch (error) {
      handleFetchError(error);
      const cachedActivities = searchCachedActivities(search);
      setActivities(cachedActivities.slice((page - 1) * limit, page * limit));
      setTotalActivities(cachedActivities.length);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
    fetchActivities(1, query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (!backendAvailable) {
      const cachedActivities = searchCachedActivities(search);
      setActivities(cachedActivities.slice((page - 1) * limit, page * limit));
    }
  };

  const handleFetchError = (error: unknown) => {
    let message = 'An error occurred';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        message = `Error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        message = 'Unable to reach the server. Showing cached data.';
      } else {
        message = `Error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.error('Error fetching activities:', error);
    setNotification(message);
    setBackendAvailable(false);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        totalActivities,
        currentPage,
        loading,
        search,
        notification,
        backendAvailable,
        handleSearch,
        handlePageChange,
        handleCloseNotification,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = (): ActivityContextProps => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      'useActivityContext must be used within an ActivityProvider'
    );
  }
  return context;
};
