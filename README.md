# Stack Overflow

This project is a Stack Overflow clone web application that allows users to post questions, answer questions, and view all questions and answers.

# Features
- User autentication with JWT (Json Web Tokens)
- Create, view, and answer questions
- View all questions and their answers

# Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- JWT for authentication
- EJS (Embedded JavaScript) for templating
- HTML/CSS/JavaScript
- Bootstrap 4

# Setup Instructions
To run this project locally, follow these teps:

## Prerequisites
- Node.js installed on your local machine.
- MongoDB installed and running locally or MongoDB Atlas account

## Installation
1. Clone the repository from GitHub

```
git clone https://github.com/AryanAAB/Stack-Overflow
```

2. Install dependencies

```
npm install
```

3. Set environment variables

Create a `.env` file in the root directory of the project and add the following variables

```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Replace <your-mongodb-uri> with your MongoDB connection string and <your-jwt-secret> with a strong secret for JWT.

4. Start the server

```
npm start
```

This will start the server at http://localhost:3000.

5. Access the application

Open your web browser and navigate to http://localhost:3000 to view the application.

# Usage
- User Registration: Click on "Sign Up" to create a new user account.
- User Login: After signing up, you can log in using your credentials.
- View All Questions: The home page (/) displays all questions and answers posted by users.
- Ask a Question: Logged-in users can post new questions.
- Answer a Question: Users can answer questions on the "All Questions" page.
