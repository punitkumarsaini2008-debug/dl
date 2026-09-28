/**
 * DIGITAL COMMAND CENTER - NAV-BOT AI ASSISTANT
 * Holographic AI companion with predefined query chips, natural keyword parsing,
 * animated typing responses, sound integration, and direct section navigation.
 */

class NavBot {
  constructor() {
    this.chatBody = document.getElementById('navbot-chat-body');
    this.input = document.getElementById('navbot-input');
    this.sendBtn = document.getElementById('navbot-send-btn');
    this.quickButtons = document.querySelectorAll('.navbot-pill');
    this.corePulse = document.getElementById('navbot-core');

    this.isTyping = false;
    this.init();
  }

  init() {
    if (!this.chatBody) return;

    // Quick prompt pills
    this.quickButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const query = e.currentTarget.getAttribute('data-query') || e.currentTarget.innerText.trim();
        this.handleUserQuery(query);
      });
    });

    // Send button
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => {
        this.submitInput();
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.submitInput();
        }
      });
    }

    // Initial greeting
    setTimeout(() => {
      this.addBotMessage(PORTFOLIO_DATA.navBotKnowledge.greetings[0]);
    }, 600);
  }

  submitInput() {
    if (!this.input || this.isTyping) return;
    const text = this.input.value.trim();
    if (!text) return;
    this.input.value = '';
    this.handleUserQuery(text);
  }

  handleUserQuery(queryText) {
    if (this.isTyping) return;

    if (window.soundEngine) window.soundEngine.playClick();
    this.addUserMessage(queryText);

    // Determine response
    const answerData = this.generateResponse(queryText);

    // Simulated thinking delay
    this.isTyping = true;
    this.showThinkingIndicator();

    setTimeout(() => {
      this.removeThinkingIndicator();
      this.addBotMessage(answerData.text, answerData.actions);
      this.isTyping = false;
    }, 650);
  }

  generateResponse(rawQuery) {
    const q = rawQuery.toLowerCase();
    const know = PORTFOLIO_DATA.navBotKnowledge.responses;

    if (q.includes('about') || q.includes('who is') || q.includes('tell me') || q.includes('bio') || q.includes('intro') || q.includes('punit')) {
      return {
        text: know.about,
        actions: [{ label: "View Full Dossier", target: "#about" }]
      };
    } else if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build') || q.includes('apps')) {
      return {
        text: know.projects,
        actions: [{ label: "Explore Projects Section", target: "#projects" }]
      };
    } else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('languages') || q.includes('tools')) {
      return {
        text: know.skills,
        actions: [{ label: "Inspect Skill Matrix", target: "#skills" }]
      };
    } else if (q.includes('why') || q.includes('choose') || q.includes('hire') || q.includes('reason') || q.includes('strength')) {
      return {
        text: know.whyHire,
        actions: [{ label: "Initiate Contact", target: "#contact" }]
      };
    } else if (q.includes('education') || q.includes('college') || q.includes('study') || q.includes('degree') || q.includes('university')) {
      return {
        text: know.education,
        actions: [{ label: "View Journey & Timeline", target: "#journey" }]
      };
    } else if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('message')) {
      return {
        text: know.contact,
        actions: [{ label: "Transmit Direct Message", target: "#contact" }]
      };
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
      return {
        text: "Signal received loud and clear! I'm PUNIT-BOT. Ask me about Punit's engineering skills, projects, achievements, or reason to collaborate.",
        actions: []
      };
    } else if (q.includes('resume') || q.includes('cv')) {
      return {
        text: "Punit's profile is fully indexed in this Command Center! You can view his dossier in Section 1 or send a transmission for a formal copy.",
        actions: [{ label: "View About Section", target: "#about" }]
      };
    } else {
      return {
        text: know.default,
        actions: [
          { label: "View Skills", target: "#skills" },
          { label: "View Projects", target: "#projects" }
        ]
      };
    }
  }

  addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'navbot-msg navbot-msg-user';
    msg.innerHTML = `
      <div class="msg-bubble">${this.escapeHtml(text)}</div>
      <div class="msg-meta">OPERATOR // YOU</div>
    `;
    this.chatBody.appendChild(msg);
    this.scrollToBottom();
  }

  showThinkingIndicator() {
    const ind = document.createElement('div');
    ind.id = 'navbot-thinking';
    ind.className = 'navbot-msg navbot-msg-bot thinking';
    ind.innerHTML = `
      <div class="msg-bubble">
        <span class="pulse-dot"></span>
        <span class="pulse-dot"></span>
        <span class="pulse-dot"></span>
        <span class="thinking-text">NEURAL_DECODE...</span>
      </div>
    `;
    this.chatBody.appendChild(ind);
    this.scrollToBottom();
  }

  removeThinkingIndicator() {
    const ind = document.getElementById('navbot-thinking');
    if (ind) ind.remove();
  }

  addBotMessage(text, actions = []) {
    const msg = document.createElement('div');
    msg.className = 'navbot-msg navbot-msg-bot';

    // Format newlines into paragraphs or linebreaks
    const formattedText = this.formatBotText(text);

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = `<div class="msg-action-bar">` + 
        actions.map(act => `<button class="msg-action-btn" data-target="${act.target}">${act.label} &rarr;</button>`).join('') +
        `</div>`;
    }

    msg.innerHTML = `
      <div class="msg-sender-tag">
        <span class="bot-status-ring"></span> NAV-BOT // AI CORE
      </div>
      <div class="msg-bubble">${formattedText}</div>
      ${actionsHtml}
    `;

    this.chatBody.appendChild(msg);
    if (window.soundEngine) window.soundEngine.playSuccess();
    this.scrollToBottom();

    // Bind action button jumps
    msg.querySelectorAll('.msg-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-target');
        if (target) {
          const el = document.querySelector(target);
          if (el) {
            if (window.soundEngine) window.soundEngine.playClick();
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  formatBotText(str) {
    // Preserve linebreaks and bold bullets
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]/g, '<strong>[$1]</strong>');
  }

  scrollToBottom() {
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.navBot = new NavBot();
});
