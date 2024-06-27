# Blogging Platform

This project is a simple blogging platform built using React (Vite) for the frontend, Node.js (Express) for the backend, and MSSQL for the database. The platform allows users to register, login, manage blog posts, and comment on posts.

![](https://raw.githubusercontent.com/arshadakl/assets/main/BLINK3.png?raw=true)

![](https://raw.githubusercontent.com/arshadakl/assets/main/BLINK1.png?raw=true)

## Features

### User Management
- User registration and login
- Display user profile information

### Blog Management
- Create, read, update, and delete blog posts
- Display a list of all blog posts
- Comment on blog posts

## Technologies Used

- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Database**: MSSQL

## Getting Started

### Prerequisites

- Node.js
- MSSQL Server

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/arshadakl/blogging-platform.git
    cd blogging-platform
    ```

2. **Backend Setup**:
    - Navigate to the `server` directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `server` directory and add the following:
      ```plaintext
      DB_USER=USER
      DB_PASSWORD=YOUR_PASSWORD
      DB_SERVER=YOUR.database.windows.net
      DB_DATABASE=blog
      JWT_SECRET=your_SECRET
      PORT=5000
      CLOUDINARY_NAME=CLOUDINARY
      CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
      CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
      ```

3. **Frontend Setup**:
    - Navigate to the `client` directory:
      ```bash
      cd ../client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `client` directory and add the following:
      ```plaintext
      VITE_BASE_API_URL=http://localhost:5000
      ```

### Running the Application

1. **Start the Backend Server**:
    - From the `server` directory, run:
      ```bash
      npm start
      ```

2. **Start the Frontend**:
    - From the `client` directory, run:
      ```bash
      npm run dev
      ```

### Database Setup

- Create the database schema by running the provided SQL scripts located in the `db` directory.
- Ensure the MSSQL server is running and accessible using the credentials provided in the `.env` file.

## API Documentation

### User Endpoints

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Get Profile**: `GET /api/users/profile`

### Blog Post Endpoints

- **Create Post**: `POST /api/posts`
- **Get All Posts**: `GET /api/posts`
- **Get Post by ID**: `GET /api/posts/:id`
- **Update Post**: `PUT /api/posts/:id`
- **Delete Post**: `DELETE /api/posts/:id`

### Comment Endpoints

- **Add Comment**: `POST /api/posts/:postId/comments`
- **Get Comments**: `GET /api/posts/:postId/comments`

## Database Schema

### Users Table
- `userID`: Primary Key
- `username`
- `email`
- `password`
- `created_at`

### Blog Posts Table
- `postID`: Primary Key
- `userID`: Foreign Key
- `title`
- `content`
- `created_at`
- `updated_at`

### Comments Table
- `commentID`: Primary Key
- `postID`: Foreign Key
- `userID`: Foreign Key
- `content`
- `created_at`


For any questions or issues, please open an issue on GitHub or contact me directly.

