# CRUD API Implementation

## Description

This pull request implements a fully functional CRUD API using an in-memory database in accordance with the provided technical requirements. The application is built with TypeScript and supports both development and production modes. Additionally, it includes horizontal scaling with a load balancer, proper error handling, and API tests.

---

## Features Implemented

### Basic Scope

- **GET `/api/users`**: Retrieves all user records.
- **GET `/api/users/{userId}`**: Retrieves a user by their `userId`. Includes validation for invalid `uuid` and handles cases where the user does not exist.
- **POST `/api/users`**: Creates a new user. Validates the request body for required fields (`username`, `age`, `hobbies`).
- **PUT `/api/users/{userId}`**: Updates an existing user. Includes validation for `userId` and required fields in the request body.
- **DELETE `/api/users/{userId}`**: Deletes a user by their `userId`. Handles invalid `uuid` and non-existent users.
- **404 Handling**: Returns a friendly error message for requests to non-existent endpoints.
- **500 Error Handling**: Catches server-side errors and returns a friendly error message.

### Advanced Scope

- **TypeScript Implementation**: The application is fully written in TypeScript with strict type checking enabled.
- **Environment Configuration**: The application port is stored in a `.env` file.
- **Development Mode**: `start:dev` script runs the application in development mode using `ts-node-dev`.
- **Production Mode**: `start:prod` script builds and runs the application in production mode.

### Hacker Scope

- **Horizontal Scaling**: Implements horizontal scaling using the Node.js Cluster API with a load balancer. The load balancer distributes requests to worker instances in a round-robin fashion.
- **State Consistency**: Ensures a consistent in-memory database state across all worker instances.
- **API Tests**: Includes API tests for the following scenarios:
  1. Create a user, fetch it, update it, and delete it.
  2. Handle invalid `uuid` during user retrieval or deletion.
  3. Handle missing required fields in the request body during user creation or update.

---

## Changes Made

- **`src/app.ts`**: Configures the `express` application and exports it for reuse (e.g., testing or horizontal scaling).
- **`src/server.ts`**: Imports the `express` app from `app.ts` and starts the server.
- **`src/routes/userRoutes.ts`**: Defines all user-related routes (`GET`, `POST`, `PUT`, `DELETE`).
- **`src/controllers/userController.ts`**: Implements logic for handling user-related requests.
- **`src/models/userModel.ts`**: Defines the in-memory database and functions for CRUD operations.
- **`src/multiCluster.ts`**: Implements horizontal scaling with the Node.js Cluster API.
- **Tests**: Added test cases to validate API functionality.

---

## Instructions for Reviewers

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the `PORT` variable.
4. Run the application in development mode: `npm run start:dev`.
5. Run the application in production mode: `npm run start:prod`.
6. Run the horizontally scaled version: `npm run start:multi`.
7. Execute tests: `npm test`.

---

## Checklist

- [x] All CRUD API endpoints implemented and tested.
- [x] TypeScript strict mode enabled.
- [x] Error handling implemented for invalid inputs, non-existent resources, and server errors.
- [x] Horizontal scaling with Cluster API and load balancer.
- [x] API tests written for at least three scenarios.
- [x] Proper Git practices followed (separate development branch, clear commits, PR description).
