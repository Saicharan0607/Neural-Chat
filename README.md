# 🧠 NeuralChat — AI/ML Product Intelligence Chatbot

> A production-ready, Claude-powered chatbot for AI/ML engineers targeting top product-based companies like Google, Meta, OpenAI, Amazon, Microsoft, and more.

![NeuralChat Preview](docs/preview.png)

---

## ✨ Features

- 🤖 **Claude-Powered** — Uses Anthropic's Claude API (claude-sonnet) for expert AI/ML responses
- 🏢 **Company-Focused** — Deep knowledge of Google DeepMind, Meta AI, OpenAI, AWS AI, Azure AI, Hugging Face
- 🧬 **Topic-Based Context** — Switch between ML Models, MLOps, NLP, Computer Vision, Data Engineering, Cloud AI, and Interview Prep
- 💬 **Chat History** — Sessions saved to localStorage, reload any past conversation
- 🎨 **Neural Canvas Background** — Animated neural network visualization
- 📋 **Code Highlighting** — Syntax-aware code blocks with copy button
- 🔄 **Message Regeneration** — Regenerate any bot response
- 📱 **Fully Responsive** — Works on mobile, tablet, desktop
- ⌨️ **Keyboard Shortcuts** — Enter to send, Shift+Enter for newline
- 📎 **Context Templates** — Quick paste for Python code, paper summaries, job descriptions, errors

---

## 🚀 Quick Start

### Option 1: Run Locally (No Build Required)

```bash
git clone https://github.com/saicharan0607/neuralchat-aiml-bot.git
cd neuralchat-aiml-bot
```

Open `index.html` in your browser — **that's it!**

> **Note**: You'll need an Anthropic API key. Get one free at [console.anthropic.com](https://console.anthropic.com)

### Option 2: Deploy to GitHub Pages

```bash
# 1. Fork this repository
# 2. Go to Settings → Pages
# 3. Set Source: Deploy from branch → main → / (root)
# 4. Your app will be live at: https://YOUR_USERNAME.github.io/neuralchat-aiml-bot
```

### Option 3: Deploy to Vercel / Netlify

Just drag and drop the project folder — it's pure HTML/CSS/JS, zero build needed.

---

## 🔑 API Key Setup

This chatbot uses the **Anthropic Claude API**. To get your key:

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create an account and generate an API key
3. Add it to the app (see below)

### Adding Your API Key

**Method A — In the code (for personal use):**
```javascript
// In src/app.js, find checkApiKey() function and add:
state.apiKey = 'sk-ant-YOUR_KEY_HERE';
```

**Method B — Environment variable (for deployment):**
Create a `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

> ⚠️ Never commit your API key to GitHub. Add `.env` to `.gitignore`

---

## 📁 Project Structure

```
neuralchat-aiml-bot/
├── index.html          # Main application entry point
├── src/
│   ├── app.js          # Core application logic & Claude API integration
│   └── styles.css      # Full CSS with animations & responsive design
├── docs/
│   └── preview.png     # Screenshot for README
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🧠 What NeuralChat Knows

### Companies & Products
| Company | Products Covered |
|---------|-----------------|
| **Google / DeepMind** | Vertex AI, TPUs, Gemini, TensorFlow, Bard, Search ML |
| **Meta AI** | PyTorch, LLaMA, FAISS, Recommendation Systems, AR/VR AI |
| **OpenAI** | GPT-4, DALL-E, Whisper, Embeddings API, Fine-tuning |
| **Amazon AWS** | SageMaker, Bedrock, Rekognition, Alexa, Kendra |
| **Microsoft Azure** | Azure ML, Cognitive Services, Copilot, GitHub Copilot |
| **Hugging Face** | Transformers, Diffusers, Datasets, Spaces, Inference API |
| **Databricks** | MLflow, Delta Lake, Mosaic AI |
| **Nvidia** | CUDA, TensorRT, NeMo, Triton Inference Server |

### Technical Topics
- **ML Fundamentals** — Supervised/Unsupervised/RL, optimization, regularization
- **Deep Learning** — CNNs, RNNs, Transformers, attention mechanisms
- **LLMs** — GPT, BERT, LLaMA, fine-tuning (LoRA, QLoRA), RLHF, RAG
- **Computer Vision** — YOLO, Faster RCNN, diffusion models, GANs
- **MLOps** — CI/CD for ML, model monitoring, feature stores, drift detection
- **Data Engineering** — Spark, Airflow, dbt, feature engineering
- **Cloud AI** — SageMaker vs Vertex AI vs Azure ML comparisons
- **System Design** — Recommendation systems, search, fraud detection, ranking

### Interview Prep
- FAANG ML interview question bank
- ML system design frameworks
- Python/PyTorch coding problems
- Behavioral questions for ML roles

---

## 💬 Example Prompts

```
🧠 "Explain the difference between LoRA and QLoRA fine-tuning for LLMs"

🏢 "What makes Meta's PyTorch ecosystem different from TensorFlow?"

⚙️ "Design a real-time fraud detection ML system for Amazon"

🎯 "What ML system design questions does Google ask in interviews?"

☁️ "Compare AWS SageMaker vs Google Vertex AI for production ML"

🔍 "When should I use RAG vs fine-tuning for an enterprise LLM?"

📊 "Explain how Netflix builds their recommendation system"

🤗 "How does Hugging Face Inference API work under the hood?"
```

---

## 🎨 Design

**Aesthetic:** Dark Neural / Sci-fi Terminal

- **Font:** Outfit (display) + JetBrains Mono (code)
- **Color:** Deep navy base (`#070B14`) with electric blue accent (`#3B82F6`)
- **Animation:** Animated neural network canvas with floating nodes & connections
- **Layout:** Sidebar + main chat with responsive collapse

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5 / CSS3 / JavaScript (ES6+) |
| **AI Backend** | Anthropic Claude API (claude-sonnet) |
| **Storage** | localStorage (chat history, sessions) |
| **Fonts** | Google Fonts (Outfit, JetBrains Mono) |
| **Deployment** | Static hosting (GitHub Pages, Vercel, Netlify) |
| **Build** | Zero-build — pure HTML/CSS/JS |

---

## 🔧 Customization

### Change AI Model
```javascript
// In src/app.js → callClaudeAPI()
model: 'claude-opus-4-5-20251101',   // More powerful
model: 'claude-haiku-4-5-20251001',  // Faster & cheaper
```

### Add New Topics
```javascript
// In src/app.js → TOPIC_LABELS
const TOPIC_LABELS = {
  'your-topic': 'Your Topic Name',
  // ...existing topics
};
```

### Modify System Prompt
Edit `SYSTEM_PROMPT` in `src/app.js` to change the bot's persona, expertise, and response style.

### Change Accent Color
```css
/* In src/styles.css */
:root {
  --accent: #your-color;
  --accent-glow: rgba(r, g, b, 0.3);
}
```

---

## 📊 Roadmap

- [ ] Voice input/output (Web Speech API)
- [ ] PDF upload for paper analysis
- [ ] Export chat as Markdown
- [ ] Multi-model support (GPT-4, Gemini)
- [ ] Interview mock session mode with scoring
- [ ] Dark/Light theme toggle
- [ ] Markdown export of conversations

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

Built as a portfolio project for AI/ML engineers.

---

## ⭐ If this helped you, please star the repository!

[![GitHub stars](https://img.shields.io/github/stars/saicharan0607/neuralchat-aiml-bot?style=social)](https://github.com/saicharan0607/neuralchat-aiml-bot)
