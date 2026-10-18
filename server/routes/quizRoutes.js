const express = require('express');
const router = express.Router();
const {
  getQuestions,
  saveQuizResult,
  getUserQuizResults
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getQuestions);
router.post('/result', protect, saveQuizResult);
router.get('/results', protect, getUserQuizResults);

module.exports = router;

