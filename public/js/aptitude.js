// Aptitude Practice Page Logic
let currentCategory = 'All';
let questionsList = [];
let currentIndex = 0;
let selectedOptionIndex = null;
let correctCount = 0;
let wrongCount = 0;
let isAnswerSubmitted = false;

document.addEventListener('DOMContentLoaded', () => {
  checkAuthGuard(true);
  initUserNavbar();

  // Category Tab Click Listeners
  const tabs = document.querySelectorAll('#categoryTabs .tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      loadCategoryQuestions();
    });
  });

  // Buttons
  document.getElementById('submitAnswerBtn').addEventListener('click', handleSubmitAnswer);
  document.getElementById('nextQuestionBtn').addEventListener('click', handleNextQuestion);
  document.getElementById('retakeQuizBtn').addEventListener('click', loadCategoryQuestions);

  // Initial load
  loadCategoryQuestions();
});

// Fetch questions from API
async function loadCategoryQuestions() {
  const quizCard = document.getElementById('quizCard');
  const quizResultCard = document.getElementById('quizResultCard');
  quizCard.style.display = 'block';
  quizResultCard.style.display = 'none';

  document.getElementById('questionText').textContent = 'Loading aptitude questions...';
  document.getElementById('optionsList').innerHTML = '';
  document.getElementById('explanationBox').style.display = 'none';
  document.getElementById('submitAnswerBtn').style.display = 'inline-flex';
  document.getElementById('submitAnswerBtn').disabled = true;
  document.getElementById('nextQuestionBtn').style.display = 'none';

  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedOptionIndex = null;
  isAnswerSubmitted = false;
  document.getElementById('liveScore').textContent = '0';

  try {
    const url = currentCategory === 'All' ? '/api/quiz' : `/api/quiz?category=${encodeURIComponent(currentCategory)}`;
    const response = await fetchWithAuth(url);
    if (!response || !response.ok) return;

    const data = await response.json();
    questionsList = data.questions || [];

    if (questionsList.length === 0) {
      document.getElementById('questionText').textContent = 'No questions available for this category.';
      return;
    }

    renderCurrentQuestion();
  } catch (error) {
    console.error('Failed to load questions:', error);
    document.getElementById('questionText').textContent = 'Error connecting to database. Please refresh.';
  }
}

// Render current question
function renderCurrentQuestion() {
  const q = questionsList[currentIndex];
  selectedOptionIndex = null;
  isAnswerSubmitted = false;

  document.getElementById('currentQuestionNum').textContent = currentIndex + 1;
  document.getElementById('totalQuestionsNum').textContent = questionsList.length;
  document.getElementById('categoryBadge').textContent = q.category;
  document.getElementById('difficultyBadge').textContent = q.difficulty || 'Medium';
  document.getElementById('questionText').textContent = q.question;

  // Render options
  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = '';

  const prefixes = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, idx) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    item.dataset.index = idx;
    item.innerHTML = `
      <div class="option-prefix">${prefixes[idx]}</div>
      <div style="flex: 1;">${opt}</div>
    `;

    item.addEventListener('click', () => {
      if (isAnswerSubmitted) return;
      document.querySelectorAll('.option-item').forEach((el) => el.classList.remove('selected'));
      item.classList.add('selected');
      selectedOptionIndex = idx;
      document.getElementById('submitAnswerBtn').disabled = false;
    });

    optionsList.appendChild(item);
  });

  document.getElementById('explanationBox').style.display = 'none';
  document.getElementById('submitAnswerBtn').style.display = 'inline-flex';
  document.getElementById('submitAnswerBtn').disabled = true;
  document.getElementById('nextQuestionBtn').style.display = 'none';
}

// Submit Answer handler
function handleSubmitAnswer() {
  if (selectedOptionIndex === null || isAnswerSubmitted) return;
  isAnswerSubmitted = true;

  const q = questionsList[currentIndex];
  const optionItems = document.querySelectorAll('.option-item');
  const explanationBox = document.getElementById('explanationBox');
  const explanationText = document.getElementById('explanationText');
  const explanationTitle = document.getElementById('explanationTitle');

  optionItems.forEach((item) => item.classList.add('locked'));

  const isCorrect = selectedOptionIndex === q.correctAnswer;

  if (isCorrect) {
    correctCount++;
    optionItems[selectedOptionIndex].classList.add('correct');
    explanationTitle.innerHTML = '✅ <span style="color: #059669;">Correct Answer!</span>';
  } else {
    wrongCount++;
    optionItems[selectedOptionIndex].classList.add('wrong');
    optionItems[q.correctAnswer].classList.add('correct');
    explanationTitle.innerHTML = '❌ <span style="color: #dc2626;">Incorrect Answer</span>';
  }

  // Update live score
  document.getElementById('liveScore').textContent = correctCount;

  // Show explanation
  explanationText.textContent = q.explanation || 'No explanation provided for this question.';
  explanationBox.style.display = 'block';

  // Toggle button controls
  document.getElementById('submitAnswerBtn').style.display = 'none';
  const nextBtn = document.getElementById('nextQuestionBtn');
  nextBtn.style.display = 'inline-flex';

  if (currentIndex === questionsList.length - 1) {
    nextBtn.textContent = 'Finish Quiz & Save Result 🎯';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// Next Question handler
async function handleNextQuestion() {
  if (currentIndex < questionsList.length - 1) {
    currentIndex++;
    renderCurrentQuestion();
  } else {
    // All questions done -> Finish Quiz and save to MongoDB
    await finishQuizAndSave();
  }
}

// Finish quiz and save to MongoDB
async function finishQuizAndSave() {
  const quizCard = document.getElementById('quizCard');
  const quizResultCard = document.getElementById('quizResultCard');

  quizCard.style.display = 'none';
  quizResultCard.style.display = 'block';

  const total = questionsList.length;
  const score = correctCount;
  const percentage = Math.round((correctCount / total) * 100);

  document.getElementById('resTotal').textContent = total;
  document.getElementById('resCorrect').textContent = correctCount;
  document.getElementById('resWrong').textContent = wrongCount;
  document.getElementById('resPercentage').textContent = `${percentage}%`;

  const quizName = currentCategory === 'All' ? 'Comprehensive Aptitude Diagnostic Quiz' : `${currentCategory} Practice Test`;

  try {
    const response = await fetchWithAuth('/api/quiz/result', {
      method: 'POST',
      body: JSON.stringify({
        quizName,
        category: currentCategory === 'All' ? 'General Aptitude' : currentCategory,
        totalQuestions: total,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        score,
        percentage
      })
    });

    const data = await response.json();
    if (response.ok && data.success) {
      document.getElementById('mongoSaveBadge').innerHTML = `
        <span>💾</span> Result recorded to MongoDB successfully at ${new Date().toLocaleTimeString()}!
      `;
    }
  } catch (err) {
    console.error('Failed to save quiz result:', err);
    document.getElementById('mongoSaveBadge').innerHTML = `
      <span>⚠️</span> Quiz finished locally. Backend sync notice: ${err.message}
    `;
    document.getElementById('mongoSaveBadge').style.background = '#fef2f2';
    document.getElementById('mongoSaveBadge').style.color = '#b91c1c';
  }
}

