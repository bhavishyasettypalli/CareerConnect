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
- View saved applications through a backend API
- Display application confirmation and error messages
- Modern React user interface
- Separate frontend and backend

**Development status:** The job listing, search/filter, save-job, application submission, and persistent JSON file storage features have been implemented and tested. The dedicated **My Applications frontend page is still pending**.

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
| Axios | Frontend API requests |
| CORS | Frontend-backend communication |
| JSON | Persistent application storage |

## 📁 Project Structure

```text
career-connect/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── server.js
│   ├── applications.json
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install Node.js and npm before running the project.

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

Keep this terminal running.

### 2. Start the Frontend

Open a second terminal and run:

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
  "email": "riya@example.com",
  "jobId": 1
}
```

Example request using Bash and cURL:

```bash
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{"name":"Riya","email":"riya@example.com","jobId":1}'
```

### View Saved Applications

```bash
curl http://localhost:5000/api/applications
```

Applications are stored in `backend/applications.json` and remain available after a normal backend restart, provided the file remains intact.

## 🧩 Main Application Functions

### Frontend

- `fetchJobs()` — Retrieves job listings from the backend.
- `toggleSaved(id)` — Saves or unsaves a job in the current frontend state.
- `applyForJob(job)` — Collects applicant details and submits an application.
- `filteredJobs` — Filters jobs using the search text, location, and job type.

### Backend

- `readApplications()` — Reads saved applications from the JSON file.
- `saveApplications(applications)` — Writes applications to the JSON file.
- `GET /api/jobs` — Returns job listings.
- `GET /api/jobs/:id` — Returns one job or a not-found response.
- `POST /api/apply` — Validates required fields and saves a new application.
- `GET /api/applications` — Returns all saved applications.

## 🧪 Testing

1. Start the backend and frontend.
2. Open the website.
3. Search for a job and try the filters.
4. Save and unsave a job.
5. Apply for a job using a test name and valid email.
6. Open `http://localhost:5000/api/applications`.
7. Restart the backend and check that the application remains.

## ⚠️ Current Limitations

- Job listings are sample data defined in the backend.
- Application storage uses a local JSON file rather than a database.
- User registration and login are not implemented.
- There is no dedicated My Applications frontend page yet.
- Saved and applied button states are maintained in frontend memory and may reset when the page reloads.
- File-based storage is suitable for a small prototype, not concurrent production workloads.
- Backend field validation is basic and does not provide full email verification.
- Authentication, authorization, and production-grade security are not implemented.

## 🔮 Future Improvements

- Build a dedicated My Applications page.
- Add MongoDB or another database.
- Add student authentication and profiles.
- Add resume uploads.
- Add employer job management.
- Add application status tracking.
- Improve form validation and security.
- Deploy the application online.

## ▶️ Git and GitHub

Run these commands from the project folder after creating a GitHub repository:

```bash
git init
git add .
git commit -m "Build CareerConnect student job portal"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

If the GitHub remote is already configured, do not run `git remote add origin` again. Use:

```bash
git add .
git commit -m "Update CareerConnect documentation"
git push
```

## 👩‍💻 Author

Bhavishya Settypalli

## 📜 License

This project is intended for educational and portfolio purposes.
