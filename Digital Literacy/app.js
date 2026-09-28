/**
 * DIGITAL COMMAND CENTER - CORE APPLICATION ORCHESTRATOR
 * Coordinates data rendering, boot sequences, real-time HUD telemetry,
 * interactive modals, theme switching, and form transmissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();
  initTheme();
  initAudioToggles();
  initTelemetryClock();
  renderProfile();
  renderSkills();
  renderProjects();
  renderJourney();
  renderAchievements();
  initModals();
  initContactForm();
  initNavScroll();
  attachHoverSounds();
});

/* ==========================================================================
   1. BOOT SEQUENCE & DIAGNOSTICS
   ========================================================================== */
function initBootSequence() {
  const bootOverlay = document.getElementById('boot-overlay');
  const bootLog = document.getElementById('boot-log');
  const bootProgress = document.getElementById('boot-progress-bar');
  const bypassBtn = document.getElementById('boot-bypass-btn');

  if (!bootOverlay) return;

  const logs = [
    "BIOS CORE // INITIALIZING QUANTUM KERNEL...",
    "CHECKING MEMORY REGISTERS... [OK]",
    "CALIBRATING NEURAL HUD INTERFACE... [OK]",
    "LOADING TELEMETRY MATRICES... [OK]",
    "ESTABLISHING SECURE UPLINK TO PUNIT'S ARCHIVE...",
    "AUTHENTICATION: LEVEL 5 (VISITOR CREDENTIALS GRANTED)",
    "ALL SYSTEMS NOMINAL. LAUNCHING COMMAND CENTER..."
  ];

  let currentLog = 0;
  let progress = 0;
  let hasBooted = false;

  const finishBoot = () => {
    if (hasBooted) return;
    hasBooted = true;
    bootOverlay.classList.add('boot-complete');
    setTimeout(() => {
      bootOverlay.style.display = 'none';
      if (window.soundEngine) window.soundEngine.playBoot();
    }, 600);
  };

  const interval = setInterval(() => {
    progress += 16;
    if (bootProgress) bootProgress.style.width = `${Math.min(progress, 100)}%`;

    if (currentLog < logs.length && bootLog) {
      const p = document.createElement('div');
      p.className = 'boot-log-line';
      p.innerText = logs[currentLog];
      bootLog.appendChild(p);
      bootLog.scrollTop = bootLog.scrollHeight;
      currentLog++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(finishBoot, 350);
    }
  }, 220);

  if (bypassBtn) {
    bypassBtn.addEventListener('click', () => {
      clearInterval(interval);
      finishBoot();
    });
  }
}

/* ==========================================================================
   2. THEME CONTROLLER
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('nav_theme') || 'cyber';
  setTheme(savedTheme, false);

  const themeSelectors = document.querySelectorAll('.theme-btn');
  themeSelectors.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const theme = e.currentTarget.getAttribute('data-theme');
      setTheme(theme, true);
    });
  });
}

function setTheme(theme, triggerSound = true) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nav_theme', theme);

  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme') === theme);
  });

  const themeLabel = document.getElementById('hud-theme-label');
  if (themeLabel) themeLabel.innerText = theme.toUpperCase();

  document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  if (triggerSound && window.soundEngine) {
    window.soundEngine.playClick();
  }
}

/* ==========================================================================
   3. AUDIO TOGGLES
   ========================================================================== */
function initAudioToggles() {
  const soundToggles = document.querySelectorAll('.sound-toggle');

  const updateIcons = () => {
    const isMuted = window.soundEngine.isMuted;
    soundToggles.forEach(t => {
      t.classList.toggle('muted', isMuted);
      const text = t.querySelector('.toggle-text');
      if (text) text.innerText = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
      const icon = t.querySelector('.toggle-icon');
      if (icon) icon.innerText = isMuted ? '🔇' : '🔊';
    });
  };

  updateIcons();

  soundToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newMuted = window.soundEngine.toggleMute();
      updateIcons();
      if (!newMuted) {
        window.soundEngine.playClick();
        showToast("Audio Synthesizer: ONLINE");
      } else {
        showToast("Audio Synthesizer: MUTED");
      }
    });
  });
}

