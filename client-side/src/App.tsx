import { ActivityProvider } from './context/ActivityContext';
import './App.scss';
import { ActivityExplorer } from './components/ActivityExplorer';

export const App = () => {
  return (
    <ActivityProvider>
      <ActivityExplorer />
    </ActivityProvider>
  );
};
