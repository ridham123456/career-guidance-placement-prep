// Student Profile Logic
document.addEventListener('DOMContentLoaded', async () => {
  checkAuthGuard(true);
  initUserNavbar();

  const profileForm = document.getElementById('profileForm');
  const alertBox = document.getElementById('profileAlert');
  const saveBtn = document.getElementById('saveProfileBtn');

  // Load user data from server
  try {
    const res = await fetchWithAuth('/api/user/profile');
    if (!res || !res.ok) return;

    const data = await res.json();
    if (!data.success) return;

    const user = data.user;

    // Fill form
    document.getElementById('editName').value = user.name || '';
    document.getElementById('editEmail').value = user.email || '';
    if (user.branch) document.getElementById('editBranch').value = user.branch;
    if (user.semester) document.getElementById('editSemester').value = user.semester;

    // Fill sidebar/card
    document.getElementById('profileCardEmail').textContent = user.email;
    if (user.createdAt) {
      document.getElementById('profileJoinedDate').textContent = new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }

    // Update local storage cache
    setAuth(getAuthToken(), user);
    initUserNavbar();
  } catch (err) {
    console.error('Failed to load profile:', err);
  }

  // Profile Update Submission
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.style.display = 'none';

    const name = document.getElementById('editName').value.trim();
    const branch = document.getElementById('editBranch').value;
    const semester = document.getElementById('editSemester').value;
    const password = document.getElementById('newPassword').value;

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving Changes...';

    const payload = { name, branch, semester };
    if (password && password.trim() !== '') {
      payload.password = password.trim();
    }

    try {
      const res = await fetchWithAuth('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        showProfileAlert('Profile updated successfully!', 'success');
        setAuth(getAuthToken(), result.user);
        initUserNavbar();
        document.getElementById('newPassword').value = '';
      } else {
        showProfileAlert(result.message || 'Failed to update profile.', 'error');
      }
    } catch (err) {
      console.error(err);
      showProfileAlert('Server communication error.', 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Profile Changes 💾';
    }
  });

  function showProfileAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
  }
});

