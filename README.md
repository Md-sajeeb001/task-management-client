# 📝 Task Management Application  

A simple and efficient task management app that allows users to **add, edit, delete, and reorder tasks** using a **drag-and-drop interface**. Tasks are categorized into **To-Do, In Progress, and Done**, with real-time updates stored in a database for persistence.  

🚀 **Live Demo**: [Task Management App](https://task-management-b0fbe.web.app)  

---

## 📌 Features  

✅ **User Authentication** – Only authenticated users can access the app (Google Sign-In via Firebase).  
✅ **Task Management** – Add, edit, delete, and reorder tasks within three categories: **To-Do, In Progress, and Done**.  
✅ **Drag-and-Drop** – Move tasks between categories and reorder them within a category.  
✅ **Real-Time Sync** – Changes are saved instantly using **MongoDB, WebSockets, or Optimistic UI Updates**.  
✅ **Modern UI** – Clean, minimalistic, and fully responsive design for **desktop & mobile**.  

---

## 🛠 Technologies Used  

### **Frontend**  
- ⚡ [Vite.js](https://vitejs.dev/) + [React.js](https://react.dev/)  
- 🎨 [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) (for drag-and-drop)  
- 📱 Responsive design with a **maximum of four colors** for a clean look  

### **Backend**  
- 🖥 [Express.js](https://expressjs.com/) (Node.js framework)  
- 🗄 [MongoDB](https://www.mongodb.com/) (database for task storage)  
- 🔄 Real-time updates via **MongoDB Change Streams, WebSockets, or Optimistic UI**  

### **Authentication & Hosting**  
- 🔐 [Firebase Authentication](https://firebase.google.com/) (Google Sign-In)  
- ☁️ Hosted on **Firebase**  

---

## 📦 Dependencies  

Make sure you have the following installed before running the project:  

- **Node.js** (v14 or later)  
- **MongoDB** (local or cloud instance)  
- **Firebase account** (for authentication)  

Key npm dependencies used:  
- `react`  
- `vite`  
- `express`  
- `mongoose`  
- `firebase`  
- `react-beautiful-dnd`  

---

## ⚙️ Installation Steps  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
2️⃣ Install Dependencies
Frontend

cd client
npm install
Backend

cd server
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the server folder and add:

env

MONGO_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
4️⃣ Start the Development Servers
Backend

cd server
npm run dev
Frontend

cd client
npm run dev
5️⃣ Open the App
Go to http://localhost:5173/ in your browser.
