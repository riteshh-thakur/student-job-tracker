# 🧑‍🎓 Student Job Tracker
A full-stack application to help students track job applications, internships, and interview progress. Built with a modern React.js (Vite) frontend and a robust Node.js + Express backend, using MongoDB as the database. This platform helps students stay organized with a clean dashboard and dynamic tracking tools.

# 🚀 Features
🎨 Frontend
Built with React.js and Vite for fast development.

Clean, responsive dashboard to view and manage job applications.

Features include sorting by date, filtering by company or role, and status updates.

Integrated with backend APIs for real-time data sync.

🛠️ Backend
Developed using Node.js and Express.js.

RESTful API to handle job entries, updates, and deletion.

Uses MongoDB for data persistence and scalability.

Includes authentication and data validation for secure access.

# 🗂️ Project Structure

Student-Job-Tracker/
├── frontend/                # Frontend codebase
│   ├── src/                 # React components, pages, hooks
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Backend codebase
│   ├── routes/              # Express routes for jobs and auth
│   ├── controllers/         # API logic for job handling
│   ├── models/              # MongoDB schemas (Job, User)
│   ├── utils/               # Utility functions and middleware
│   └── package.json         # Backend dependencies
│
├── .gitignore               # Ignored files
├── README.md                # Project documentation
⚙️ Getting Started
📦 Prerequisites
Node.js and npm (or yarn) installed

A running MongoDB instance (local or cloud)

# 🧪 Setup Steps
Clone the Repository:


git clone https://github.com/riteshh-thakur/student-job-tracker.git
cd student-job-tracker
Install Dependencies:

# Frontend:


cd frontend
npm install
Backend:


cd backend
npm install
Environment Configuration: In backend/, create a .env file:

env

MONGO_URI=<your-mongodb-uri>
PORT=5000
Run the App:

Start backend:


cd backend
npm start
Start frontend:


cd frontend
npm run dev
View in Browser:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

# 🛠 Tech Stack
Frontend: React.js (Vite), Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB


📬 Contact
For queries or suggestions, feel free to reach out:

🔗 GitHub: Ritesh Thakur

📧 Email: thakurritesh8219@gmail.com
