/**
 * DIGITAL COMMAND CENTER - CANVAS PARTICLES & CYBERNETIC GRID
 * Renders an interactive, futuristic background node constellation with mouse interaction
 * and dynamic theme awareness.
 */

class CyberBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 40 : 85;
    this.mouse = { x: null, y: null, radius: 140 };
    this.scanlineY = 0;
    this.primaryColor = { r: 0, g: 240, b: 255 }; // Default Cyan
    this.accentColor = { r: 168, g: 85, b: 247 }; // Default Violet

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.updateThemeColors();
    this.animate();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.particleCount = this.width < 768 ? 35 : 75;
    if (this.particles.length > 0) {
      this.createParticles();
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Listen for theme change events
    document.addEventListener('themeChanged', () => {
      this.updateThemeColors();
    });
  }

  updateThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'cyber';
    if (theme === 'matrix') {
      this.primaryColor = { r: 0, g: 255, b: 157 };
      this.accentColor = { r: 16, g: 185, b: 129 };
    } else if (theme === 'solar') {
      this.primaryColor = { r: 255, g: 183, b: 3 };
      this.accentColor = { r: 251, g: 133, b: 0 };
    } else {
      // Default Cyber
      this.primaryColor = { r: 0, g: 240, b: 255 };
      this.accentColor = { r: 168, g: 85, b: 247 };
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        isHub: Math.random() > 0.85
      });
    }
  }

  drawGrid() {
    const gridSize = 80;
    this.ctx.strokeStyle = `rgba(${this.primaryColor.r}, ${this.primaryColor.g}, ${this.primaryColor.b}, 0.025)`;
    this.ctx.lineWidth = 1;

    // Vertical grid
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    // Horizontal grid
    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  drawScanline() {
    this.scanlineY += 0.8;
    if (this.scanlineY > this.height) {
      this.scanlineY = 0;
    }

    const grad = this.ctx.createLinearGradient(0, this.scanlineY - 20, 0, this.scanlineY + 20);
    grad.addColorStop(0, `rgba(${this.primaryColor.r}, ${this.primaryColor.g}, ${this.primaryColor.b}, 0)`);
    grad.addColorStop(0.5, `rgba(${this.primaryColor.r}, ${this.primaryColor.g}, ${this.primaryColor.b}, 0.08)`);
    grad.addColorStop(1, `rgba(${this.primaryColor.r}, ${this.primaryColor.g}, ${this.primaryColor.b}, 0)`);

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, this.scanlineY - 20, this.width, 40);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawGrid();
    this.drawScanline();

    // Update and draw particles
    const maxDist = 130;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off screen boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.isHub ? p.radius * 1.6 : p.radius, 0, Math.PI * 2);
      
      const col = p.isHub ? this.accentColor : this.primaryColor;
      this.ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${p.alpha})`;
      this.ctx.shadowBlur = p.isHub ? 10 : 4;
      this.ctx.shadowColor = `rgba(${col.r}, ${col.g}, ${col.b}, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // Reset shadow

      // Connect particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${this.primaryColor.r}, ${this.primaryColor.g}, ${this.primaryColor.b}, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.cyberBackground = new CyberBackground('bg-canvas');
});
