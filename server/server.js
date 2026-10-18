const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const progressRoutes = require('./routes/progressRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

// Auto-seed helper models
const User = require('./models/User');
const Question = require('./models/Question');
const Resource = require('./models/Resource');
const QuizResult = require('./models/QuizResult');
const { defaultQuestions } = require('./controllers/quizController');
const { defaultResources } = require('./controllers/resourceController');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB().then(async () => {
  // Ensure default questions, resources, and demo student exist for instant demo readiness
  try {
    const qCount = await Question.countDocuments();
    if (qCount === 0) {
      await Question.insertMany(defaultQuestions);
      console.log('[System Init] Auto-seeded default aptitude questions.');
    }

    const rCount = await Resource.countDocuments();
    if (rCount === 0) {
      await Resource.insertMany(defaultResources);
      console.log('[System Init] Auto-seeded default placement resources.');
    }

    // Auto-seed demo student for instant evaluation without manual steps
    let demoUser = await User.findOne({ email: 'student@demo.edu' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Rahul Sharma',
        email: 'student@demo.edu',
        password: 'password123',
        branch: 'Computer Science & Engineering',
        semester: '5th Semester'
      });
      console.log('[System Init] Auto-seeded demo student: student@demo.edu');

      await QuizResult.create({
        userId: demoUser._id,
        quizName: 'Quantitative Aptitude Diagnostic Test',
        category: 'Quantitative Aptitude',
        totalQuestions: 5,
        correctAnswers: 4,
        wrongAnswers: 1,
        score: 4,
        percentage: 80,
        attemptedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      });
      console.log('[System Init] Auto-seeded demo quiz result.');
    }
  } catch (err) {
    console.error('[System Init Warning]:', err.message);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger for demo tracking
app.use((req, res, next) => {
  if (!req.url.startsWith('/css') && !req.url.startsWith('/js') && !req.url.endsWith('.ico')) {
    console.log(`[HTTP] ${req.method} ${req.url}`);
  }
  next();
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/resources', resourceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    project: 'Societal Internship Career Guidance & Placement Demo'
  });
});

// Catch-all route to serve index.html for root or unknown static paths
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
============================================================
🎓 SOCIETAL INTERNSHIP PRODUCT DEMO SERVER ACTIVE
------------------------------------------------------------
🚀 Server running at: http://localhost:${PORT}
📁 Frontend served from: public/
🗄️  Database: MongoDB
============================================================
  `);
});

