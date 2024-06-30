import React from 'react';
import './style.scss';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  onClose,
}) => {
  return (
    <aside className="notification" role="alert">
      <p>{message}</p>
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </aside>
  );
};
