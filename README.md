
# Activities Search Application

## Overview

This project is a web application that allows users to search for activities. It consists of a backend API built with NestJS and a frontend built with React and Vite. The backend service reads data from JSON files, provides an API to fetch and search activities, and includes tests to ensure its functionality. The frontend consumes this API and implements additional filtering logic for cached data when the backend is unavailable.

## Technologies

- **Backend**: NestJS
- **Frontend**: React, Vite
- **Testing**: Jest
- **Containerization**: Docker, Docker Compose

## Project Structure

```
activities-search-application
├── 📁client-side
│   └── Dockerfile
│   └── docker-compose.yml
│   └── 📁src
│       └── ...
├── 📁server-side
│   └── Dockerfile
│   └── docker-compose.yml
│   └── 📁src
│       └── ...
├── docker-compose.yml
```

## Installation

### Steps

1. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The backend API will be accessible at `http://localhost:3000` and the frontend will be accessible at `http://localhost:3001`.

## Architectural Decisions

### Backend (NestJS)

- **NestJS Framework**: Chosen for its modular architecture, ease of use, and scalability.
- **File-based Data Storage**: Using JSON files (`activities.json` and `suppliers.json`) for simplicity. This can be replaced with a database in a production environment.
- **ETags for Caching**: Implemented ETags to ensure efficient caching and reduce unnecessary data transfer.
- **API Endpoints**: 
  - `/activities`: Fetches all activities along with supplier information.
  - `/activities?search={search}&page={page}&limit={limit}`: Searches for activities by title with pagination support.

### Frontend (React and Vite)

- **React and Vite**: Chosen for their fast development experience and modern tooling.
- **State Management**: Used React Context for state management.
- **Search Logic**: Implements client-side search logic to filter cached data when the backend is disconnected.

## Assumptions

- **Static Data**: Activities and suppliers data are static or do not change frequently.
- **Simplified Supplier Info**: Supplier information is embedded directly into the activity response for simplicity. This can be normalized in a more complex system.
- **Search Functionality**: The search functionality is case-insensitive and matches any part of the activity title.
- **Backend Availability**: Assumes that the backend will be available most of the time. The caching mechanism is a fallback to handle temporary outages.

## Running Tests

### Backend Tests

To run the tests for the backend service, use the following command:

```bash
cd server-side
yarn test
```

### Frontend Tests

To run the tests for the frontend, use the following command:

```bash
cd client-side
yarn test
```

## For Reviewer 

Most of the work is done on the front-end side since the position is more front-end foucsed for the filtering logic it works on both back-end and front-end (it works with the back-end by default and it falls back to the front-end in case of a disconnection and uses the cached data to search)

## Some Future Improvements

- **Advanced Search**: Implement more advanced search functionality, including filtering by price, rating, and special offers.
- **Improved Error Handling**: More comprehensive error handling.
- **Testing**: More test coverage.
- **Responsiveness**: The UI is usable and responsive on all screens, however not the best UX so this can be improved.