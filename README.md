# 📚 Novel Verse - Web Novel Platform (MERN Stack)

Novel Verse is a full-stack **MERN application** that allows users to explore novels, read chapters, and engage with the community through comments.  
This project is being built step by step as a learning and portfolio project.

---

## 🚀 Features Implemented

✅ **Authentication & User Management**  
- Integrated with **Clerk** for secure login/signup.  
- User sync with database.  

✅ **Novels**  
- Create novels with **title, description, and cover image** upload.  
- View novel details with chapter listing.  
- Only the **author** of a novel can upload new chapters.  

✅ **Chapters**  
- Add chapters with **title, number, and content**.  
- Upload a `.txt` file → automatically converted into chapter content.  
- Track **reader progress** (resume reading where you left off).  

✅ **Favorites**  
- Add/Remove novels from favorites.  
- View all favorites in dedicated **Favorites Page**.  

✅ **Comments**  
- Comment on **novels** and **chapters**.  
- Each comment linked with user identity (via Clerk).  

✅ **Reader Features**  
- Progress tracking per chapter.  
- Continue reading from last saved point.  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other Tools:** Clerk (Auth), Socket.io (planned for real-time features)
- **File Uploads**: Multer (for cover images, txt parsing for chapters)
- **AI Tools used**: Cursor ,TRAE , Zencoder

---

## Install dependencies

Front-end

```
cd client
npm install
```

Back-end
```
cd ../server
npm install
```


## Setup environment variables

Create a .env file inside server/ with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Run the project

Executing Front-end
```
cd client
npm run dev
```

Executing Back-end
```
cd server
npm start
```



