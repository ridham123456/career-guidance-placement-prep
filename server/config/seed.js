const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('./db');
const User = require('../models/User');
const Question = require('../models/Question');
const Resource = require('../models/Resource');
const QuizResult = require('../models/QuizResult');
const { defaultQuestions } = require('../controllers/quizController');
const { defaultResources } = require('../controllers/resourceController');

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Connected to MongoDB. Seeding initial data...');
    
    // 1. Seed Questions
    await Question.deleteMany({});
    const createdQuestions = await Question.insertMany(defaultQuestions);
    console.log(`[Seed] Seeded ${createdQuestions.length} aptitude questions.`);

    // 2. Seed Resources
    await Resource.deleteMany({});
    const createdResources = await Resource.insertMany(defaultResources);
    console.log(`[Seed] Seeded ${createdResources.length} placement resources.`);

    // 3. Create or update Demo Student account for instant testing
    let demoUser = await User.findOne({ email: 'student@demo.edu' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Rahul Sharma',
        email: 'student@demo.edu',
        password: 'password123',
        branch: 'Computer Science & Engineering',
        semester: '5th Semester'
      });
      console.log('[Seed] Demo student account created: student@demo.edu / password123');

      // Seed a sample quiz result for Rahul so progress displays nicely right away
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
      console.log('[Seed] Sample quiz result generated for demo student.');
    } else {
      console.log('[Seed] Demo student account already exists.');
    }

    console.log('[Seed] Database successfully populated!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
