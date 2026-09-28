/**
 * DIGITAL COMMAND CENTER - INTERACTIVE CLI TERMINAL
 * Full featured interactive terminal supporting command execution, history, tab-complete,
 * matrix rain simulation, and deep portfolio integration.
 */

class CommandTerminal {
  constructor() {
    this.container = document.getElementById('terminal-modal');
    this.body = document.getElementById('terminal-body');
    this.input = document.getElementById('terminal-input');
    this.closeBtn = document.getElementById('terminal-close-btn');
    this.minimizeBtn = document.getElementById('terminal-minimize-btn');
    this.toggleBtns = document.querySelectorAll('.terminal-trigger');
    
    this.history = [];
    this.historyIndex = -1;
    this.isOpen = false;
    this.isMatrixRunning = false;
    this.matrixAnimId = null;

    this.commands = {
      help: () => this.cmdHelp(),
      about: () => this.cmdAbout(),
      skills: () => this.cmdSkills(),
      projects: () => this.cmdProjects(),
      journey: () => this.cmdJourney(),
      achievements: () => this.cmdAchievements(),
      contact: () => this.cmdContact(),
      clear: () => this.cmdClear(),
      theme: (args) => this.cmdTheme(args),
      sound: (args) => this.cmdSound(args),
      matrix: () => this.cmdMatrix(),
      banner: () => this.cmdBanner(),
      date: () => this.cmdDate(),
      whoami: () => this.cmdWhoami(),
      sudo: () => this.cmdSudo(),
      exit: () => this.close()
    };

    this.init();
  }

  init() {
    if (!this.container || !this.input) return;

    // Trigger buttons
    this.toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', () => this.close());
    }

    // Hotkey: Backtick ` or Ctrl+` or Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Input handlers
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.input.addEventListener('input', () => {
      if (window.soundEngine) window.soundEngine.playKeypress();
    });

