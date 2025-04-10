# Event Management

A comprehensive event management system with a React.js (Vite) frontend and a Node.js + Express backend, using MongoDB as the database. This project enables users to manage tasks and events efficiently with a modern dashboard interface.

---

## **Features**

### **Frontend**
- Built with **React.js** (Vite for fast development).
- Modern and responsive user interface.
- Dashboard for managing tasks and tracking events.
- Integration with backend APIs for dynamic data handling.

### **Backend**
- Developed using **Node.js** and **Express.js**.
- RESTful API for managing tasks and events.
- Secure and scalable with **MongoDB** as the database.
- Authentication and data validation implemented.

---

## **Live Links**

- **Live Preview:** [Event Management Dashboard](https://event-management-1-1nyc.onrender.com/dashboard)  
- **API Base URL:** [Event Management API](https://event-management-jmt5.onrender.com)  

---

## **Project Structure**

```
Event-Management/
├── frontend/                # Frontend codebase
│   ├── src/                 # React components, hooks, pages
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies and scripts
│
├── backend/                 # Backend codebase
│   ├── routes/              # API routes
│   ├── controllers/         # API controllers
│   ├── models/              # MongoDB models
│   ├── utils/               # Utility functions
│   └── package.json         # Backend dependencies and scripts
│
├── .gitignore               # Git ignored files
├── README.md                # Project documentation

```

---

## **Getting Started**

### **Prerequisites**
- **Node.js** and **npm/yarn** installed.
- **MongoDB** instance running locally or in the cloud.

### **Setup**

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/riteshh-thakur/Event-Management.git
   cd Event-management
   ```

2. **Install Dependencies:**  
   - For the frontend:  
     ```bash
     cd frontend
     npm install
     ```  
   - For the backend:  
     ```bash
     cd backend
     npm install
     ```

3. **Configure Environment Variables:**  
   - Create a `.env` file in the `backend` folder with the following:  
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     PORT=5000
     ```  

4. **Run the Application:**  
   - Start the backend server:  
     ```bash
     cd backend
     npm start
     ```  
   - Start the frontend development server:  
     ```bash
     cd frontend
     npm run dev
     ```  

5. **Access the Application:**  
   - Frontend: `http://localhost:5173`  
   - Backend API: `http://localhost:5000`  

---



---


---

## **Technologies Used**

- **Frontend:** React.js (Vite), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  

---

## **Contributing**

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add feature"
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature-name
   ```  
5. Create a pull request.  

---


---

## **Contact**

For any queries or feedback, feel free to reach out:  
- **GitHub Profile:** [Ritesh Thakur](https://github.com/riteshh-thakur)  
- **Email:** thakurritesh8219@gmail.com  
