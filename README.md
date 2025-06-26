# Real-Time Chat App

A full-stack real-time chat application built using the MERN Stack, Socket.IO, and JWT Authentication. Users can register, log in, and chat instantly with others in real-time.

## Tech Stack

**Frontend:**
- React.js
- Axios
- Socket.IO Client
- Tailwind CSS 

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO

## Features

- JWT-based user authentication
- Real-time messaging using WebSockets
- Chat with multiple users
- Online/offline user status
- Message persistence in MongoDB

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
git clone https://github.com/IshaanSammi/Chat.git  
cd Chat

### 2. Install Dependencies

Install backend dependencies:
cd backend  
npm install

Install frontend dependencies:
cd ../frontend  
npm install

### 3. Setup Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

### 4. Start the Application

Start the backend server:
cd backend  
npm run dev

Start the frontend application in a separate terminal:
cd frontend  
npm start

The application will be running on:  
- Frontend: http://localhost:3000  
- Backend: http://localhost:5000





