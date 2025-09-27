# Fullstack Task Manager (MERN)

# Overview

Introducing TickTock, our cutting-edge timesheet web application designed to revolutionize how you manage employees work hours. With ticktock you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.

###

## **User Features:**

1. **Task Interaction:**

   - Create new tasks.
   - Update, Delete task status.
   - View detailed task information.
   - Edit and update task details.
   - Delete tasks.
   - Log time spent on tasks.
   - Weekly Summary on tasks.
   - Tasks Filtered by start and end date.
   - Searching data by performing check on project name.

2. **Communication:**
   - Add comments or chat to task activities.

## **General Features:**

1. **Authentication and Authorization:**

   - User login with secure authentication.

2. **Profile Management:**

   - Update user profiles.

3. **Password Management:**
   - Change passwords securely.

## **Technologies Used:**

- **Frontend:**

  - React (Vite)
  - Redux Toolkit for State Management
  - Tailwind CSS

- **Backend:**
  - Node.js with Express.js
- **Database:**
  - MongoDB for efficient and scalable data storage.

&nbsp;

## SETUP INSTRUCTIONS

# Server Setup

## Environment variables

First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

- MONGODB_URI = `your MongoDB URL`
- JWT_SECRET = `any secret key - must be secured`
- PORT = `8000` or any port number
- NODE_ENV = `development`

&nbsp;

## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:

   - Log in to your MongoDB Atlas account.
   - Create a New Cluster
   - Choose a Cloud Provider and Region
   - Configure Cluster Settings
   - Create Database User
   - Connect to Cluster
   - Configure Your Application
   - Test the Connection

2. Create a new database and configure the `.env` file with the MongoDB connection URL.

## Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd server`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm start` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

# Client Side Setup

## Environment variables

First, create the environment variables file `.env` in the client folder. The `.env` file contains the following environment variables:

- VITE_APP_BASE_URL = `http://localhost:8000` #Note: Change the port 8000 to your port number.

## Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

&nbsp;

## Demo Link:

- https://timesheet-management-vozv.onrender.com
