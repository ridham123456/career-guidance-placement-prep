// Resources Directory Logic
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  checkAuthGuard(true);
  initUserNavbar();

  // Filter tabs
  const tabs = document.querySelectorAll('#resourceTabs .tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.cat;
      fetchResources();
    });
  });

  fetchResources();
});

// Fetch resources from API
async function fetchResources() {
  const grid = document.getElementById('resourcesGrid');
  grid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
      Loading placement resources from MongoDB...
    </div>
  `;

  try {
    const url = currentCategory === 'All' ? '/api/resources' : `/api/resources?category=${encodeURIComponent(currentCategory)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');

    const data = await res.json();
    const resources = data.resources || [];

    if (resources.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          No resources found in this category.
        </div>
      `;
      return;
    }

    grid.innerHTML = resources
      .map(
        (r) => `
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
              <span class="badge badge-blue">${r.category}</span>
              ${r.badge ? `<span class="badge badge-green" style="font-size: 0.72rem;">${r.badge}</span>` : ''}
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--secondary); margin-bottom: 8px; line-height: 1.4;">
              ${r.title}
            </h3>

            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 20px;">
              ${r.description}
            </p>
          </div>

          <a href="${r.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width: 100%; font-size: 0.88rem;">
            Open Resource ↗
          </a>
        </div>
      `
      )
      .join('');
  } catch (error) {
    console.error('Failed to load resources:', error);
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--danger);">
        Error loading placement resources from database.
      </div>
    `;
  }
}

