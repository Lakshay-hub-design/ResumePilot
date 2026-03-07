import React, { useState, useEffect } from 'react'
import '../style/interview.scss'

const Report = {
  matchScore: 85,
  technicalQuestions: [
    {
      question: "Explain how JWT authentication works in your e-commerce application and how you ensured security.",
      intention: "To assess understanding of authentication implementation and security best practices",
      answer: "JWT authentication involves three parts: header, payload, and signature. In BagCart, after login the server creates a signed JWT containing userId and role, returns it to the client, and the client stores it in HttpOnly cookies. On each request the token is verified with the secret key, extracting user info and attaching it to req.user. Security measures: use strong random secret, set short expiry, refresh tokens, store in HttpOnly secure cookies, validate on every route, and revoke on logout."
    },
    {
      question: "How did you structure your MongoDB schemas for the e-commerce product and order modules?",
      intention: "To evaluate database design skills and normalization choices",
      answer: "Products schema: title, slug, description, price, discount, stock, category ref, images array, owner ref, timestamps. Orders schema: user ref, products array with product ref, quantity, price snapshot, total, status enum, shippingAddress sub-doc, paymentId, createdAt. Index on user and status for fast lookups; embed frequently-accessed immutable data like price snapshot; reference volatile data like product details."
    },
    {
      question: "Describe a performance bottleneck you faced in your JobTracker dashboard and how you optimized it.",
      intention: "To check awareness of performance issues and optimization techniques",
      answer: "Initial /analytics endpoint aggregated all jobs on every request causing O(n) calculations. Optimized by: 1) caching counts in Redis with 5-minute TTL, 2) adding compound index on user+status+date, 3) implementing pagination and server-side aggregation pipeline instead of in-memory loops, reducing response time from ~800ms to ~120ms."
    },
  ],
  behaviouralQuestions: [
    {
      question: "Tell me about a time you received critical feedback on your code during a team review.",
      intention: "To see openness to feedback and growth mindset",
      answer: "Use STAR: During JobTracker PR, reviewer pointed out missing input validation. I acknowledged, asked clarifying questions, added Joi schemas, wrote unit tests covering edge cases, and updated PR. Outcome: merged with zero bugs reported later. Lesson: adopt defensive coding and always add validation layer early."
    },
    {
      question: "Describe a situation where you had to balance shipping fast vs. writing maintainable code.",
      intention: "To understand prioritization and code quality values",
      answer: "BagCart launch deadline clashed with adding TypeScript. Prioritized shipping MVP with plain JS but added ESLint rules and JSDoc comments to keep codebase clean. After launch, created tech-debt ticket and migrated file-by-file to TypeScript in next sprint, maintaining backward compatibility. Shows pragmatism while not letting tech debt accumulate indefinitely."
    },
    {
      question: "Give an example of how you explained a technical concept to a non-technical stakeholder.",
      intention: "To assess communication skills and empathy",
      answer: "Client asked why pages load slowly. I compared caching to keeping frequently bought items near cashier instead of warehouse, showed before/after metrics using simple bar chart, and proposed phased rollout. Result: stakeholder approved Redis budget within same week."
    }
  ],
  skillGaps: [
    {
      skill: "System design knowledge beyond basic MERN",
      severity: "high"
    },
    {
      skill: "Redis or caching in production",
      severity: "medium"
    },
    {
      skill: "CI/CD pipeline setup (GitHub Actions, Docker)",
      severity: "medium"
    },
    {
      skill: "Cloud deployment on AWS/GCP",
      severity: "medium"
    },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "System design fundamentals",
      tasks: [
        "Read 'System Design Interview Volume 1' chapters 1-3",
        "Watch Gaurav Sen's 'Design a URL shortener' video",
        "Practice drawing component diagram for BagCart on excalidraw"
      ]
    },
    {
      day: 2,
      focus: "Redis & caching",
      tasks : [
        "Complete Redis crash course on Redis University",
        "Integrate Redis into JobTracker analytics endpoint",
        "Add cache-aside helper and test TTL invalidation"
      ]
    },
    {
      day: 3,
      focus: "Testing & clean code",
      tasks: [
        "Write Jest unit tests for BagCart auth middleware",
        "Add integration tests for /api/products using Supertest",
        "Refactor to 80% code coverage"
      ]
    },
    {
      day: 4,
      focus: "CI/CD & Docker",
      tasks: [
        "Dockerize BagCart frontend and backend",
        "Create GitHub Actions workflow for test & build",
        "Deploy to AWS Elastic Beanstalk or Render"
      ]
    },
    {
      day: 5,
      focus: "Mock interviews",
      tasks: [
        "Schedule peer mock on Pramp",
        "Record yourself explaining JWT flow in 5 min",
        "Redo system design question with timing constraints"
      ]
    }
  ],   
}


const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard  = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')


    const scoreColor =
        Report.matchScore >= 80 ? 'score--high' :
            Report.matchScore >= 60 ? 'score--mid' : 'score--low'


    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        className='button primary-button' >
                        <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{Report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {Report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{Report.behaviouralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {Report.behaviouralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{Report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {Report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{Report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {Report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview