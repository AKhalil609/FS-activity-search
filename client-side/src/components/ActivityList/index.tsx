import { Activity } from '../../services/activityService';
import './style.scss';

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <section className="activity-list">
      {activities.map(
        (
          { id, title, price, currency, rating, specialOffer, supplier },
          index
        ) => (
          <article
            key={id}
            className="activity"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3>{title}</h3>
            <p>
              Price: {price} {currency}
            </p>
            <p>Rating: {rating}</p>
            <p>Special Offer: {specialOffer ? 'Yes' : 'No'}</p>
            <p>Supplier: {supplier.name}</p>
            <p>
              Location: {supplier.address}, {supplier.city}, {supplier.zip},{' '}
              {supplier.country}
            </p>
          </article>
        )
      )}
    </section>
  );
};
