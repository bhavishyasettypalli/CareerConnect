# 🚀 CareerConnect — Student Job Portal

CareerConnect is a student-focused job portal that helps students explore internships and entry-level job opportunities, search for suitable jobs, save favorites, and submit job applications.

## ✨ Features

- View job listings from the backend API
- Search jobs by title, company, and skills
- Filter jobs by location and job type
- Save and unsave favorite jobs
- Apply for jobs using name and email
- Validate required application fields on the backend
- Retrieve individual job details
- Store submitted applications in a JSON file
- Retrieve saved applications through a backend API
- Display application confirmation and error messages
- Modern React user interface
- Separate frontend and backend

**Development status:** Job listing, search and filtering, save-job functionality, application submission, and JSON file storage have been implemented. The dedicated **My Applications frontend page is still pending**.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Page structure |
| CSS | Styling and layout |
| JavaScript | Application logic |
| React | Frontend interface |
| Vite | Frontend development server |
| Node.js | Backend runtime |
| Express.js | REST API |
| Axios | Frontend API requests, if used in the implementation |
| CORS | Frontend-backend communication |
| JSON | Application storage |

## 📁 Project Structure

```text
career-connect/
├── backend/
│   ├── server.js
│   ├── applications.json
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── index.html
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install Node.js and npm.

Check your installation:

```bash
node --version
npm --version
```

### 1. Start the Backend

Open a terminal in the project folder and run:

```bash
cd backend
npm install
npm start
```

Backend URL: http://localhost:5000

Keep this terminal running. If `npm start` is not configured in `backend/package.json`, use the start command defined in that file.

### 2. Start the Frontend

Open a second terminal in the main project folder and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

Open the frontend URL in your browser.

## 🔌 API Endpoints

| Method | Endpoint | Function |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/jobs` | Retrieve all job listings |
| GET | `/api/jobs/:id` | Retrieve a specific job |
| POST | `/api/apply` | Submit a job application |
| GET | `/api/applications` | Retrieve saved applications |

### Application Submission Example

Request body:

```json
{
  "name": "Riya",
  "email": "ri
