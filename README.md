# Project and Task Manager Backend

## ⚙️ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/razanEmad/Project-and-Task-Manager-BackEnd.git
```
### Install dependencies
```bash
npm install
```
### Set up environment variables
Create a .env file in the root directory and add the following:
```bash
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```
### Run the server
```bash
node server.js
```

# 📡 API Endpoints

---

## 🔐 User Authentication

| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| POST   | `/users/register`  | Creates a new user account               |
| POST   | `/users/login`     | Authenticates user and returns JWT token |

---

## 🔖 Bookmarks (Requires Authentication)

> ⚠️ Add header: `Authorization: Bearer <token>`

| Method | Endpoint         | Description                         |
|--------|------------------|-------------------------------------|
| GET    | `/bookmarks`     | Get all bookmarks for the user      |
| POST   | `/bookmarks`     | Create a new bookmark               |
| GET    | `/bookmarks/:id` | Get a bookmark by ID               |
| PATCH  | `/bookmarks/:id` | Update bookmark details             |
| DELETE | `/bookmarks/:id` | Delete a bookmark                   |
