// Progress Tracking Logic
document.addEventListener('DOMContentLoaded', async () => {
  checkAuthGuard(true);
  initUserNavbar();

  try {
    const res = await fetchWithAuth('/api/progress');
    if (!res || !res.ok) return;

    const data = await res.json();
    if (!data.success) return;

    const p = data.data;
    const stats = p.statistics;

    // Overall Progress
    document.getElementById('overallPct').textContent = `${p.overallPercentage}%`;
    document.getElementById('overallBar').style.width = `${p.overallPercentage}%`;

    // Aptitude Progress
    document.getElementById('aptitudeBadge').textContent = `${p.aptitudeProgress}%`;
    document.getElementById('aptitudeBar').style.width = `${p.aptitudeProgress}%`;
    document.getElementById('aptitudeSubtitle').textContent = `${stats.quizzesAttempted} quizzes taken (Avg: ${stats.averageScore}%)`;

    // Technical Progress
    document.getElementById('technicalBadge').textContent = `${p.technicalProgress}%`;
    document.getElementById('technicalBar').style.width = `${p.technicalProgress}%`;
    document.getElementById('technicalSubtitle').textContent = `${stats.technicalTopicsCount} / 8 subjects prepared`;

    // Interview Progress
    document.getElementById('interviewBadge').textContent = `${p.interviewProgress}%`;
    document.getElementById('interviewBar').style.width = `${p.interviewProgress}%`;
    document.getElementById('interviewSubtitle').textContent = `${stats.interviewTopicsCount} / 10 questions practiced`;

    // Resume Progress
    document.getElementById('resumeBadge').textContent = `${p.resumeProgress}%`;
    document.getElementById('resumeBar').style.width = `${p.resumeProgress}%`;
    document.getElementById('resumeSubtitle').textContent = `${stats.resumeChecklistCount} / 6 items checked`;

    // Full Quiz History Table
    const tbody = document.getElementById('fullHistoryBody');
    if (!p.recentQuizzes || p.recentQuizzes.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 36px;">
            No quizzes attempted yet. <a href="aptitude.html" style="font-weight: 600;">Start your first Aptitude Practice test →</a>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = p.recentQuizzes
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
            : '<span class="badge badge-amber">Needs Revision</span>';

          return `
            <tr>
              <td style="font-weight: 600; color: var(--secondary);">${q.quizName}</td>
              <td><span class="badge badge-blue">${q.category || 'General'}</span></td>
              <td style="color: var(--text-muted); font-size: 0.88rem;">${dateStr}</td>
              <td style="font-weight: 600;">${q.score} / ${q.totalQuestions}</td>
              <td style="font-weight: 700; color: ${isPassed ? '#059669' : '#d97706'};">${q.percentage}%</td>
              <td>${statusBadge}</td>
            </tr>
          `;
        })
        .join('');
    }
  } catch (err) {
    console.error('Failed to load progress data:', err);
  }
});