/* ==========================================================================
   4. TELEMETRY & CLOCK
   ========================================================================== */
function initTelemetryClock() {
  const clockEl = document.getElementById('hud-clock');
  const pingEl = document.getElementById('hud-ping');
  const cpuEl = document.getElementById('hud-cpu');

  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) {
      clockEl.innerText = `${hours}:${mins}:${secs} UTC+5:30`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Fluctuating ping & cpu simulation for authentic telemetry
  setInterval(() => {
    if (pingEl) {
      const ping = Math.floor(20 + Math.random() * 8);
      pingEl.innerText = `${ping}ms`;
    }
    if (cpuEl) {
      const cpu = (12 + Math.random() * 15).toFixed(1);
      cpuEl.innerText = `${cpu}%`;
    }
  }, 3500);
}

/* ==========================================================================
   5. PROFILE & HERO SECTION
   ========================================================================== */
function renderProfile() {
  const p = PORTFOLIO_DATA.profile;

  // Hero Section Elements
  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.innerText = p.name.toUpperCase();

  const heroStatus = document.getElementById('hero-status-pill');
  if (heroStatus) heroStatus.innerText = p.status;

  // About Section Elements
  const aboutBioContainer = document.getElementById('about-bio-paragraphs');
  if (aboutBioContainer) {
    aboutBioContainer.innerHTML = p.bio.map(para => `<p class="bio-para">${para}</p>`).join('');
  }

  const metricsGrid = document.getElementById('about-metrics-grid');
  if (metricsGrid) {
    metricsGrid.innerHTML = p.metrics.map(m => `
      <div class="metric-card">
        <div class="metric-val-wrap">
          <span class="metric-val">${m.value}</span>
          <span class="metric-unit">${m.unit}</span>
        </div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  const missionText = document.getElementById('about-mission-text');
  if (missionText) missionText.innerText = p.mission;

  // Enter Portfolio CTA
  const enterBtn = document.getElementById('hero-enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.soundEngine) window.soundEngine.playWarp();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Copy Email Buttons
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(b => {
    b.addEventListener('click', () => {
      navigator.clipboard.writeText(p.socials.email).then(() => {
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast("Email address copied to clipboard!");
      });
    });
  });
}

/* ==========================================================================
   6. SKILLS MATRIX (DYNAMIC & EASY TO UPDATE)
   ========================================================================== */
function renderSkills() {
  const categoriesNav = document.getElementById('skills-tabs');
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  let activeCategory = 'all';

  const filterSkills = (catKey) => {
    activeCategory = catKey;

    let itemsToRender = [];
    if (catKey === 'all') {
      PORTFOLIO_DATA.skills.forEach(cat => {
        cat.items.forEach(it => itemsToRender.push({ ...it, catName: cat.category }));
      });
    } else {
      const match = PORTFOLIO_DATA.skills.find(s => s.categoryKey === catKey);
      if (match) {
        match.items.forEach(it => itemsToRender.push({ ...it, catName: match.category }));
      }
    }

    skillsGrid.innerHTML = itemsToRender.map(item => `
      <div class="skill-card hud-box" data-skill="${item.name}">
        <div class="skill-header">
          <span class="skill-title">${item.name}</span>
          <span class="skill-tag">${item.tag}</span>
        </div>
        <div class="skill-bar-wrap">
          <div class="skill-bar-fill" style="width: ${item.level}%">
            <span class="skill-glow-tip"></span>
          </div>
        </div>
        <div class="skill-footer">
          <span class="skill-cat-label">${item.catName}</span>
          <span class="skill-level-pct">${item.level}% EFFICIENCY</span>
        </div>
      </div>
    `).join('');

    attachHoverSounds();
  };

  // Build Filter Tabs
  if (categoriesNav) {
    const tabs = [
      { key: 'all', label: 'ALL SYSTEMS' },
      ...PORTFOLIO_DATA.skills.map(c => ({ key: c.categoryKey, label: c.category.toUpperCase() }))
    ];

    categoriesNav.innerHTML = tabs.map((tab, idx) => `
      <button class="filter-pill ${idx === 0 ? 'active' : ''}" data-cat="${tab.key}">
        ${tab.label}
      </button>
    `).join('');

    categoriesNav.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoriesNav.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        if (window.soundEngine) window.soundEngine.playClick();
        filterSkills(e.currentTarget.getAttribute('data-cat'));
      });
    });
  }

  filterSkills('all');
}

/* ==========================================================================
   7. PROJECTS ARCHIVE (INTERACTIVE WITH FILTERS & MODAL)
   ========================================================================== */
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const filterNav = document.getElementById('projects-tabs');
  if (!container) return;

  const renderList = (filter = 'all') => {
    const filtered = filter === 'all' 
      ? PORTFOLIO_DATA.projects 
      : PORTFOLIO_DATA.projects.filter(p => p.category === filter);

    container.innerHTML = filtered.map(p => `
      <div class="project-card hud-box">
        <div class="proj-top-bar">
          <span class="proj-badge">${p.badge}</span>
          <span class="proj-status-indicator">
            <span class="status-dot"></span> ${p.status}
          </span>
        </div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.description}</p>
        
        <div class="proj-tech-stack">
          ${p.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>

        <div class="proj-actions">
          <button class="btn btn-outline proj-details-btn" data-proj-id="${p.id}">
            TELEMETRY & DETAILS &rarr;
          </button>
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
            GITHUB ↗
          </a>
        </div>
      </div>
    `).join('');

    // Attach click for project telemetry modal
    container.querySelectorAll('.proj-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-proj-id');
        openProjectModal(id);
      });
    });

    attachHoverSounds();
  };

  if (filterNav) {
    const filters = [
      { key: 'all', label: 'ALL ARCHIVES' },
      { key: 'web', label: 'WEB SYSTEMS' },
      { key: 'fullstack', label: 'FULL-STACK' },
      { key: 'tools', label: 'TOOLS & ENGINES' }
    ];

    filterNav.innerHTML = filters.map((f, i) => `
      <button class="filter-pill ${i === 0 ? 'active' : ''}" data-filter="${f.key}">
        ${f.label}
      </button>
    `).join('');

    filterNav.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterNav.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        if (window.soundEngine) window.soundEngine.playClick();
        renderList(e.currentTarget.getAttribute('data-filter'));
      });
    });
  }

  renderList('all');
}

function openProjectModal(projectId) {
  const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-proj-title');
  const badge = document.getElementById('modal-proj-badge');
  const desc = document.getElementById('modal-proj-desc');
  const highlights = document.getElementById('modal-proj-highlights');
  const tech = document.getElementById('modal-proj-tech');
  const githubLink = document.getElementById('modal-proj-github');

  if (title) title.innerText = proj.title;
  if (badge) badge.innerText = `${proj.badge} // ${proj.status}`;
  if (desc) desc.innerText = proj.description;

  if (highlights) {
    highlights.innerHTML = proj.highlights.map(h => `<li>${h}</li>`).join('');
  }

  if (tech) {
    tech.innerHTML = proj.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('');
  }

  if (githubLink) {
    githubLink.href = proj.githubUrl;
  }

  if (modal) {
    modal.classList.add('active');
    if (window.soundEngine) window.soundEngine.playClick();
  }
}

/* ==========================================================================
   8. QUANTUM TIMELINE (MY JOURNEY)
   ========================================================================== */
function renderJourney() {
  const container = document.getElementById('journey-timeline');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.journey.map((node, index) => `
    <div class="timeline-node ${index % 2 === 0 ? 'node-left' : 'node-right'}">
      <div class="timeline-marker">
        <span class="marker-core"></span>
      </div>
      <div class="timeline-content hud-box">
        <div class="timeline-header">
          <span class="timeline-period">[${node.period}]</span>
          <span class="timeline-status-tag">${node.status}</span>
        </div>
        <h3 class="timeline-title">${node.title}</h3>
        <h4 class="timeline-subtitle">${node.subtitle}</h4>
        <p class="timeline-desc">${node.description}</p>
        <ul class="timeline-achievements">
          ${node.achievements.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. ACHIEVEMENTS & CERTIFICATIONS
   ========================================================================== */
function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.achievements.map(ach => `
    <div class="achievement-card hud-box">
      <div class="ach-icon-badge">${ach.badgeIcon}</div>
      <div class="ach-category-tag">${ach.category.toUpperCase()}</div>
      <h3 class="ach-title">${ach.title}</h3>
      <div class="ach-meta">
        <span class="ach-issuer">${ach.issuer}</span>
        <span class="ach-date">${ach.date}</span>
      </div>
      <p class="ach-desc">${ach.description}</p>
      <div class="ach-highlight-pill">${ach.highlight}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   10. MODALS & POPUPS
   ========================================================================== */
function initModals() {
  // Project modal close
  const projModal = document.getElementById('project-modal');
  const projCloseBtn = document.getElementById('modal-proj-close');
  if (projModal && projCloseBtn) {
    projCloseBtn.addEventListener('click', () => {
      projModal.classList.remove('active');
      if (window.soundEngine) window.soundEngine.playClick();
    });

    projModal.addEventListener('click', (e) => {
      if (e.target === projModal) {
        projModal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   11. CONTACT FORM WITH SIMULATED TRANSMISSION ENCRYPTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('transmission-form');
  const statusEl = document.getElementById('transmission-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('trans-name')?.value.trim();
    const email = document.getElementById('trans-email')?.value.trim();
    const msg = document.getElementById('trans-message')?.value.trim();

    if (!name || !email || !msg) {
      if (window.soundEngine) window.soundEngine.playAlert();
      showToast("Please fill in all transmission fields.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;

    // Multi-stage transmission telemetry animation
    const stages = [
      "ENCRYPTING QUANTUM PACKET...",
      "ROUTING THROUGH LOCAL NODE...",
      "TRANSMITTING TO PUNIT'S TERMINAL...",
      "TRANSMISSION CONFIRMED! 100%"
    ];

    let step = 0;
    if (window.soundEngine) window.soundEngine.playClick();

    const transInterval = setInterval(() => {
      if (step < stages.length) {
        submitBtn.innerHTML = `<span class="spinner-dot"></span> ${stages[step]}`;
        step++;
      } else {
        clearInterval(transInterval);
        if (window.soundEngine) window.soundEngine.playSuccess();
        submitBtn.innerHTML = `✓ TRANSMISSION DELIVERED`;
        submitBtn.classList.add('btn-success');

        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = `Transmission successfully dispatched to Punit. Expect an incoming frequency response soon!`;
        }

        showToast("Transmission received by Punit!");
        form.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
          submitBtn.innerHTML = originalText;
        }, 5000);
      }
    }, 450);
  });
}

/* ==========================================================================
   12. SMOOTH SCROLLING & ACTIVE SECTION TRACKING
   ========================================================================== */
function initNavScroll() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        if (window.soundEngine) window.soundEngine.playClick();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight active nav link on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
}

/* ==========================================================================
   13. AUDIO MICRO-INTERACTION BINDINGS
   ========================================================================== */
function attachHoverSounds() {
  const elements = document.querySelectorAll('button, a, .hud-box, .filter-pill, .navbot-pill, .terminal-trigger');
  elements.forEach(el => {
    // Avoid double attaching
    if (el.dataset.soundAttached) return;
    el.dataset.soundAttached = 'true';

    el.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.playHover();
    });
  });
}

/* ==========================================================================
   14. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('hud-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hud-toast';
    toast.className = 'hud-toast-banner';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-dot"></span> ${message}`;
  toast.classList.add('visible');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}
