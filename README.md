# Todo List REST API

## Summary

This project implements a Todo List REST API using Node.js, Express, MongoDB, Mongoose, and TypeScript. It supports user authentication, CRUD operations on todo items, and includes a daily cron job that automatically marks expired todos as completed.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)  
- MongoDB (local or remote instance)  
- npm package manager  

## Postman Collection

A Postman collection for testing all the API endpoints is included in the repository.

To use it:

1. Open Postman.
2. Click **Import** in the top-left corner.
3. Choose **File** and select the `todo-list-backend.postman_collection.json` file located in the project root.
4. The collection will be imported and ready to use for testing the API endpoints.

Make sure the server is running locally (`npm run dev`) and the base URL matches the environment in Postman (`http://localhost:5000/v1/api`).

### Installation and Setup

Clone the repository, install dependencies, configure environment variables, and run the server:

```bash
git clone https://github.com/kevintank99/todo-list-backend.git
cd todo-list-backend
npm install

# Create .env file in project root with these contents:
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRES_IN=7d
VERSION=v1

# Ensure MongoDB is running locally or update MONGO_URI accordingly

# Start the development server
npm run dev



