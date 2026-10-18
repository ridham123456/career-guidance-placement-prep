const Question = require('../models/Question');
const QuizResult = require('../models/QuizResult');

// Fallback seed questions if database hasn't been populated yet
const defaultQuestions = [
  // Quantitative Aptitude
  {
    category: 'Quantitative Aptitude',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
    correctAnswer: 1,
    explanation: 'Speed = 240/24 = 10 m/s. Total distance to pass platform = 240 + 650 = 890 m. Time = 890 / 10 = 89 seconds.',
    difficulty: 'Medium'
  },
  {
    category: 'Quantitative Aptitude',
    question: 'If 20% of an item cost is deducted, it costs Rs. 480. What is the original cost of the item?',
    options: ['Rs. 560', 'Rs. 600', 'Rs. 620', 'Rs. 580'],
    correctAnswer: 1,
    explanation: 'Let original cost be X. 80% of X = 480 => X = 480 * (100 / 80) = Rs. 600.',
    difficulty: 'Easy'
  },
  {
    category: 'Quantitative Aptitude',
    question: 'A and B together can do a piece of work in 12 days, while B alone can finish it in 30 days. In how many days can A alone complete the work?',
    options: ['18 days', '20 days', '24 days', '25 days'],
    correctAnswer: 1,
    explanation: '1/A = 1/12 - 1/30 = (5 - 2)/60 = 3/60 = 1/20. Thus A alone takes 20 days.',
    difficulty: 'Medium'
  },
  {
    category: 'Quantitative Aptitude',
    question: 'The ratio of two numbers is 3:4 and their HCF is 4. What is their LCM?',
    options: ['12', '16', '24', '48'],
    correctAnswer: 3,
    explanation: 'Numbers are 3*4 = 12 and 4*4 = 16. LCM of 12 and 16 is 48.',
    difficulty: 'Easy'
  },
  {
    category: 'Quantitative Aptitude',
    question: 'In what time will Rs. 1000 become Rs. 1331 at 10% per annum compounded annually?',
    options: ['2 years', '3 years', '4 years', '2.5 years'],
    correctAnswer: 1,
    explanation: 'A = P(1 + r/100)^n => 1331/1000 = (11/10)^3 => n = 3 years.',
    difficulty: 'Medium'
  },

  // Logical Reasoning
  {
    category: 'Logical Reasoning',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctAnswer: 2,
    explanation: 'The only son of Suresh\'s mother is Suresh himself. So the boy is the son of Suresh, making Suresh his father.',
    difficulty: 'Easy'
  },
  {
    category: 'Logical Reasoning',
    question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
    options: ['95', '111', '127', '128'],
    correctAnswer: 2,
    explanation: 'Each term is (Previous term * 2) + 1. 63 * 2 + 1 = 127.',
    difficulty: 'Easy'
  },
  {
    category: 'Logical Reasoning',
    question: 'Statement: All mangoes are golden in color. No golden-colored things are cheap. Conclusion I: All mangoes are cheap. Conclusion II: Golden-colored mangoes are not cheap.',
    options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Neither follows'],
    correctAnswer: 1,
    explanation: 'Since mangoes are golden and golden things are not cheap, golden mangoes cannot be cheap. Only Conclusion II follows.',
    difficulty: 'Medium'
  },
  {
    category: 'Logical Reasoning',
    question: 'In a certain code language, "COMPUTER" is written as "RFUVQNPC". How is "MEDICINE" written in that code?',
    options: ['EOJDJEFM', 'EOJDEJFM', 'MFEJDJOE', 'EOJDJEFN'],
    correctAnswer: 0,
    explanation: 'First and last letters are swapped. The intermediate letters are moved +1 and reversed: MEDICINE becomes EOJDJEFM.',
    difficulty: 'Hard'
  },
  {
    category: 'Logical Reasoning',
    question: 'If South-East becomes North, North-East becomes West and so on, what will West become?',
    options: ['North-East', 'South-East', 'South-West', 'North-West'],
    correctAnswer: 1,
    explanation: 'Each direction turns 135 degrees anti-clockwise. Turning West 135 degrees anti-clockwise gives South-East.',
    difficulty: 'Medium'
  },

  // Verbal Ability
  {
    category: 'Verbal Ability',
    question: 'Choose the word which is most nearly OPPOSITE in meaning to the word: CANDID',
    options: ['Outspoken', 'Deceitful', 'Frank', 'Honest'],
    correctAnswer: 1,
    explanation: 'Candid means straightforward, frank and honest. The opposite is deceitful or secretive.',
    difficulty: 'Easy'
  },
  {
    category: 'Verbal Ability',
    question: 'Select the synonym for the word: PRAGMATIC',
    options: ['Idealistic', 'Practical', 'Theoretical', 'Reckless'],
    correctAnswer: 1,
    explanation: 'Pragmatic refers to dealing with things sensibly and realistically based on practical rather than theoretical considerations.',
    difficulty: 'Easy'
  },
  {
    category: 'Verbal Ability',
    question: 'Spot the error in the sentence: "Neither the principal (A) / nor the teachers (B) / was present in (C) / the assembly hall. (D)"',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    explanation: 'When subjects are connected by "neither... nor", the verb agrees with the closer subject ("the teachers" is plural, so it should be "were present"). Part C is erroneous.',
    difficulty: 'Medium'
  },
  {
    category: 'Verbal Ability',
    question: 'Fill in the blank: "Despite several warnings, he persisted _____ breaking company protocols."',
    options: ['on', 'with', 'in', 'at'],
    correctAnswer: 2,
    explanation: 'The verb "persist" takes the preposition "in" (persisted in doing something).',
    difficulty: 'Medium'
  },
  {
    category: 'Verbal Ability',
    question: 'Choose the correct idiom meaning: "To hit the nail on the head"',
    options: ['To hurt oneself while working', 'To state the exact truth precisely', 'To destroy a delicate plan', 'To build something sturdy'],
    correctAnswer: 1,
    explanation: '"To hit the nail on the head" means to describe exactly what is causing a situation or problem.',
    difficulty: 'Easy'
  }
];

// @desc    Get aptitude questions (optionally filter by category)
// @route   GET /api/quiz
// @access  Private
const getQuestions = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    let questions = await Question.find(filter);

    // If database is empty, seed automatically or return default questions
    if (!questions || questions.length === 0) {
      await Question.insertMany(defaultQuestions);
      questions = await Question.find(filter);
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save quiz result
// @route   POST /api/quiz/result
// @access  Private
const saveQuizResult = async (req, res, next) => {
  try {
    const {
      quizName,
      category,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score,
      percentage
    } = req.body;

    if (!quizName || totalQuestions === undefined || correctAnswers === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required quiz result data.'
      });
    }

    const calculatedScore = score !== undefined ? score : correctAnswers;
    const calculatedPercentage =
      percentage !== undefined
        ? percentage
        : Math.round((correctAnswers / totalQuestions) * 100);

    const result = await QuizResult.create({
      userId: req.user._id,
      quizName,
      category: category || 'General Aptitude',
      totalQuestions,
      correctAnswers,
      wrongAnswers: wrongAnswers !== undefined ? wrongAnswers : totalQuestions - correctAnswers,
      score: calculatedScore,
      percentage: calculatedPercentage,
      attemptedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Quiz result successfully saved to your profile!',
      result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's previous quiz results
// @route   GET /api/quiz/results
// @access  Private
const getUserQuizResults = async (req, res, next) => {
  try {
    const results = await QuizResult.find({ userId: req.user._id }).sort({
      attemptedAt: -1
    });

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  saveQuizResult,
  getUserQuizResults,
  defaultQuestions
};

