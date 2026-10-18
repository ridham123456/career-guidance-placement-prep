const QuizResult = require('../models/QuizResult');
const TopicProgress = require('../models/TopicProgress');

// Total topics benchmarks for calculation
const TOTAL_BENCHMARKS = {
  technical: 8, // 8 technical categories (C, Java, Python, DBMS, SQL, DS, Web Dev, Basics)
  interview: 10, // 10 interview core items
  resume: 6     // 6 resume checklist items
};

// @desc    Get overall student preparation progress & statistics
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1. Fetch all quiz results for this user
    const quizResults = await QuizResult.find({ userId }).sort({ attemptedAt: -1 });
    const quizzesAttempted = quizResults.length;

    let totalScore = 0;
    let totalMaxScore = 0;
    let totalPercentageSum = 0;

    quizResults.forEach((q) => {
      totalScore += q.score;
      totalMaxScore += q.totalQuestions;
      totalPercentageSum += q.percentage;
    });

    const averageScore = quizzesAttempted > 0 ? Math.round(totalPercentageSum / quizzesAttempted) : 0;

    // Aptitude progress percentage (quizzes taken factor and average score)
    const aptitudeProgress = quizzesAttempted > 0 ? Math.min(100, Math.round((averageScore * 0.7) + (Math.min(quizzesAttempted, 5) * 6))) : 0;

    // 2. Fetch completed topics
    const completedTopics = await TopicProgress.find({ userId, completed: true });

    const technicalCompleted = completedTopics.filter((t) => t.module === 'technical');
    const interviewCompleted = completedTopics.filter((t) => t.module === 'interview');
    const resumeCompleted = completedTopics.filter((t) => t.module === 'resume');

    const technicalProgress = Math.min(100, Math.round((technicalCompleted.length / TOTAL_BENCHMARKS.technical) * 100));
    const interviewProgress = Math.min(100, Math.round((interviewCompleted.length / TOTAL_BENCHMARKS.interview) * 100));
    const resumeProgress = Math.min(100, Math.round((resumeCompleted.length / TOTAL_BENCHMARKS.resume) * 100));

    // Overall preparation percentage (weighted: Aptitude 35%, Technical 35%, Interview 20%, Resume 10%)
    const overallPercentage = Math.round(
      (aptitudeProgress * 0.35) +
      (technicalProgress * 0.35) +
      (interviewProgress * 0.20) +
      (resumeProgress * 0.10)
    );

    // Category breakdown of quiz results
    const categoryStats = {
      'Quantitative Aptitude': { attempted: 0, totalScore: 0, avgPct: 0 },
      'Logical Reasoning': { attempted: 0, totalScore: 0, avgPct: 0 },
      'Verbal Ability': { attempted: 0, totalScore: 0, avgPct: 0 }
    };

    quizResults.forEach((r) => {
      const cat = r.category || 'General Aptitude';
      if (categoryStats[cat]) {
        categoryStats[cat].attempted += 1;
        categoryStats[cat].totalScore += r.percentage;
      }
    });

    Object.keys(categoryStats).forEach((key) => {
      const item = categoryStats[key];
      item.avgPct = item.attempted > 0 ? Math.round(item.totalScore / item.attempted) : 0;
    });

    res.status(200).json({
      success: true,
      data: {
        overallPercentage,
        aptitudeProgress,
        technicalProgress,
        interviewProgress,
        resumeProgress,
        statistics: {
          quizzesAttempted,
          averageScore,
          completedTopicsCount: completedTopics.length,
          technicalTopicsCount: technicalCompleted.length,
          interviewTopicsCount: interviewCompleted.length,
          resumeChecklistCount: resumeCompleted.length
        },
        categoryStats,
        completedTopicIds: completedTopics.map((t) => `${t.module}:${t.topicId}`),
        recentQuizzes: quizResults.slice(0, 10) // 10 most recent
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle or save topic/checklist completion
// @route   POST /api/progress/topic
// @access  Private
const toggleTopicProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { module, topicId, completed } = req.body;

    if (!module || !topicId) {
      return res.status(400).json({
        success: false,
        message: 'Module and topicId are required.'
      });
    }

    const isCompleted = completed !== undefined ? completed : true;

    if (isCompleted) {
      await TopicProgress.findOneAndUpdate(
        { userId, module, topicId },
        { userId, module, topicId, completed: true, completedAt: new Date() },
        { upsert: true, new: true }
      );
    } else {
      await TopicProgress.findOneAndDelete({ userId, module, topicId });
    }

    res.status(200).json({
      success: true,
      message: `Topic ${topicId} in ${module} updated.`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProgress,
  toggleTopicProgress
};

