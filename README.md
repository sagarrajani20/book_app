# Book App Backend

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on default port 27017)

## Installation

1. Open a terminal and navigate to this `backend` folder:

    ```sh
    cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Running the Server

1. Make sure MongoDB is running locally.

2. Start the server:

    ```sh
    node server.js
    ```

    The server will start on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- `GET /api/books` — Get all books
- `POST /api/books` — Add a new book (`title`, `author`, `publishYear` in JSON body)
- `PUT /api/books/:id` — Update a book's title
- `DELETE /api/books/:id` — Delete a book
