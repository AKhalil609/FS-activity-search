# Activities Search Service

## Overview

This project is a web application that allows users to search for activities. It consists of a backend API built with NestJS and a frontend that consumes this API. The backend service reads data from JSON files, provides an API to fetch and search activities, and includes tests to ensure its functionality.

## Technologies

- **Backend**: NestJS
- **Testing**: Jest
- **Containerization**: Docker, Docker Compose

## Project Structure

```
└── 📁src
    └── 📁activities
        └── activities.controller.ts
        └── activities.module.ts
        └── activities.service.ts
        └── 📁test
            └── activities.controller.spec.ts
            └── activities.service.spec.ts
    └── app.module.ts
    └── 📁data
        └── activities.json
        └── suppliers.json
    └── 📁dto
        └── activity.dto.ts
        └── supplier.dto.ts
    └── main.ts
```

## Installation

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/activities-search.git
   cd activities-search
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Build and run the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Alternatively, you can run the application locally without Docker:

   ```bash
   yarn start:dev
   ```

## API Endpoints

### Get All Activities

- **URL**: /activities
- **Method**: GET
- **Response**: List of activities with supplier information

### Search Activities by Title

- **URL**: /activities/search
- **Method**: GET
- **Query Parameter**: title (string)
- **Response**: List of activities that match the search title

## Running Tests

### Unit and Integration Tests

To run the tests, use the following command:

```bash
yarn test
```

## Architectural Decisions

- **NestJS Framework**: Chosen for its modular architecture, ease of use, and scalability.
- **File-based Data Storage**: Using JSON files (`activities.json` and `suppliers.json`) for simplicity. This can be replaced with a database in a production environment.
- **Data Caching**: Data is loaded once during service initialization for simplicity and performance.
- **API Endpoints**: Two endpoints are provided:
  - `/activities`: Fetches all activities along with supplier information.
  - `/activities/search?title={title}`: Searches for activities by title.

## Assumptions

- **Static Data**: Activities and suppliers data are static and do not change frequently. In a real-world scenario, a database should be used.
- **Simplified Supplier Info**: Supplier information is embedded directly into the activity response for simplicity. This can be normalized in a more complex system.
- **Search Functionality**: The search functionality is case-insensitive and matches any part of the activity title.

## Future Improvements

- **Database Integration**: Replace JSON file storage with a database to handle dynamic data.
- **Advanced Search**: Implement more advanced search functionality, including filtering by price, rating, and special offers.
- **Pagination**: Add pagination to the API endpoints to handle large datasets.
- **Authentication**: Implement authentication and authorization for secure access to the API.
