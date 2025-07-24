# Upskilling Portal

## Problem Statement

In today's world, many communities need a platform to become self-reliant and enhance their skills, where they can share their information, request support as needed, and allow administrators to analyze data at a higher level. This project is built with the following objectives:
- Collect information from community members
- Understand their needs and skills
- Provide analytics and reporting tools for administrators

## Project Overview

This is a full-stack web application based on the MERN stack (MongoDB, Express.js, React.js, Node.js) with two main parts:
- **User Form:** Anyone can fill in their personal, educational, skill, and support-related information.
- **Admin Dashboard:** After admin login, all entries can be viewed, data can be analyzed (such as skills, gender, etc.), and CSV reports can be downloaded.

## Key Features

- **Frontend:** React.js based, attractive UI, form validation, notifications
- **Backend:** Express.js REST API, data stored in MongoDB, security via JWT and Basic Auth
- **Admin Dashboard:** Data visualization (charts), CSV export, access restricted to admin
- **Form Fields:** Name, Date of Birth, Gender, Contact, Address, Education, Skills, Digital Literacy, Emergency Contact, etc.

## Installation Guide

### Prerequisites
- Node.js (v14+)
- npm (Node Package Manager)
- MongoDB (local or cloud)

### 1. Clone the repository
```bash
git clone https://github.com/yuvrajsingh2428/Simple-form.git
cd simple-form
```

### 2. Server Setup
```bash
cd server
npm install
```
- Create a `.env` file and add your MongoDB URI and JWT_SECRET:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=your_jwt_secret
```
- Start the server:
```bash
npm start
```

### 3. Client Setup
```bash
cd ../client
npm install
npm start
```
- After starting the React app, open in your browser: [http://localhost:3000](http://localhost:3000)

## Usage Guide

### For Users
1. Go to the homepage and click on "Fill Form".
2. Fill in all the required information and submit.
3. You will receive a notification upon successful submission.

### For Admin
1. On the homepage, click on "Admin Login".
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`
3. After login, in the dashboard:
   - View all user entries
   - See charts for skills, gender, etc.
   - Download data as CSV

## API Routes

- POST `/api/login` — Admin login (email, password)
- POST `/api/data` — Form submission (public)
- GET `/api/data` — All entries (admin only)
- GET `/api/data/export` — Download CSV (admin only)

## Security
- Basic Auth is enforced on admin routes (admin/admin123)
- JWT-based login is also available (User model)

## Contributing
- Pull requests are welcome!
- Please open an issue for suggestions or bugs.

## License
MIT

---

**This project is for empowering communities — contribute, share, and grow together!** 
