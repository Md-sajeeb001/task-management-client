# Task Management Application
### Short Description
A task management application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. The app ensures real-time synchronization and persistence of task data.

Live Link
You can view the live application here: Task Management App

Dependencies
The following dependencies are required to run this application:

Firebase Authentication
MongoDB
Express.js
Vite.js
React
react-beautiful-dnd (or any other drag-and-drop library)
WebSockets or MongoDB Change Streams for real-time updates
Swal (for alerts)
react-hook-form (for forms)

Installation Steps
Clone this repository:

git clone <repository-url>
Navigate to the project directory:


cd task-management-app
Install dependencies for both frontend and backend:

For frontend:


cd frontend
npm install
For backend:


cd backend
npm install
Set up your Firebase and MongoDB configurations in the respective environment files.

Run the development server for the frontend:


cd frontend
npm run dev
Start the backend server:


cd backend
npm run start
Your application should now be running locally. Visit http://localhost:3000 for the frontend and check the backend API at http://localhost:5000.

Technologies Used
Frontend:

Vite.js
React.js
react-beautiful-dnd (or any drag-and-drop library)
TailwindCSS (for styling)
Backend:

Node.js with Express.js
MongoDB for task storage
WebSockets / MongoDB Change Streams for real-time synchronization
Authentication:

Firebase Authentication (Google Sign-In)
Other Tools:

React Hook Form (for forms)
SweetAlert2 (for alerts)
