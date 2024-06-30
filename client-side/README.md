
# Activities Client

This project is the frontend for the Activities Search application, built with React and Vite, and served using Nginx. The application allows users to search for activities, displaying details such as title, price, rating, special offers, supplier name, and location.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Architecture Decisions](#architecture-decisions)
- [Features and Improvements](#features-and-improvements)
- [Assumptions](#assumptions)
- [Notes for Reviwer](#notes-for-reviewer)

## Setup and Installation

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd activities-client
   ```

2. Ensure you have Docker and Docker Compose installed.

3. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application at `http://localhost:3001`.

## Running the Application

To run the application independently using Docker Compose:

1. Navigate to the `activities-client` directory:
   ```bash
   cd activities-client
   ```

2. Use Docker Compose to build and run the application:
   ```bash
   docker-compose up --build
   ```

3. The application will be accessible at `http://localhost:3001`.

To stop the application, press `Ctrl+C` in the terminal where you ran the `docker-compose up` command, or run:
```bash
docker-compose down
```

## Architecture Decisions

### React and Vite

- **React**: Chosen for its component-based architecture, which promotes reusability and maintainability.
- **Vite**: Selected for its fast build times and modern development experience.

### State Management

- **React Context**: Utilized to manage the state across the application, allowing for efficient and scalable state management.
- **Custom Hooks**: Created to encapsulate logic for fetching and managing activities data, enhancing code readability and reuse.

### CSS and Styling

- **SCSS**: Used for styling to allow for nesting and variables, making the styles more maintainable and scalable.
- **Semantic HTML**: Ensured the use of semantic HTML elements to improve accessibility.

### Docker and Nginx

- **Docker**: Employed to containerize the application, ensuring consistent environments across different development and production setups.
- **Nginx**: Used to serve the static files, providing a robust and high-performance web server.

## Features and Improvements

### Implemented Features

- **Search Functionality**: Allows users to search for activities by title.
- **Pagination**: Implements pagination to handle large sets of activities.
- **Notifications**: Displays notifications for backend connectivity issues, enhancing user experience.
- **Caching**: Caches activities data to allow for client-side searches when the backend is unavailable.

### Improvements Left Out

- **Comprehensive Error Handling**: More detailed error handling and user feedback mechanisms could be implemented.
- **Advanced Filtering**: Additional filtering options (e.g., by price, rating, location) could be added to improve search functionality.
- **Unit and Integration Tests**: More extensive testing to ensure the reliability and stability of the application.
- **Error Handling and Edge Cases**: More fall backs incase somthing went wrong.

### Notes on Features

- **Notifications**: The notification system was implemented to handle backend connectivity issues gracefully. It ensures users are aware when the data might be stale due to backend unavailability.
- **Caching**: Caching was implemented to enhance performance and user experience, allowing users to continue searching through cached data when the backend is offline.

## Assumptions

- **Backend Availability**: It is assumed that the backend will be available most of the time. The caching mechanism is a fallback to handle temporary outages.
- **Data Consistency**: Assumes that activities data does not change frequently, making caching a viable solution for improving performance and availability.
- **Environment Variables**: Assumes environment variables are set up correctly for different environments (development, production).

## Conclusion

The `activities-client` project is designed to be a robust and scalable frontend application for searching activities. While several improvements could be made, the current implementation provides a solid foundation with a focus on performance, user experience, and maintainability.

## Notes for Reviewer

The filtering logic itself was added on both front-end (if the back-end server went down for some reason) and back-end (for scalability purposes), most of the work was done on the front-end side and for testing the filtering logic on just the front-end side load the page with both back-end and fron-end running and then disconnect the front-end this will use the filtering logic on only the front-end.