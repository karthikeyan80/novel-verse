# 📚 Novel Verse - Web Novel Platform (MERN Stack)

Novel Verse is a full-stack **MERN application** that allows users to explore novels, read chapters, and engage with the community through comments.  
This project is being built step by step as a learning and portfolio project.

---

## 🚀 Features Implemented

- **User Authentication** (Clerk integration planned)
- **Novel Details Page**
  - Displays information about each novel
  - Fetches data dynamically from backend
- **Chapter Details Page**
  - Displays content of individual chapters
- **Comment System**
  - Users can add comments on **novels**
  - Comments are displayed under each novel
  - Backend API for storing and retrieving comments

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other Tools:** Clerk (Auth), Socket.io (planned for real-time features)

---

## Install dependencies

FRONT-END

cd client
npm install


BACK-END

cd ../server
npm install


---

## Setup environment variables

Create a .env file inside server/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string


## Run the project

RUN FRONT-END
cd client
npm run dev


RUN BACK-END
cd server
npm start



