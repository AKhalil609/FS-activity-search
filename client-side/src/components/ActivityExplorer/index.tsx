import { useActivityContext } from '../../context/ActivityContext';
import { ActivityList } from '../ActivityList';
import { Header } from '../Header';
import { Pagination } from '../Pagination';
import { SearchBar } from '../SearchBar';
import { Notification } from '../Notification';
import './style.scss';

export const ActivityExplorer: React.FC = () => {
  const {
    activities,
    totalActivities,
    currentPage,
    loading,
    notification,
    handleSearch,
    handlePageChange,
    handleCloseNotification,
    search,
  } = useActivityContext();

  const totalPages = Math.ceil(totalActivities / 10);

  return (
    <div className="content-container">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main className="activities-container">
        {loading ? (
          <div className="loading">Loading activities...</div>
        ) : (
          <>
            {activities.length === 0 ? (
              <div className="no-activities">
                {totalActivities === 0 && !search.length
                  ? 'No activities found.'
                  : 'No activity titles match your search.'}
              </div>
            ) : (
              <>
                <ActivityList activities={activities} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>
      {notification && (
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};
