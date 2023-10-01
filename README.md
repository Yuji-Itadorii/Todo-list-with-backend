# Todo List Web Application with User Authentication

This project is a Todo List web application with user authentication features. Users can sign up for an account, log in, and manage their tasks. Instead of using a backend server and database, local storage is used to simulate user accounts.

## Assignment Description

In this assignment, you will create a Todo List web application with user authentication features. Users should be able to sign up for an account, log in, and manage their tasks. Instead of a backend server and database, you can use local storage to simulate user accounts.

### Requirements

1. **User Authentication**
   - Implement user registration (signup) and login functionality.
   - Users can sign up with a username and password.
   - Users can log in with their credentials.
   - Use forms for both registration and login.

2. **Authentication State**
   - Manage user authentication state using React state.
   - Implement protected routes to ensure that only authenticated users can access certain parts of the application (e.g., the todo list).

3. **Task Management**
   - Users can create, mark as completed, and delete tasks.
   - Tasks are associated with the logged-in user.
   - Tasks persist in local storage, so they are not lost on page refresh.

4. **Logout**
   - Implemented a logout button that allows users to log out of their accounts.

5. **User Interface**
   - Created an intuitive user interface with a clean design for both the authentication and todo list parts of the application.
   - Display a list of tasks, each with options to mark as completed, and delete.

6. **Error Handling**
   - Provide user-friendly error messages for scenarios such as incorrect login credentials, registration errors, or failed task updates.

### Security Considerations

7. **User-Specific Data**
   - Ensure that each user can only see and manage their own tasks after logging in.
   - Tasks should be associated with the user who created them.

### Database Integration

- If you want to take it a step further, integrated a backend server and database (e.g., Node.js with Express and MongoDB) to store user accounts and tasks securely.
- Implement API endpoints for user registration, login, and task management.

## Project Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository_url>
   cd project-directory

## Install dependencies (frontend)

npm install

npm run dev

If you are using a backend server, follow the instructions provided in the backend's README to set it up and connect it to the frontend.

## Configure the backend

npm install

node server.js

note:- before runnig the server add a config.env file in config folder of backend and add the mongodb URL 


