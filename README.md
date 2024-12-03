# Firebase-login-signup
Login-Signup Application with Firebase, QR Code, and Rotational Tilt Card

Project Description

This project is a web application built using the MERN stack (MongoDB, Express, React, Node.js) with the following features:

Login/Signup using Firebase Authentication.

QR Code Generation for user profiles.

Logout functionality with MongoDB user data deletion.

Rotational Tilt Card effect based on mouse movement.

Fully responsive design and seamless user experience.



---

Features

1. User Authentication

Login and Signup functionality integrated with Firebase Authentication.

Users' data is securely stored in MongoDB with hashed passwords.


2. QR Code Generation

A unique QR Code is generated upon user signup.

The QR Code contains the user’s profile URL.

Users can scan the QR Code to view their profile details.


3. Logout

User data is deleted from MongoDB upon logout for better data management.


4. Rotational Tilt Card

A visually appealing card effect that tilts and rotates dynamically based on cursor movement.



---

Technologies Used

Frontend: React, CSS, Axios, GSAP (for animations)

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Firebase Authentication

QR Code: qrcode package

Hosting: Vercel (Frontend & Backend)



---

How to Run the Project Locally

Prerequisites

Node.js (v16+)

MongoDB installed locally or hosted on a cloud service (e.g., MongoDB Atlas)

Git

Firebase Project setup with Web App configuration


Steps

1. Clone the Repository

git clone https://github.com/YourUsername/YourRepo.git
cd YourRepo


2. Set Up Backend

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env file in the backend root directory:

PORT=3001
MONGO_URI=your_mongo_database_uri
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

Start the backend server:

npm start



3. Set Up Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Update any backend URLs in your frontend code (e.g., API calls).

Start the frontend development server:

npm start



4. Access the Application

Open your browser and go to http://localhost:3000.





---

Folder Structure

Root Directory
│
├── backend/
│   ├── controllers/        # Backend logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── .env                # Backend environment variables
│   ├── server.js           # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Login, Signup, Home pages
│   │   ├── App.js          # Main React app file
│   │   ├── firebase.js     # Firebase setup
│   └── .env                # Frontend environment variables
│
├── README.md


---

Usage Instructions

1. Signup: Create an account using your email and password.


2. Login: Access the app using valid credentials.


3. QR Code: View and scan the QR code generated for your profile.


4. Logout: Log out and delete user data from MongoDB.


5. Tilt Card: Hover over the card on the home page to see the tilt effect and it executes smooth transitions on mouse movements.This is achieved by  GSAP.




---

Deployment on Vercel

Frontend Deployment

1. Build the frontend:

npm run build


2. Deploy the frontend folder to Vercel.



Backend Deployment

1. Deploy the backend folder to Vercel.


2. Ensure CORS settings allow requests from the deployed frontend URL.




---

Future Enhancements

Add profile editing functionality.

Implement social login options (Google, Facebook).

Improve card animations for better performance.



