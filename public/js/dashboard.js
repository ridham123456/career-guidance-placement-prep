// Dashboard Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Check auth
  checkAuthGuard(true);
  initUserNavbar();

  // Load progress data from API
  try {
    const response = await fetchWithAuth('/api/progress');
    if (!response || !response.ok) return;

    const result = await response.json();
    if (!result.success) return;

    const data = result.data;
    const stats = data.statistics;

    // Update Stats
    document.getElementById('statQuizzes').textContent = stats.quizzesAttempted;
    document.getElementById('statAvgScore').textContent = `${stats.averageScore}%`;
    document.getElementById('statCompletedTopics').textContent = stats.completedTopicsCount;
    document.getElementById('statReadiness').textContent = `${data.overallPercentage}%`;

    // Update Banner
    const heroProgressPct = document.getElementById('heroProgressPct');
    const heroProgressBar = document.getElementById('heroProgressBar');
    const readinessStatus = document.getElementById('readinessStatus');

    heroProgressPct.textContent = `${data.overallPercentage}%`;
    heroProgressBar.style.width = `${data.overallPercentage}%`;

    if (data.overallPercentage >= 75) {
      readinessStatus.textContent = '🌟 Placement Ready!';
      readinessStatus.style.color = '#4ade80';
    } else if (data.overallPercentage >= 40) {
      readinessStatus.textContent = '⚡ Making Steady Progress';
      readinessStatus.style.color = '#fde047';
    } else {
      readinessStatus.textContent = '🚀 Getting Started';
      readinessStatus.style.color = '#cbd5e1';
    }

    // Populate Recent Quizzes
    const tbody = document.getElementById('recentQuizzesBody');
    if (!data.recentQuizzes || data.recentQuizzes.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 28px;">
            No quiz attempts yet. <a href="aptitude.html" style="font-weight: 600;">Take your first Aptitude Quiz →</a>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = data.recentQuizzes
        .slice(0, 5)
        .map((q) => {
          const dateStr = new Date(q.attemptedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const isPassed = q.percentage >= 60;
          const statusBadge = isPassed
            ? '<span class="badge badge-green">Passed</span>'
            : '<span class="badge badge-amber">Review Needed</span>';

          return `
            <tr>
              <td style="font-weight: 600;">${q.quizName}</td>
              <td><span class="badge badge-blue">${q.category || 'General'}</span></td>
              <td style="color: var(--text-muted); font-size: 0.85rem;">${dateStr}</td>
              <td style="font-weight: 600;">${q.score} / ${q.totalQuestions}</td>
              <td style="font-weight: 700;">${q.percentage}%</td>
              <td>${statusBadge}</td>
            </tr>
          `;
        })
        .join('');
    }
  } catch (error) {
    console.error('Failed to load dashboard statistics:', error);
  }
});

