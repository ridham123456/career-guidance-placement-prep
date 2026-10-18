# MargDarshi: Career Guidance & Placement Preparation Portal
### Societal Internship Product Demo | 5th Semester

> **Project Title:** Addressing Lack of Career Guidance and Placement Preparation  
> **Tech Stack:** Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript, Node.js, Express.js, MongoDB & Mongoose.  
> *(Strictly 0 external frontend or CSS frameworks — No React, No Bootstrap, No Tailwind)*

---

## 1. Project Overview & Societal Purpose

During student surveys conducted as part of our **5th Semester Societal Internship**, over **78% of college students** in engineering and degree institutions reported high anxiety, fragmented study resources, and a severe lack of structured preparation for on-campus and off-campus placements.

Key gaps identified:
1. **Unstructured Aptitude Practice:** Students jump between unverified websites with conflicting answer keys and no performance tracking.
2. **Technical Review Gap:** Difficulty finding concise, high-yield concept summaries and interview-ready answers for core engineering subjects (C, Java, Python, DBMS, SQL, DSA, Web Dev).
3. **Interview Hesitation:** Lack of familiarity with the STAR (Situation, Task, Action, Result) answering method for HR behavioral interviews.
4. **ATS Resume Rejections:** Overcrowded multi-page resumes lacking quantifiable impact bullets.
5. **No Progress Visibility:** Zero feedback on whether a student is actually getting closer to placement readiness.

**MargDarshi** addresses this by providing an all-in-one, student-centric platform featuring interactive diagnostic aptitude quizzes, core subject prep, STAR interview responses, career roadmaps, an ATS resume guide with an interactive checklist, and live progress analytics backed by **MongoDB**.

---

## 2. Technologies Used

- **Frontend:**
  - Semantic HTML5
  - Vanilla CSS3 (Custom design system, CSS variables, Flexbox, CSS Grid, animations, 100% responsive)
  - Vanilla JavaScript (ES6+, `fetch()` API, client-side session management)
- **Backend:**
  - Node.js (Runtime)
  - Express.js (REST API server, route controllers, error handling middleware, static file delivery)
  - JSON Web Tokens (`jsonwebtoken`) & `bcryptjs` (Password hashing and stateless route protection)
  - `cors` & `dotenv` (Environment management)
- **Database:**
  - MongoDB (Document database)
  - Mongoose (ODM with validation, schemas, and relational references)

---

## 3. Project Folder Structure

```text
social internship demo/
├── .env                          # Local environment variables (Port, Mongo URI, JWT Secret)
├── .env.example                  # Template environment variables
├── package.json                  # Dependencies and execution scripts
├── README.md                     # Complete project documentation and demo guide
│
├── server/                       # Backend Express Architecture
│   ├── config/
│   │   ├── db.js                 # MongoDB Mongoose connection
│   │   └── seed.js               # Auto & manual database seeding script
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Logout handlers
│   │   ├── userController.js     # Profile retrieval and update handlers
│   │   ├── quizController.js     # Aptitude questions and quiz score storage
│   │   ├── progressController.js # Readiness calculations and topic completion
│   │   └── resourceController.js # Curated placement links directory
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token protection guard
│   │   └── errorHandler.js       # Centralized error handler (duplicate keys, validation)
│   ├── models/
│   │   ├── User.js               # Student model (bcrypt password hashing)
│   │   ├── QuizResult.js         # Stored quiz attempts & percentages
│   │   ├── Question.js           # MCQs with options, answers & explanations
│   │   ├── Resource.js           # Placement resources repository
│   │   └── TopicProgress.js      # Completed subject topics and checklist items
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── userRoutes.js         # /api/user/*
│   │   ├── quizRoutes.js         # /api/quiz/*
│   │   ├── progressRoutes.js     # /api/progress/*
│   │   └── resourceRoutes.js     # /api/resources/*
│   └── server.js                 # Main server entry point
│
└── public/                       # Frontend Static Web Application
    ├── css/
    │   └── style.css             # Unified modern student-focused styling
    ├── js/
    │   ├── auth.js               # Client auth state, route guards, fetchWithAuth
    │   ├── dashboard.js          # Dashboard metrics and recent attempts
    │   ├── aptitude.js           # MCQ runner, grading, explanations, MongoDB sync
    │   ├── technical.js          # Technical subjects, collapsible FAQs, progress toggle
    │   ├── interview.js          # HR STAR questions, tech questions, tips
    │   ├── career.js             # 7 career roadmaps, skill chips, advice
    │   ├── resume.js             # Interactive checklist & MongoDB persistence
    │   ├── resources.js          # Curated resource cards filtering
    │   ├── progress.js           # Live readiness gauges and full quiz history
    │   └── profile.js            # Profile information editing
    ├── index.html                # Project landing page (Societal survey context)
    ├── login.html                # Sign-in page with 1-click Demo Account helper
    ├── register.html             # Student account registration page
    ├── dashboard.html            # Main preparation dashboard
    ├── aptitude.html             # Aptitude practice & quiz simulator
    ├── technical.html            # Core technical revision & interview questions
    ├── interview.html            # HR behavioral (STAR), tech questions & tips
    ├── career.html               # Career paths and learning roadmaps
    ├── resume.html               # ATS resume guide and interactive checklist
    ├── resources.html            # Curated placement resource directory
    ├── progress.html             # Real-time progress analytics & attempt logs
    └── profile.html              # Student profile management
```

