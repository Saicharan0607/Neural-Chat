// ============================================
//   NeuralChat — AI/ML Product Intelligence Bot
//   app.js — Main Application Logic
// ============================================

const App = (() => {

  // ─── State ───────────────────────────────────
  let state = {
    apiKey: null,
    currentTopic: 'ml-models',
    currentTopicLabel: 'ML Models & Architectures',
    messages: [],           // { role, content, time }
    chatSessions: [],
    currentSessionId: null,
    isTyping: false,
    sidebarOpen: window.innerWidth > 768,
  };

  const TOPIC_LABELS = {
    'ml-models':  'ML Models & Architectures',
    'mlops':      'MLOps & Production Systems',
    'nlp':        'NLP & Language Models',
    'cv':         'Computer Vision',
    'data':       'Data Engineering',
    'cloud':      'Cloud AI Platforms',
    'interviews': 'FAANG ML Interviews',
  };

  // System prompt — makes Claude an expert AI/ML Product Assistant
  const SYSTEM_PROMPT = `You are NeuralChat, an expert AI/ML Product Intelligence Assistant specializing in helping engineers and researchers working at or interviewing for top product-based tech companies.

You have deep expertise in:

**Companies & Their AI/ML Products:**
- Google / DeepMind: TensorFlow, Vertex AI, TPUs, Bard/Gemini, Search, Maps ML
- Meta AI: PyTorch, LLaMA, FAISS, Recommendation Systems, AR/VR AI
- OpenAI: GPT-4, DALL-E, Whisper, API products, fine-tuning
- Amazon / AWS: SageMaker, Bedrock, Rekognition, Alexa, Kendra, Comprehend
- Microsoft / Azure: Azure ML, Cognitive Services, Copilot, GitHub Copilot
- Hugging Face: Transformers, Diffusers, Datasets, Spaces, Inference API
- Anthropic: Claude, Constitutional AI, RLHF
- Nvidia: CUDA, TensorRT, NeMo, Triton Inference Server
- Databricks: MLflow, Delta Lake, Mosaic AI
- Snowflake: Cortex AI, Snowpark ML

**Technical Expertise:**
- ML Fundamentals: supervised/unsupervised/RL, loss functions, optimization, regularization
- Deep Learning: CNNs, RNNs, Transformers, attention mechanisms, positional encoding
- LLMs: GPT architecture, BERT, T5, LLaMA, fine-tuning (LoRA, QLoRA, full FT), RLHF, RAG
- Computer Vision: object detection (YOLO, Faster RCNN), segmentation, GANs, diffusion models
- MLOps: CI/CD for ML, model versioning, monitoring, drift detection, feature stores
- Data Engineering: Spark, Airflow, dbt, data pipelines, feature engineering
- Cloud Platforms: AWS SageMaker, GCP Vertex AI, Azure ML — comparison and use cases
- System Design: ML system design for recommendation systems, search, fraud detection, ranking

**Interview Prep:**
- FAANG ML interview formats and common questions
- ML system design (e.g., design YouTube recommendation, Twitter feed, fraud detection)
- Coding problems in Python with ML focus
- Behavioral questions for ML roles

**Response Style:**
- Be technical but clear, structured with headers when helpful
- Use code examples (Python/PyTorch/TensorFlow) when relevant
- Compare approaches objectively
- Highlight real-world usage at top companies
- For interview questions, give structured STAR answers or framework-based approaches
- Format code in proper markdown code blocks with language tags
- Be concise but comprehensive — prioritize depth over breadth when asked specific questions`;

  // ─── Initialization ───────────────────────────
  function init() {
    drawNeuralCanvas();
    loadSessions();
    initSidebar();
    focusInput();
    checkApiKey();
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', closeContextMenu);
  }

  function checkApiKey() {
    // API key is auto-injected by Claude.ai environment
    // In standalone deployment, prompt user for key
    const savedKey = localStorage.getItem('nc_api_key');
    if (savedKey) {
      state.apiKey = savedKey;
    }
  }

  // ─── Neural Canvas Background ──────────────────
  function drawNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let animFrame;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    }

    function initNodes() {
      nodes = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2.5 + 1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${0.4 + glow * 0.5})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  // ─── Sidebar ──────────────────────────────────
  function initSidebar() {
    if (state.sidebarOpen) {
      document.getElementById('sidebar').classList.add('open');
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    state.sidebarOpen = !state.sidebarOpen;
    sidebar.classList.toggle('open', state.sidebarOpen);
  }

  function handleResize() {
    if (window.innerWidth > 768 && !state.sidebarOpen) {
      state.sidebarOpen = true;
      document.getElementById('sidebar').classList.add('open');
    }
  }

  // ─── Chat Sessions ────────────────────────────
  function loadSessions() {
    try {
      const stored = localStorage.getItem('nc_sessions');
      state.chatSessions = stored ? JSON.parse(stored) : [];
      renderHistory();
    } catch {}
  }

  function saveSessions() {
    try {
      localStorage.setItem('nc_sessions', JSON.stringify(state.chatSessions.slice(0, 30)));
    } catch {}
  }

  function newChat() {
    state.messages = [];
    state.currentSessionId = Date.now().toString();
    document.getElementById('messagesList').innerHTML = '';
    document.getElementById('welcomeScreen').style.display = 'flex';
    document.getElementById('welcomeScreen').style.flexDirection = 'column';
    focusInput();
  }

  function renderHistory() {
    const container = document.getElementById('chatHistory');
    if (!state.chatSessions.length) {
      container.innerHTML = `<div style="padding:12px 8px;font-size:11px;color:var(--text-muted);text-align:center;">No previous sessions</div>`;
      return;
    }
    container.innerHTML = state.chatSessions.slice(0, 15).map((s, i) => `
      <div class="history-item ${i === 0 ? 'active' : ''}" onclick="App.loadSession('${s.id}')">
        <div class="history-icon">💬</div>
        <div class="history-text">
          <span class="history-title">${escapeHtml(s.title)}</span>
          <span class="history-time">${formatTime(s.time)}</span>
        </div>
      </div>
    `).join('');
  }

  function loadSession(id) {
    const session = state.chatSessions.find(s => s.id === id);
    if (!session) return;
    state.messages = session.messages || [];
    state.currentSessionId = id;
    document.getElementById('welcomeScreen').style.display = 'none';
    const list = document.getElementById('messagesList');
    list.innerHTML = '';
    state.messages.forEach(m => appendMessageToDOM(m.role, m.content, m.time, false));
    scrollToBottom();
  }

  // ─── Topic ────────────────────────────────────
  function setTopic(topic) {
    state.currentTopic = topic;
    state.currentTopicLabel = TOPIC_LABELS[topic] || topic;

    document.getElementById('currentTopicLabel').textContent = state.currentTopicLabel;
    document.getElementById('inputContext').querySelector('.context-label').textContent =
      getTopicEmoji(topic) + ' ' + state.currentTopicLabel;

    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');

    // Update input placeholder
    document.getElementById('userInput').placeholder = `Ask about ${state.currentTopicLabel}...`;
  }

  function getTopicEmoji(topic) {
    const emojis = {
      'ml-models':'🧠','mlops':'⚙️','nlp':'💬','cv':'👁️',
      'data':'📊','cloud':'☁️','interviews':'🎯'
    };
    return emojis[topic] || '🤖';
  }

  function clearContext() {
    document.getElementById('inputContext').style.display = 'none';
  }

  // ─── Company Quick Ask ────────────────────────
  function askCompany(company) {
    sendMessage(`Tell me about ${company}'s AI/ML products, tech stack, and what makes their ML engineering culture unique.`);
  }

  function sendSuggestion(question) {
    sendMessage(question);
  }

  // ─── Message Sending ──────────────────────────
  async function sendMessage(overrideText) {
    const input = document.getElementById('userInput');
    const text = (overrideText || input.value).trim();
    if (!text || state.isTyping) return;

    // Hide welcome screen
    document.getElementById('welcomeScreen').style.display = 'none';

    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    state.messages.push({ role: 'user', content: text, time: timestamp });
    appendMessageToDOM('user', text, timestamp);

    if (!overrideText) {
      input.value = '';
      autoResize(input);
    }

    // Show typing indicator
    showTyping();
    state.isTyping = true;
    scrollToBottom();

    try {
      const response = await callClaudeAPI(text);
      hideTyping();
      state.isTyping = false;

      const botTime = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
      state.messages.push({ role: 'assistant', content: response, time: botTime });
      appendMessageToDOM('bot', response, botTime);

      // Save session
      saveCurrentSession(text);
      scrollToBottom();
    } catch (err) {
      hideTyping();
      state.isTyping = false;
      showError(err.message);
    }

    focusInput();
  }

  // ─── Claude API Call ──────────────────────────
  async function callClaudeAPI(userMessage) {
    // Build messages array for Claude API
    const apiMessages = state.messages.slice(-20).map(m => ({
      role: m.role === 'bot' ? 'assistant' : m.role,
      content: m.content,
    }));

    // Add topic context to user message
    const contextualMessage = state.currentTopic !== 'ml-models'
      ? `[Context: ${state.currentTopicLabel}]\n\n${userMessage}`
      : userMessage;

    // Replace last message with contextual version
    if (apiMessages.length > 0) {
      apiMessages[apiMessages.length - 1].content = contextualMessage;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(state.apiKey ? { 'x-api-key': state.apiKey } : {}),
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Anthropic API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit reached. Please wait a moment and try again.');
      }
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || 'No response received.';
  }

  // ─── DOM Rendering ────────────────────────────
  function appendMessageToDOM(role, content, time, animate = true) {
    const list = document.getElementById('messagesList');
    const div = document.createElement('div');
    div.className = `message ${role}`;
    if (!animate) div.style.animation = 'none';

    const initials = role === 'user' ? 'You' : '🤖';
    const formattedContent = role === 'bot' ? formatBotMessage(content) : escapeHtml(content);

    div.innerHTML = `
      <div class="msg-avatar">${role === 'user' ? 'YOU' : '🤖'}</div>
      <div class="msg-content">
        <div class="msg-bubble">${formattedContent}</div>
        <div class="msg-time">${time}</div>
        ${role === 'bot' ? `
          <div class="msg-actions">
            <button class="msg-action-btn" onclick="copyMessage(this)">📋 Copy</button>
            <button class="msg-action-btn" onclick="regenMessage(this)">🔄 Regenerate</button>
          </div>
        ` : ''}
      </div>
    `;

    list.appendChild(div);
  }

  function formatBotMessage(text) {
    // Process code blocks first
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || 'code';
      return `<div class="code-block-wrapper">
        <div class="code-header">
          <span class="code-lang">${language}</span>
          <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>${escapeHtml(code.trim())}</code></pre>
      </div>`;
    });

    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^# (.+)$/gm, '<h3>$1</h3>');

    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Bullet lists
    text = text.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Numbered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Paragraphs (blank lines)
    text = text.replace(/\n\n+/g, '</p><p>');
    text = '<p>' + text + '</p>';

    // Clean up empty paragraphs
    text = text.replace(/<p><\/p>/g, '');
    text = text.replace(/<p>(<[uh][l3])/g, '$1');
    text = text.replace(/(<\/[uh][l3]>)<\/p>/g, '$1');
    text = text.replace(/<p>(<div)/g, '$1');
    text = text.replace(/(<\/div>)<\/p>/g, '$1');

    // Line breaks within paragraphs
    text = text.replace(/\n/g, '<br>');

    return text;
  }

  function showTyping() {
    const list = document.getElementById('messagesList');
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.id = 'typingIndicator';
    div.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    list.appendChild(div);
  }

  function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  function showError(message) {
    const list = document.getElementById('messagesList');
    const div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = `
      <div class="msg-avatar">⚠️</div>
      <div class="msg-content">
        <div class="error-bubble">
          <strong>Error:</strong> ${escapeHtml(message)}
          <br><br>
          <small>Make sure your Anthropic API key is configured. Get one at <a href="https://console.anthropic.com" target="_blank" style="color:var(--accent-bright)">console.anthropic.com</a></small>
        </div>
      </div>
    `;
    list.appendChild(div);
    scrollToBottom();
  }

  // ─── Session Management ───────────────────────
  function saveCurrentSession(firstMessage) {
    if (!state.currentSessionId) {
      state.currentSessionId = Date.now().toString();
    }

    const title = firstMessage.length > 40
      ? firstMessage.substring(0, 40) + '...'
      : firstMessage;

    const existingIdx = state.chatSessions.findIndex(s => s.id === state.currentSessionId);
    const session = {
      id: state.currentSessionId,
      title,
      time: Date.now(),
      messages: state.messages,
      topic: state.currentTopic,
    };

    if (existingIdx >= 0) {
      state.chatSessions[existingIdx] = session;
    } else {
      state.chatSessions.unshift(session);
    }

    saveSessions();
    renderHistory();
  }

  // ─── UI Helpers ───────────────────────────────
  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }

  function scrollToBottom() {
    const container = document.getElementById('messagesContainer');
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }

  function focusInput() {
    document.getElementById('userInput').focus();
  }

  function clearChat() {
    if (!state.messages.length) return;
    if (confirm('Clear this conversation?')) {
      newChat();
    }
  }

  function showContextMenu() {
    const menu = document.getElementById('contextMenu');
    const btn = document.querySelector('.attach-btn');
    const rect = btn.getBoundingClientRect();
    menu.style.left = rect.left + 'px';
    menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
    menu.style.display = 'block';
  }

  function closeContextMenu(e) {
    if (!e.target.closest('.context-menu') && !e.target.closest('.attach-btn')) {
      document.getElementById('contextMenu').style.display = 'none';
    }
  }

  function pasteContext(type) {
    const templates = {
      'python-code': '```python\n# Paste your Python code here\n\n```\n\nWhat does this code do / how can I improve it?',
      'paper': 'I\'m reading a paper about: [PAPER TITLE]\n\nKey concepts I need explained: ',
      'job-desc': 'I found this ML job description:\n\n[PASTE JD HERE]\n\nWhat skills should I focus on and how do I prepare?',
      'error': '```\n# Paste your error/stack trace here\n\n```\n\nHow do I fix this error?',
    };
    const input = document.getElementById('userInput');
    input.value = templates[type] || '';
    autoResize(input);
    input.focus();
    document.getElementById('contextMenu').style.display = 'none';
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff/60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago';
    return Math.floor(diff/86400000) + 'd ago';
  }

  // ─── Global helpers (for inline onclick) ──────
  window.copyMessage = function(btn) {
    const bubble = btn.closest('.msg-content').querySelector('.msg-bubble');
    navigator.clipboard.writeText(bubble.innerText).then(() => {
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
    });
  };

  window.copyCode = function(btn) {
    const code = btn.closest('.code-block-wrapper').querySelector('code');
    navigator.clipboard.writeText(code.innerText).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    });
  };

  window.regenMessage = async function(btn) {
    if (state.isTyping) return;
    // Remove last bot message and regenerate
    const lastUserMsg = [...state.messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last assistant message from state
    const lastBotIdx = state.messages.findLastIndex(m => m.role === 'assistant');
    if (lastBotIdx >= 0) state.messages.splice(lastBotIdx, 1);

    // Remove from DOM
    const list = document.getElementById('messagesList');
    const messages = list.querySelectorAll('.message.bot');
    messages[messages.length - 1]?.remove();

    // Re-send
    await sendMessage(lastUserMsg.content);
  };

  // ─── Init ─────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  return {
    sendMessage: (t) => sendMessage(t),
    newChat,
    clearChat,
    setTopic,
    toggleSidebar,
    clearContext,
    askCompany,
    sendSuggestion,
    showContextMenu,
    pasteContext,
    handleKeydown,
    autoResize,
    loadSession,
  };

})();
