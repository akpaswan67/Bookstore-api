
# 📚 Bookstore REST API

A complete RESTful API built with **Node.js** and **Express** that manages a bookstore with **JWT-based authentication** and **file-based data persistence**.

---

## Features

- ✅ User Registration & Login (with JWT)
- 📦 CRUD operations on Books
- 🔐 Only authenticated users can manage books
- 🧠 Only the book creator can update/delete their book
- 📁 Data is persisted using JSON files (`fs.promises`)
- 🧪 MVC architecture (Models, Controllers, Routes)
- 🪵 Logging middleware
- 📤 Error handling middleware

---

## 🗂️ Folder Structure

```
bookstore-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── data/
├── .env
├── app.js
├── package.json
├── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/akpaswan67/Bookstore-api.git
cd bookstore-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variable

Create a `.env` file in root with:

```
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server

```bash
node app.js
```

Server runs at: [http://localhost:3000](http://localhost:3000)

---

## 📋 API Endpoints

### ✅ Auth Routes

| Method | Route        | Description               |
|--------|--------------|---------------------------|
| POST   | `/api/register` | Register a new user        |
| POST   | `/api/login`    | Login and get JWT token    |

---

### 📚 Book Routes *(Require JWT Token)*

All routes require:
```
Authorization: Bearer <token>
```

| Method | Route            | Description             |
|--------|------------------|-------------------------|
| GET    | `/api/books`     | Get all books           |
| GET    | `/api/books/:id` | Get book by ID          |
| POST   | `/api/books`     | Create new book         |
| PUT    | `/api/books/:id` | Update book (own only)  |
| DELETE | `/api/books/:id` | Delete book (own only)  |

---

## 🧪 Sample Book Object

```json
{
  "id": "uuid",
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988,
  "userId": "user-id"
}
```

---

## 🛠️ Technologies Used

- Node.js
- Express
- JWT (`jsonwebtoken`)
- Bcrypt for password hashing
- UUID for unique book IDs
- File system (`fs.promises`) for data persistence
- dotenv

---

## 📫 How to Test

Use Postman or curl:

### 1. Register

```
POST /api/register
{
  "email": "test@example.com",
  "password": "123456"
}
```

### 2. Login

```
POST /api/login
{
  "email": "test@example.com",
  "password": "123456"
}
```

Get `token` in response.

### 3. Use Token to Create Book

```
POST /api/books
Headers: Authorization: Bearer <token>
Body:
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "publishedYear": 1949
}
```

---

## 📘 License

This project is open-source and free to use.
