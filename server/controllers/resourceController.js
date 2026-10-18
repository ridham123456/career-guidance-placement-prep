const Resource = require('../models/Resource');

// Realistic default curated resources
const defaultResources = [
  // Aptitude Preparation
  {
    title: 'IndiaBIX Aptitude Practice',
    category: 'Aptitude Preparation',
    description: 'Comprehensive practice questions with step-by-step solutions for quantitative aptitude, logical reasoning, and verbal ability.',
    link: 'https://www.indiabix.com/',
    badge: 'Highly Recommended'
  },
  {
    title: 'GeeksforGeeks Aptitude Corner',
    category: 'Aptitude Preparation',
    description: 'Structured topic-wise formulas, shortcuts, and practice problems asked in top IT and MNC campus placement drives.',
    link: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/',
    badge: 'Popular'
  },
  {
    title: 'Pariksha Point Speed Math Tricks',
    category: 'Aptitude Preparation',
    description: 'Vedic math shortcuts and mental calculation cheat-sheets for fast problem solving in timed placement aptitude rounds.',
    link: 'https://www.youtube.com/results?search_query=placement+aptitude+speed+math',
    badge: 'Video Lessons'
  },

  // Coding Preparation
  {
    title: 'LeetCode Top Interview 150',
    category: 'Coding Preparation',
    description: 'Curated list of must-do coding questions covering Arrays, Two Pointers, Trees, Graphs, and Dynamic Programming.',
    link: 'https://leetcode.com/studyplan/top-interview-150/',
    badge: 'Standard'
  },
  {
    title: 'NeetCode Roadmap & Video Solutions',
    category: 'Coding Preparation',
    description: 'Visual algorithm roadmaps and intuitive YouTube explanations for clean problem-solving strategies.',
    link: 'https://neetcode.io/roadmap',
    badge: 'Student Favorite'
  },
  {
    title: 'HackerRank Problem Solving Track',
    category: 'Coding Preparation',
    description: 'Beginner-friendly challenges to build programming muscle memory in C, C++, Java, and Python with star badges.',
    link: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript',
    badge: 'Beginner Friendly'
  },

  // Interview Preparation
  {
    title: 'Tech Interview Handbook',
    category: 'Interview Preparation',
    description: 'Curated interview preparation materials, behavioral cheat sheets, system design primers, and offer negotiation guides.',
    link: 'https://www.techinterviewhandbook.org/',
    badge: 'Must Read'
  },
  {
    title: 'STAR Method Framework for HR Questions',
    category: 'Interview Preparation',
    description: 'Situation, Task, Action, Result framework breakdown for answering behavioral questions like a seasoned candidate.',
    link: 'https://www.themuse.com/advice/star-interview-method',
    badge: 'HR Prep'
  },
  {
    title: 'Pramp Free Peer Mock Interviews',
    category: 'Interview Preparation',
    description: 'Practice live technical and behavioral interviews with fellow engineering students across the globe with instant feedback.',
    link: 'https://www.pramp.com/',
    badge: 'Mock Interviews'
  },

  // Resume Preparation
  {
    title: 'Harvard College Resume & Cover Letter Guide',
    category: 'Resume Preparation',
    description: 'The standard single-page action-verb resume format recognized and preferred by college placement cells and MNC recruiters.',
    link: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/',
    badge: 'Official Template'
  },
  {
    title: 'Overleaf LaTeX Tech Resume Templates',
    category: 'Resume Preparation',
    description: 'Clean, ATS-friendly LaTeX resume templates (Jake\'s Resume, Deedy Resume) ready for direct compilation.',
    link: 'https://www.overleaf.com/gallery/tagged/cv',
    badge: 'ATS Friendly'
  },
  {
    title: 'Resume Action Verbs & Impact Formula',
    category: 'Resume Preparation',
    description: 'Google XYZ formula guide: Accomplished [X] as measured by [Y], by doing [Z] with 100+ strong power verbs.',
    link: 'https://www.inc.com/bill-murphy-jr/google-recruiters-say-these-5-words-are-best-way-to-describe-your-work.html',
    badge: 'Writing Guide'
  },

  // Career Resources
  {
    title: 'Roadmap.sh Developer Roadmaps',
    category: 'Career Resources',
    description: 'Step-by-step community-driven visual roadmaps and paths for Frontend, Backend, DevOps, AI, and Cybersecurity.',
    link: 'https://roadmap.sh/',
    badge: 'Roadmaps'
  },
  {
    title: 'GitHub Student Developer Pack',
    category: 'Career Resources',
    description: 'Free developer tools, domain names, cloud credits (AWS, Azure, DigitalOcean), and learning platforms for college students.',
    link: 'https://education.github.com/pack',
    badge: 'Free Tools'
  },
  {
    title: 'FreeCodeCamp Full Stack Curriculum',
    category: 'Career Resources',
    description: 'Learn full-stack software development, responsive web design, databases, and APIs completely free with verified certifications.',
    link: 'https://www.freecodecamp.org/',
    badge: 'Certified'
  }
];

// @desc    Get placement resources (optionally filter by category)
// @route   GET /api/resources
// @access  Public / Private
const getResources = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    let resources = await Resource.find(filter);

    // If database empty, automatically populate with default resources
    if (!resources || resources.length === 0) {
      await Resource.insertMany(defaultResources);
      resources = await Resource.find(filter);
    }

    res.status(200).json({
      success: true,
      count: resources.length,
      resources
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResources,
  defaultResources
};