---

## 4. REST API Endpoints

| Category | Method | Route | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Public | Register student with hashed password |
| **Auth** | `POST` | `/api/auth/login` | Public | Validate credentials & return JWT |
| **Auth** | `POST` | `/api/auth/logout` | Public | Invalidate student session |
| **User** | `GET` | `/api/user/profile` | Private | Retrieve student academic profile |
| **User** | `PUT` | `/api/user/profile` | Private | Update name, branch, semester, or password |
| **Quiz** | `GET` | `/api/quiz` | Private | Fetch MCQs (filtered by `?category=...`) |
| **Quiz** | `POST` | `/api/quiz/result` | Private | Save completed quiz attempt to MongoDB |
| **Quiz** | `GET` | `/api/quiz/results`| Private | Retrieve all previous student attempts |
| **Progress** | `GET` | `/api/progress` | Private | Calculate overall readiness & topic stats |
| **Progress** | `POST` | `/api/progress/topic` | Private | Toggle topic or resume checklist completion |
| **Resources**| `GET` | `/api/resources` | Public | Retrieve curated placement materials |
| **Health** | `GET` | `/api/health` | Public | System status and uptime verification |

---

## 5. Prerequisites & Database Setup

1. **Node.js** (v16 or higher)
2. **MongoDB** (Local Community Server running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

### MongoDB Setup Options:
- **Local MongoDB:** Ensure the MongoDB Windows Service or `mongod` is running.
- **MongoDB Atlas (Cloud):** Set `MONGO_URI` in `.env` to your cloud connection string:
  ```env
  MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/societal_internship_prep?retryWrites=true&w=majority
  ```

---

## 6. Installation & Quick Start

### Step 1: Install Dependencies
Open your terminal in the project root:
```bash
npm install
```

### Step 2: Configure Environment Variables
Verify `.env` has the correct settings:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/societal_internship_prep
JWT_SECRET=societal_placement_prep_jwt_super_secret_key_2026
NODE_ENV=development
```

### Step 3: Seed Default Data (Optional / Automatic)
The application automatically seeds initial aptitude questions and placement resources on first run. You can also manually seed at any time:
```bash
npm run seed
```
*(This automatically creates a ready-to-test Demo Student account: `student@demo.edu` / `password123`)*

### Step 4: Start the Server
```bash
npm start
```
Or for development with automatic restarts:
```bash
npm run dev
```

The server will start at:
```text
http://localhost:5000
```

---

## 7. Complete Product Demo Flow (Step-by-Step for Evaluation)

You can demonstrate the complete 18-step user journey during your internship presentation:

1. **Landing Page:** Open `http://localhost:5000`. Present the societal survey findings, problem statement, and 6 core feature highlights. Click **"Get Started Now"**.
2. **Register a New Student:**
   - Name: `Sneha Rao`
   - Email: `sneha.rao@college.edu`
   - Branch: `Computer Science & Engineering`
   - Semester: `5th Semester`
   - Password: `password123` (Confirm: `password123`)
   - Click **"Create Student Account"** -> Instant feedback and automatic redirect to Dashboard!
3. **Alternatively, Quick Demo Login:**
   - Go to `login.html`.
   - Click **"Auto Fill"** (fills `student@demo.edu` / `password123`) and click **"Sign In"**.
4. **Dashboard Overview:**
   - Verify personalized greeting: *"Welcome, [Student Name]!"*
   - See Preparation Readiness progress bar, 4 stat cards (Quizzes Attempted, Average Score, Completed Topics, Placement Readiness).
   - Show 6 quick-access preparation module cards.
5. **Aptitude Practice Module:**
   - Click **"Aptitude Practice"** in the sidebar.
   - Switch between categories (*Quantitative Aptitude, Logical Reasoning, Verbal Ability*).
   - Select an option on Question 1 and click **"Submit Answer"**.
   - Show immediate feedback: green highlight for correct, red for incorrect, and detailed step-by-step solution box.
   - Complete the quiz and click **"Finish Quiz & Save Result"**.
   - Show the score card with total questions, correct, wrong, percentage, and the confirmation badge: **"Result saved to MongoDB collection `QuizResults`"**.
6. **Progress Tracking Page:**
   - Click **"My Progress"** in sidebar.
   - Observe how the aptitude progress bar and overall readiness score dynamically updated!
   - Scroll down to **"Detailed Quiz Attempt History"** to show the newly submitted quiz entry logged with exact date, score, and outcome badge.
7. **Technical Preparation Module:**
   - Click **"Technical Prep"** in sidebar.
   - Switch between *Programming Basics, C, Java & OOP, Python, DBMS, SQL, Data Structures, Web Development*.
   - Review concepts, click common interview questions to toggle accordion answers.
   - Click **"Mark as Prepared 📌"** on *Java* and *DBMS*. Button turns green (`✅ Marked as Prepared`) and updates MongoDB via API!
8. **Interview Preparation Module:**
   - Click **"Interview Prep"** in sidebar.
   - Review Section A: HR Questions (e.g. *Tell me about yourself, Strengths, Weaknesses, Why hire you, 5 Years*) with the STAR framework and sample answers. Click **"Mark as Practiced"**.
   - Switch to Section B for core technical FAQs (*OOP, DBMS, SQL vs NoSQL, API, Normalization*).
   - Switch to Section C for communication protocols, body language, and fatal mistakes.
9. **Career Guidance Module:**
   - Click **"Career Guidance"** in sidebar.
   - Explore roadmaps for *Software Developer, Web Developer, Data Analyst, Data Scientist, AI/ML Engineer, Cyber Security, Cloud/DevOps*.
   - Show required skills, tools to learn, 4-stage roadmaps, and entry-level tips.
10. **Resume Guidance & Interactive Checklist:**
    - Click **"Resume Guidance"** in sidebar.
    - Walk through the single-page format, What to Include vs Avoid, and Google's XYZ bullet formula.
    - Scroll to the **Interactive College Resume Checklist**. Check off items (*Single-page, Hyperlinks, XYZ formula, etc.*).
    - Notice the live badge update (`4 / 6 Completed`) and persistence to MongoDB.
11. **Placement Resources Module:**
    - Click **"Placement Resources"** in sidebar.
    - Filter resources by *Aptitude, Coding, Interview, Resume, Career*.
    - Show verified external links and badges loaded directly from MongoDB.
12. **Student Profile Page:**
    - Click **"Student Profile"** in sidebar.
    - Show student information loaded from MongoDB.
    - Edit name or semester and click **"Save Profile Changes"**.
    - Notice the header badge and localStorage updates in real time.
13. **Sign Out & Route Protection:**
    - Click **"Sign Out"** at the bottom of the sidebar.
    - You are redirected to `login.html`.
    - Try navigating directly to `dashboard.html` or `aptitude.html` in your browser address bar: the route guard intercepts and redirects straight to `login.html`!

---

## 8. Security & Academic Integrity

- Passwords are salted and hashed with `bcryptjs` (never stored or returned in plain text).
- Protected API routes strictly require a valid JSON Web Token (`Authorization: Bearer <token>`).
- Client-side navigation guards automatically prevent unauthorized access.
- Mongoose schema-level validations prevent duplicate emails and malformed records.
- Environment variables isolate database connection strings and JWT secrets.

