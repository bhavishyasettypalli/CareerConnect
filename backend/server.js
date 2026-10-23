
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const applicationsFile = path.join(__dirname, 'applications.json');

// Sample jobs
const jobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechNova',
    location: 'Remote',
    type: 'Internship',
    salary: '₹10,000/month',
    skills: ['React', 'JavaScript', 'CSS']
  },
  {
    id: 2,
    title: 'Python Developer Intern',
    company: 'CodeCraft',
    location: 'Hyderabad',
    type: 'Internship',
    salary: '₹12,000/month',
    skills: ['Python', 'SQL', 'Git']
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'PixelStudio',
    location: 'Bengaluru',
    type: 'Internship',
    salary: '₹8,000/month',
    skills: ['Figma', 'UI Design', 'Prototyping']
  },
  {
    id: 4,
    title: 'Junior Java Developer',
    company: 'CloudBridge',
    location: 'Chennai',
    type: 'Full-time',
    salary: '₹4–6 LPA',
    skills: ['Java', 'Spring Boot', 'SQL']
  }
];

// Read applications from the JSON file
function readApplications() {
  try {
    if (!fs.existsSync(applicationsFile)) {
      fs.writeFileSync(applicationsFile, '[]', 'utf8');
    }

    const data = fs.readFileSync(applicationsFile, 'utf8');
    const applications = JSON.parse(data);

    if (!Array.isArray(applications)) {
      throw new Error('Applications file must contain an array.');
    }

    return applications;
  } catch (error) {
    console.error('Could not read applications:', error.message);
    throw error;
  }
}

// Save applications to the JSON file
function saveApplications(applications) {
  fs.writeFileSync(
    applicationsFile,
    JSON.stringify(applications, null, 2),
    'utf8'
  );
}

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CareerConnect API!',
    status: 'Running'
  });
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Get a specific job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!job) {
    return res.status(404).json({
      message: 'Job not found'
    });
  }

  res.json(job);
});

// Submit an application
app.post('/api/apply', (req, res) => {
  const { name, email, jobId } = req.body;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    jobId === undefined ||
    jobId === null
  ) {
    return res.status(400).json({
      message: 'Please provide your name, email, and job ID.'
    });
  }

  const job = jobs.find(
    (item) => item.id === Number(jobId)
  );

  if (!job) {
    return res.status(404).json({
      message: 'Job not found'
    });
  }

  try {
    const applications = readApplications();

    const application = {
      id: applications.reduce(
        (maxId, item) => Math.max(maxId, Number(item.id) || 0),
        0
      ) + 1,
      name: name.trim(),
      email: email.trim(),
      jobId: job.id,
      jobTitle: job.title,
      appliedAt: new Date().toISOString()
    };

    applications.push(application);
    saveApplications(applications);

    res.status(201).json({
      message: 'Application submitted and saved successfully!',
      application
    });
  } catch (error) {
    console.error('Could not save application:', error.message);

    res.status(500).json({
      message: 'Could not save the application. Please try again.'
    });
  }
});

// View all saved applications
app.get('/api/applications', (req, res) => {
  try {
    res.json(readApplications());
  } catch (error) {
    res.status(500).json({
      message: 'Could not read saved applications.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `CareerConnect backend running at http://localhost:${PORT}`
  );
});
