# 📝 Notes API

A simple and secure **RESTful Notes API** built with **Node.js**, **Express**, and **MongoDB**.  
It allows users to register, log in, and manage their personal notes with full CRUD operations.  
Authentication is implemented using **JWT tokens stored in HTTP-only cookies** for security.

---

## 🚀 Features

- User signup, login and logout
- Secure password hashing using bcrypt
- JWT-based authentication (stored in cookies)
- Create, read, update & delete notes
- Protected routes with middleware
- Clean modular code structure

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Environment Management:** dotenv
- **Dev Tools:** nodemon

---

## 📁 Folder Structure

notes-api/
├── controllers/
│ ├── auth.controller.js
│ └── note.controller.js
├── models/
│ ├── user.model.js
│ └── note.model.js
├── routes/
│ ├── auth.route.js
│ └── note.route.js
├── middleware/
│ └── verifyJWT.js
├── lib/
│ └── utils.js
├── db/
│ └── index.js
├── .env
├── .env.sample
├── constants.js
├── server.js
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. 📦 Install Dependencies

```bash
npm install
```

### 2. 🛠️ Environment Variables

**Create a .env file in the root directory. You can refer to .env.sample:**

```
PORT=3000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000

```

### 3. 🚀 Run the Server
**For development with auto-reload:**

```

npm run dev

```

**Or for production:**
```
npm start

```

### ✅ Register

**POST /api/auth/signup**

Content-Type: application/json

{
  "name": "Shaqib",
  "email": "shaqib@example.com",
  "password": "123456"
}

### ✅ Login

**POST /api/v1/auth/login**

Content-Type: application/json

{
  "email": "shaqib@example.com",
  "password": "123456"
}


### ✅ Create Note

**POST /api/v1/notes**
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "title": "Meeting Notes",
  "content": "Discussed next quarter goals."
}


## 👨‍💻 Author
**Mohd Shaqib Raza**
---

## 📲 Connect with Me

<p align="left">
  <a href="https://github.com/IamMSR-01" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/mohd-shaqib-raza-4088aa310/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="https://leetcode.com/u/iammsr/" target="_blank">
    <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black" alt="LeetCode"/>
  </a>
</p>
