
# 🚀 TaskFlow — Full-Stack MERN Task Manager

A modern task management application built with:

- **React + TailwindCSS (Vite)**
- **Node.js / Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Axios API Client**

TaskFlow provides clean UI, real authentication, and full CRUD for tasks.

---

## 🏗️ Project Structure

```
taskflow/
│
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── app.js
│   │   ├── config/db.js
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api/
│   │   ├── views/
│   │   ├── components/
│   │   └── contexts/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```
cd backend
npm install
```

### 2️⃣ Add `.env`
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=your_secret_here
```

### 3️⃣ Start backend
```
npm run dev
```

---

## 🎨 Frontend Setup

### 1️⃣ Install dependencies
```
cd frontend
npm install
```

### 2️⃣ Start frontend
```
npm run dev
```

---

## 🔐 Authentication

- Full JWT login system  
- Register + Login UI  
- Token stored in localStorage  
- Axios interceptor adds token to every request  

---

## 📝 Task API Routes

### Create Task
```
POST /api/tasks
```

### Get Tasks
```
GET /api/tasks
```

### Update Task
```
PUT /api/tasks/:id
```

### Delete Task
```
DELETE /api/tasks/:id
```

---

## 🌐 Frontend Features

- Authentication (Login + Register)
- Add, update, delete tasks
- Search + filter tasks
- Task statistics section
- Responsive interface
- Modern UI using TailwindCSS

---

## 💡 Tech Stack

### Frontend  
React, Vite, TailwindCSS, Axios, Lucide Icons

### Backend  
Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## 🐞 Common Errors & Fixes

| Issue | Fix |
|------|-----|
| `ECONNREFUSED ::1:27017` | Use `127.0.0.1` instead of `localhost` in MONGO_URI |
| `CastError: Cast to ObjectId failed` | Ensure frontend sends proper `_id` |
| 401 Unauthorized | Check JWT + Axios interceptor |

---

## 🤝 Contributing

Feel free to open issues or pull requests!

---

## ⭐ Support

If you like this project, **give it a star on GitHub**!
