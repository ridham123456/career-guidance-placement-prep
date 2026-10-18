// Resume Guidance Checklist & Progress Logic
let completedResumeItems = new Set();
const TOTAL_CHECKLIST_ITEMS = 6;

document.addEventListener('DOMContentLoaded', async () => {
  checkAuthGuard(true);
  initUserNavbar();

  await loadResumeChecklistProgress();
});

// Load checked items from API
async function loadResumeChecklistProgress() {
  try {
    const res = await fetchWithAuth('/api/progress');
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && data.data.completedTopicIds) {
        completedResumeItems = new Set(data.data.completedTopicIds);

        // Update checkboxes
        for (let i = 1; i <= TOTAL_CHECKLIST_ITEMS; i++) {
          const id = `chk-${i}`;
          const key = `resume:${id}`;
          const isChecked = completedResumeItems.has(key);

          const cb = document.getElementById(id);
          const itemDiv = document.getElementById(`item-${id}`);

          if (cb) cb.checked = isChecked;
          if (itemDiv) {
            if (isChecked) {
              itemDiv.classList.add('checked');
            } else {
              itemDiv.classList.remove('checked');
            }
          }
        }

        updateChecklistBadge();
      }
    }
  } catch (err) {
    console.warn('Error loading resume progress:', err);
  }
}

// Toggle individual checklist item
async function toggleChecklistItem(chkId) {
  const cb = document.getElementById(chkId);
  const itemDiv = document.getElementById(`item-${chkId}`);
  const isChecked = cb.checked;
  const key = `resume:${chkId}`;

  if (isChecked) {
    itemDiv.classList.add('checked');
    completedResumeItems.add(key);
  } else {
    itemDiv.classList.remove('checked');
    completedResumeItems.delete(key);
  }

  updateChecklistBadge();

  // Save to MongoDB
  try {
    await fetchWithAuth('/api/progress/topic', {
      method: 'POST',
      body: JSON.stringify({
        module: 'resume',
        topicId: chkId,
        completed: isChecked
      })
    });
  } catch (err) {
    console.error('Failed to sync checklist with database:', err);
  }
}

function updateChecklistBadge() {
  let count = 0;
  for (let i = 1; i <= TOTAL_CHECKLIST_ITEMS; i++) {
    if (completedResumeItems.has(`resume:chk-${i}`)) {
      count++;
    }
  }

  const badge = document.getElementById('checklistScoreBadge');
  if (badge) {
    badge.textContent = `${count} / ${TOTAL_CHECKLIST_ITEMS} Completed`;
    if (count === TOTAL_CHECKLIST_ITEMS) {
      badge.className = 'badge badge-green';
      badge.textContent = '✅ Resume 100% Ready!';
    } else {
      badge.className = 'badge badge-blue';
    }
  }
}