    // Auto-focus input when terminal area clicked
    this.container.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
        this.input.focus();
      }
    });

    // Initial greeting in terminal
    this.cmdBanner(false);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.container.classList.add('active');
    if (window.soundEngine) window.soundEngine.playClick();
    setTimeout(() => {
      this.input.focus();
      this.scrollToBottom();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove('active');
    if (this.isMatrixRunning) {
      this.stopMatrix();
    }
    if (window.soundEngine) window.soundEngine.playClick();
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      const rawCmd = this.input.value.trim();
      if (rawCmd) {
        this.history.push(rawCmd);
        this.historyIndex = this.history.length;
        this.executeCommand(rawCmd);
      } else {
        this.printLine(`<span class="term-prompt">punit@command-center:~$</span> `);
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.handleTabComplete();
    }
  }

  handleTabComplete() {
    const val = this.input.value.trim().toLowerCase();
    if (!val) return;
    const matches = Object.keys(this.commands).filter(c => c.startsWith(val));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.printLine(`<span class="term-hint">${matches.join('   ')}</span>`);
      this.scrollToBottom();
    }
  }

  executeCommand(commandString) {
    // Echo entered command
    this.printLine(`<span class="term-prompt">punit@command-center:~$</span> <span class="term-cmd">${this.escapeHtml(commandString)}</span>`);

    const parts = commandString.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      if (window.soundEngine) window.soundEngine.playAlert();
      this.printLine(`<span class="term-error">Command not recognized: "${cmd}". Type <span class="term-highlight">'help'</span> for available commands.</span>`);
    }

    this.scrollToBottom();
  }

  printLine(html) {
    const p = document.createElement('div');
    p.className = 'term-line';
    p.innerHTML = html;
    this.body.appendChild(p);
  }

  scrollToBottom() {
    this.body.scrollTop = this.body.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  // COMMAND IMPLEMENTATIONS

  cmdHelp() {
    this.printLine(`
<div class="term-table">
  <div class="term-table-header">AVAILABLE COMMAND PROTOCOLS:</div>
  <div><span class="term-highlight">help</span>         - Display this commands index</div>
  <div><span class="term-highlight">about</span>        - Display Punit's operator dossier & bio</div>
  <div><span class="term-highlight">skills</span>       - List full skills inventory & proficiencies</div>
  <div><span class="term-highlight">projects</span>     - Display indexed software projects</div>
  <div><span class="term-highlight">journey</span>      - Display education & milestone timeline</div>
  <div><span class="term-highlight">achievements</span>  - List awards, certifications & badges</div>
  <div><span class="term-highlight">contact</span>      - Display direct transmission channels</div>
  <div><span class="term-highlight">theme &lt;name&gt;</span>  - Set theme: <span class="term-dim">cyber | matrix | solar</span></div>
  <div><span class="term-highlight">sound &lt;on|off&gt;</span> - Toggle audio synthesizer engine</div>
  <div><span class="term-highlight">matrix</span>       - Trigger cyber matrix rain sequence</div>
  <div><span class="term-highlight">date</span>         - Display telemetry star-date and local time</div>
  <div><span class="term-highlight">whoami</span>       - Display visitor session identity</div>
  <div><span class="term-highlight">sudo</span>         - Request elevated root privileges</div>
  <div><span class="term-highlight">clear</span>        - Flush terminal buffer</div>
  <div><span class="term-highlight">exit</span>         - Minimize terminal window</div>
</div>`);
  }

  cmdAbout() {
    const p = PORTFOLIO_DATA.profile;
    this.printLine(`
<div class="term-card">
  <div class="term-card-title">DOSSIER // ${p.name.toUpperCase()}</div>
  <div class="term-card-item"><span class="term-label">CALLSIGN:</span> ${p.callsign}</div>
  <div class="term-card-item"><span class="term-label">ROLE:</span> ${p.designation}</div>
  <div class="term-card-item"><span class="term-label">STATUS:</span> <span class="term-online">${p.status}</span></div>
  <div class="term-card-item"><span class="term-label">LOCATION:</span> ${p.location}</div>
  <div class="term-card-item"><span class="term-label">MISSION:</span> ${p.mission}</div>
  <div class="term-card-desc">${p.bio.join('<br><br>')}</div>
</div>`);
  }

  cmdSkills() {
    let out = '<div class="term-table"><div class="term-table-header">SKILLS MATRIX INVENTORY:</div>';
    PORTFOLIO_DATA.skills.forEach(cat => {
      out += `<div class="term-cat-title">&gt; ${cat.category.toUpperCase()}:</div>`;
      cat.items.forEach(skill => {
        const barLength = Math.round(skill.level / 5);
        const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
        out += `  <span class="term-skill-name">${skill.name.padEnd(20)}</span> [${bar}] ${skill.level}% <span class="term-dim">(${skill.tag})</span><br>`;
      });
    });
    out += '</div>';
    this.printLine(out);
  }

  cmdProjects() {
    let out = '<div class="term-table"><div class="term-table-header">INDEXED ARCHIVE PROJECTS:</div>';
    PORTFOLIO_DATA.projects.forEach((proj, idx) => {
      out += `
<div class="term-project-entry">
  <span class="term-highlight">[${idx + 1}] ${proj.title}</span> <span class="term-badge">${proj.status}</span>
  <div>${proj.description}</div>
  <div class="term-dim">STACK: ${proj.technologies.join(', ')}</div>
</div>`;
    });
    out += '</div>';
    this.printLine(out);
  }

  cmdJourney() {
    let out = '<div class="term-table"><div class="term-table-header">QUANTUM TIMELINE // CHRONOLOGICAL NODES:</div>';
    PORTFOLIO_DATA.journey.forEach(step => {
      out += `
<div class="term-timeline-entry">
  <span class="term-highlight">◆ [${step.period}]</span> <strong>${step.title}</strong>
  <div class="term-dim">${step.subtitle} // STATUS: ${step.status}</div>
  <div>${step.description}</div>
</div>`;
    });
    out += '</div>';
    this.printLine(out);
  }

  cmdAchievements() {
    let out = '<div class="term-table"><div class="term-table-header">HONORS & TROPHY VAULT:</div>';
    PORTFOLIO_DATA.achievements.forEach(ach => {
      out += `
<div class="term-achieve-entry">
  ${ach.badgeIcon} <span class="term-highlight">${ach.title}</span> <span class="term-dim">[${ach.issuer} - ${ach.date}]</span>
  <div>${ach.description}</div>
</div>`;
    });
    out += '</div>';
    this.printLine(out);
  }

  cmdContact() {
    const s = PORTFOLIO_DATA.profile.socials;
    this.printLine(`
<div class="term-card">
  <div class="term-card-title">COMMUNICATION FREQUENCIES:</div>
  <div><span class="term-label">EMAIL:</span> <a href="mailto:${s.email}" class="term-link">${s.email}</a></div>
  <div><span class="term-label">GITHUB:</span> <a href="${s.github}" target="_blank" class="term-link">${s.github}</a></div>
  <div><span class="term-label">LINKEDIN:</span> <a href="${s.linkedin}" target="_blank" class="term-link">${s.linkedin}</a></div>
  <div><span class="term-label">DISCORD:</span> ${s.discord}</div>
  <div class="term-dim">Transmissions are monitored continuously. Direct message relay available in section 7.</div>
</div>`);
  }

  cmdClear() {
    this.body.innerHTML = '';
  }

  cmdTheme(args) {
    const theme = (args[0] || '').toLowerCase();
    if (['cyber', 'matrix', 'solar'].includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('nav_theme', theme);
      document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
      if (window.soundEngine) window.soundEngine.playSuccess();
      this.printLine(`<span class="term-success">Command Center theme calibrated to: <strong>${theme.toUpperCase()}</strong></span>`);
    } else {
      this.printLine(`<span class="term-error">Invalid theme. Supported profiles: <span class="term-highlight">cyber</span>, <span class="term-highlight">matrix</span>, <span class="term-highlight">solar</span></span>`);
    }
  }

  cmdSound(args) {
    const arg = (args[0] || '').toLowerCase();
    if (arg === 'on') {
      window.soundEngine.setMuted(false);
      window.soundEngine.playClick();
      this.printLine(`<span class="term-success">Web Audio Synthesizer: <strong class="term-online">ENABLED</strong></span>`);
      this.updateSoundUi();
    } else if (arg === 'off') {
      window.soundEngine.setMuted(true);
      this.printLine(`<span class="term-warn">Web Audio Synthesizer: <strong>MUTED</strong></span>`);
      this.updateSoundUi();
    } else {
      const current = window.soundEngine.isMuted ? 'OFF' : 'ON';
      this.printLine(`Audio synthesizer is currently: <strong>${current}</strong>. Use <span class="term-highlight">sound on</span> or <span class="term-highlight">sound off</span>.`);
    }
  }

  updateSoundUi() {
    const soundToggles = document.querySelectorAll('.sound-toggle');
    const isMuted = window.soundEngine.isMuted;
    soundToggles.forEach(t => {
      t.classList.toggle('muted', isMuted);
      t.title = isMuted ? 'Unmute Audio' : 'Mute Audio';
      const text = t.querySelector('.toggle-text');
      if (text) text.innerText = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
    });
  }

  cmdMatrix() {
    if (this.isMatrixRunning) {
      this.stopMatrix();
      this.printLine(`<span class="term-warn">Matrix rain simulation terminated.</span>`);
    } else {
      this.startMatrix();
      this.printLine(`<span class="term-online">Initializing Quantum Matrix Matrix rain... Press any key or type 'matrix' again to abort.</span>`);
    }
  }

  startMatrix() {
    this.isMatrixRunning = true;
    let canvas = document.getElementById('matrix-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      canvas.className = 'matrix-fullscreen-canvas';
      document.body.appendChild(canvas);
    }
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンPUNIT';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(7, 10, 19, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff9d';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      this.matrixAnimId = requestAnimationFrame(renderMatrix);
    };

    renderMatrix();

    const stopOnClick = () => {
      this.stopMatrix();
      window.removeEventListener('keydown', stopOnClick);
      canvas.removeEventListener('click', stopOnClick);
    };
    window.addEventListener('keydown', stopOnClick);
    canvas.addEventListener('click', stopOnClick);
  }

  stopMatrix() {
    this.isMatrixRunning = false;
    if (this.matrixAnimId) {
      cancelAnimationFrame(this.matrixAnimId);
      this.matrixAnimId = null;
    }
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) canvas.style.display = 'none';
  }

  cmdDate() {
    const now = new Date();
    this.printLine(`
<div>
  <span class="term-label">STARDATE:</span> [${(2024 + now.getMonth() / 12).toFixed(2)}] // 
  <span class="term-label">LOCAL TIMESTAMP:</span> ${now.toLocaleString()} // 
  <span class="term-online">EPOCH: ${now.getTime()}</span>
</div>`);
  }

  cmdWhoami() {
    this.printLine(`
<div>
  <span class="term-highlight">GUEST_USER // RECON_OPERATOR</span><br>
  Access Level: <span class="term-online">RESTRICTED_EXPLORER (READ ONLY)</span><br>
  Target: PUNIT'S COMMAND ARCHIVE
</div>`);
  }

  cmdSudo() {
    if (window.soundEngine) window.soundEngine.playAlert();
    this.printLine(`
<div class="term-warn">
  [ALERT] Unauthorized privilege escalation attempt logged.<br>
  Just kidding! Punit has granted you temporary root credentials. Have fun exploring the Command Center!
</div>`);
  }

  cmdBanner(printHelp = true) {
    this.printLine(`
<pre class="term-banner">
 ██████╗ ██╗   ██╗███╗   ██╗██╗████████╗
 ██╔══██╗██║   ██║████╗  ██║██║╚══██╔══╝
 ██████╔╝██║   ██║██╔██╗ ██║██║   ██║   
 ██╔═══╝ ██║   ██║██║╚██╗██║██║   ██║   
 ██║     ╚██████╔╝██║ ╚████║██║   ██║   
 ╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝   
             -- DIGITAL COMMAND CENTER v2.6 --
</pre>
<div class="term-welcome">
  Welcome, Operator. All systems are initialized and standing by.<br>
  Type <span class="term-highlight">'help'</span> to inspect telemetry directives or <span class="term-highlight">'matrix'</span> for rain mode.
</div>`);
    if (printHelp) this.scrollToBottom();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.commandTerminal = new CommandTerminal();
});
