
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:5000/api/jobs'
const APPLY_URL = 'http://localhost:5000/api/apply'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All locations')
  const [jobType, setJobType] = useState('All types')
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [applyingJobId, setApplyingJobId] = useState(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get(API_URL)
        setJobs(response.data)
        setError('')
      } catch (err) {
        setError(
          'Could not load jobs. Make sure the backend is running on port 5000.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const searchText =
      `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase()

    return (
      searchText.includes(search.toLowerCase()) &&
      (location === 'All locations' || job.location === location) &&
      (jobType === 'All types' || job.type === jobType)
    )
  })

  function toggleSaved(id) {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id]
    )
  }

  async function applyForJob(job) {
    if (appliedJobs.includes(job.id) || applyingJobId !== null) return

    const name = window.prompt('Enter your full name:')
    if (!name || !name.trim()) return

    const email = window.prompt('Enter your email address:')
    if (!email || !email.trim()) return

    setApplyingJobId(job.id)

    try {
      const response = await axios.post(APPLY_URL, {
        name: name.trim(),
        email: email.trim(),
        jobId: job.id
      })

      setAppliedJobs((current) => [...current, job.id])
      window.alert(response.data.message || 'Application submitted successfully!')
    } catch (err) {
      window.alert(
        err.response?.data?.message ||
        'Could not submit your application. Please check that the backend is running.'
      )
    } finally {
      setApplyingJobId(null)
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">C</span>
          CareerConnect<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links">
          <a className="active-link" href="#jobs">Find Jobs</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className="nav-actions">
          <a className="login-link" href="#jobs">Explore Jobs</a>
          <a className="primary-button nav-button" href="#jobs">
            Get Started <span>↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="announcement">
              <span className="announcement-dot" />
              YOUR NEXT OPPORTUNITY STARTS HERE
            </div>

            <h1>
              Your career.
              <br />
              Your <span className="gradient-text">next chapter.</span>
            </h1>

            <p className="hero-description">
              Discover internships and entry-level jobs designed for your
              potential. Take the first step toward a career you love.
            </p>

            <div className="hero-buttons">
              <a className="primary-button" href="#jobs">
                Explore Opportunities <span>→</span>
              </a>
              <a className="secondary-button" href="#how-it-works">
                How it works
              </a>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack">
                <span>A</span><span>R</span><span>S</span><span>K</span>
              </div>
              <p>
                <strong>Built for students</strong>
                <br />
                Starting their careers
              </p>
            </div>
          </div>

          <div className="hero-art" aria-label="Career growth illustration">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="floating-card card-top">
              <span className="mini-icon purple">✦</span>
              <div>
                <strong>Dream big.</strong>
                <small>Start somewhere.</small>
              </div>
            </div>

            <div className="growth-illustration">
              <div className="growth-circle circle-back" />
              <div className="growth-circle circle-front" />
              <div className="growth-bar bar-one" />
              <div className="growth-bar bar-two" />
              <div className="growth-bar bar-three" />
              <div className="growth-bar bar-four" />
              <div className="growth-arrow">↗</div>
              <div className="growth-star">✳</div>
            </div>

            <div className="floating-card card-bottom">
              <span className="mini-icon green">✓</span>
              <div>
                <strong>New beginnings</strong>
                <small>One application away</small>
              </div>
            </div>

            <span className="sparkle sparkle-one">✦</span>
            <span className="sparkle sparkle-two">✧</span>
          </div>
        </section>

        <section className="stats-strip">
          <div><strong>Find</strong><span>Internships</span></div>
          <div><strong>Explore</strong><span>Career paths</span></div>
          <div><strong>Build</strong><span>Your experience</span></div>
          <div><strong>Begin</strong><span>Your journey</span></div>
        </section>

        <section className="jobs-section" id="jobs">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">OPPORTUNITIES AWAIT</span>
              <h2>Find your <span>fit.</span></h2>
              <p>Explore roles that match your skills and ambitions.</p>
            </div>

            <span className="job-count">
              {loading ? 'Loading jobs…' : `${filteredJobs.length} opportunities`}
            </span>
          </div>

          <div className="search-panel">
            <label className="search-field">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title, company, or skill"
                aria-label="Search jobs"
              />
            </label>

            <label className="select-field">
              <span>⌖</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                aria-label="Filter by location"
              >
                <option>All locations</option>
                <option>Remote</option>
                <option>Hyderabad</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
                <option>Pune</option>
              </select>
            </label>

            <label className="select-field">
              <span>▤</span>
              <select
                value={jobType}
                onChange={(event) => setJobType(event.target.value)}
                aria-label="Filter by job type"
              >
                <option>All types</option>
                <option>Internship</option>
                <option>Full-time</option>
              </select>
            </label>

            <button
              className="primary-button search-button"
              onClick={() =>
                document.getElementById('job-list')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }
            >
              Search
            </button>
          </div>

          {loading && (
            <p role="status">Loading job listings from the server…</p>
          )}

          {error && (
            <div className="empty-state" role="alert">
              <h3>Unable to load jobs</h3>
              <p>{error}</p>
              <button
                className="secondary-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="job-grid" id="job-list">
                {filteredJobs.map((job) => (
                  <article className="job-card" key={job.id}>
                    <div className="job-card-top">
                      <div
                        className={`company-logo ${['purple', 'blue', 'orange', 'green'][job.id % 4]}`}
                      >
                        {job.company.charAt(0)}
                      </div>

                      <button
                        className={`save-button ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                        onClick={() => toggleSaved(job.id)}
                        aria-label={
                          savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'
                        }
                        title="Save job"
                      >
                        {savedJobs.includes(job.id) ? '♥' : '♡'}
                      </button>
                    </div>

                    <span
                      className={`job-type ${job.type === 'Full-time' ? 'full-time' : ''}`}
                    >
                      {job.type}
                    </span>

                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company}</p>

                    <div className="job-meta">
                      <span>⌖ {job.location}</span>
                      <span>{job.salary}</span>
                    </div>

                    <div className="skills-list">
                      {job.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <button
                      className={`apply-button ${appliedJobs.includes(job.id) ? 'applied' : ''}`}
                      onClick={() => applyForJob(job)}
                      disabled={
                        appliedJobs.includes(job.id) ||
                        applyingJobId !== null
                      }
                    >
                      {applyingJobId === job.id
                        ? 'Submitting…'
                        : appliedJobs.includes(job.id)
                          ? 'Applied ✓'
                          : 'Apply Now →'}
                    </button>
                  </article>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="empty-state">
                  <h3>No matching opportunities</h3>
                  <p>Try another keyword or change your filters.</p>
                  <button
                    className="secondary-button"
                    onClick={() => {
                      setSearch('')
                      setLocation('All locations')
                      setJobType('All types')
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="how-section" id="how-it-works">
          <span className="section-eyebrow">YOUR JOURNEY, SIMPLIFIED</span>
          <h2>Three steps to <span>get started.</span></h2>

          <div className="steps-grid">
            <article>
              <span className="step-number">01</span>
              <h3>Discover</h3>
              <p>Search for opportunities that match your interests and skills.</p>
            </article>
            <article>
              <span className="step-number">02</span>
              <h3>Prepare</h3>
              <p>Showcase your projects, skills, and experience to employers.</p>
            </article>
            <article>
              <span className="step-number">03</span>
              <h3>Apply</h3>
              <p>Take the next step toward your first internship or job.</p>
            </article>
          </div>
        </section>

        <section className="cta-section">
          <div>
            <span className="section-eyebrow">YOUR FUTURE STARTS TODAY</span>
            <h2>Ready to take the first step?</h2>
            <p>Explore opportunities and start building your career.</p>
          </div>
          <a className="primary-button cta-button" href="#jobs">
            Find Your Opportunity →
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">C</span>
          CareerConnect<span className="brand-dot">.</span>
        </a>
        <p>Helping students take the first step toward their future.</p>
        <span>© {new Date().getFullYear()} CareerConnect. Student project.</span>
      </footer>
    </div>
  )
}

export default App
