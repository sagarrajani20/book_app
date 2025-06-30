# Book Managment App

This project contains both the backend (Node.js/Express/MongoDB) and frontend (React/Next.js + Material UI) for a simple book management application.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on default port 27017)

---

## Backend Setup

1. Open a terminal and navigate to the `backend` folder:

    ```sh
    cd backend
    ```

2. Install backend dependencies:

    ```sh
    npm install
    ```

3. Make sure MongoDB is running locally.

4. Start the backend server:

    ```sh
    node server.js
    ```

   The backend will run at [http://localhost:5000](http://localhost:5000).

---

## Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:

    ```sh
    cd frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

   The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- The frontend communicates with the backend API at `http://localhost:5000/api/books`.

---

## API Endpoints

- `GET /api/books` — Get all books
- `POST /api/books` — Add a new book (`title`, `author`, `publishYear` in JSON body)
- `PUT /api/books/:id` — Update a book's title
- `DELETE /api/books/:id` — Delete a book

---

## Notes

- Make sure both backend and frontend servers are running.
- The backend must be running before using the
