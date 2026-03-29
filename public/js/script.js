// ===== STATE =====
let selectedFile = null;
let progress = 0;
let currentStep = 0;
let progressInterval = null;

// ===== SECTIONS =====
const heroSection = document.getElementById('hero-section');
const uploadSection = document.getElementById('upload-section');
const analyzingSection = document.getElementById('analyzing-section');
const resultsSection = document.getElementById('results-section');

function hideAll() {
  [heroSection, uploadSection, analyzingSection, resultsSection].forEach(s => s.classList.add('hidden'));
}

function showUpload() {
  hideAll();
  uploadSection.classList.remove('hidden');
  uploadSection.scrollIntoView({ behavior: 'smooth' });
}

function resetApp() {
  selectedFile = null;
  progress = 0;
  currentStep = 0;
  document.getElementById('drop-zone').classList.remove('hidden');
  document.getElementById('file-info').classList.add('hidden');
  document.getElementById('analyze-btn').classList.add('hidden');
  hideAll();
  heroSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FILE UPLOAD =====
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragenter', (e) => { e.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.classList.remove('dragging'); });
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
  if (e.dataTransfer.files[0]) selectFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => { if (e.target.files[0]) selectFile(e.target.files[0]); });

function selectFile(file) {
  selectedFile = file;
  document.getElementById('file-name').textContent = file.name;
  document.getElementById('file-size').textContent = (file.size / 1024).toFixed(1) + ' KB • Ready to analyze';
  dropZone.classList.add('hidden');
  document.getElementById('file-info').classList.remove('hidden');
  document.getElementById('analyze-btn').classList.remove('hidden');
}

function clearFile() {
  selectedFile = null;
  fileInput.value = '';
  dropZone.classList.remove('hidden');
  document.getElementById('file-info').classList.add('hidden');
  document.getElementById('analyze-btn').classList.add('hidden');
}

// ===== ANALYSIS =====
function startAnalysis() {
  if (!selectedFile) return;
  hideAll();
  analyzingSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  progress = 0;
  currentStep = 0;
  updateSteps();

  progressInterval = setInterval(() => {
    progress += 0.8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(showResults, 600);
    }
    currentStep = progress < 25 ? 0 : progress < 55 ? 1 : progress < 85 ? 2 : 3;
    document.getElementById('progress-pct').textContent = Math.round(progress) + '%';
    document.getElementById('progress-bar').style.width = progress + '%';
    updateSteps();
  }, 50);
}

function updateSteps() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.classList.remove('active', 'done');
    const status = step.querySelector('.step-status');
    if (i < currentStep) {
      step.classList.add('done');
      status.innerHTML = '<span class="step-check">✓</span>';
    } else if (i === currentStep) {
      step.classList.add('active');
      status.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
    } else {
      status.innerHTML = '';
    }
  });
}

// ===== RESULTS =====
const mockResults = [
  { name: "Overall Impact", score: 82, gradient: "linear-gradient(90deg, hsl(168 76% 46%), hsl(190 70% 50%))", glow: "hsl(168 76% 46% / 0.4)", feedback: "Strong professional narrative with clear achievements." },
  { name: "Skills Match", score: 75, gradient: "linear-gradient(90deg, hsl(270 65% 58%), hsl(300 60% 55%))", glow: "hsl(270 65% 58% / 0.4)", feedback: "Good technical skills. Consider adding trending technologies." },
  { name: "Experience", score: 88, gradient: "linear-gradient(90deg, hsl(168 76% 46%), hsl(155 70% 48%))", glow: "hsl(168 76% 46% / 0.4)", feedback: "Excellent progression and quantified accomplishments!" },
  { name: "Formatting", score: 70, gradient: "linear-gradient(90deg, hsl(38 92% 55%), hsl(25 92% 55%))", glow: "hsl(38 92% 55% / 0.4)", feedback: "Clean layout. Add more white space for better readability." },
  { name: "Keywords & ATS", score: 65, gradient: "linear-gradient(90deg, hsl(270 65% 58%), hsl(245 70% 60%))", glow: "hsl(270 65% 58% / 0.4)", feedback: "Include more industry-specific keywords for ATS optimization." },
];

const skills = [
  { name: "React", level: "Expert", color: "teal" },
  { name: "TypeScript", level: "Advanced", color: "purple" },
  { name: "Node.js", level: "Advanced", color: "teal" },
  { name: "Python", level: "Intermediate", color: "purple" },
  { name: "AWS", level: "Intermediate", color: "warning" },
  { name: "Docker", level: "Beginner", color: "teal" },
  { name: "GraphQL", level: "Advanced", color: "purple" },
  { name: "SQL", level: "Expert", color: "teal" },
];

const quotes = [
  { text: "Your resume tells a story of growth and ambition — keep pushing boundaries!", icon: "🚀" },
  { text: "Every skill you've gained is a stepping stone to something extraordinary.", icon: "⭐" },
  { text: "You're not just looking for a job — you're building a legacy.", icon: "🏆" },
  { text: "The best investment you can make is in yourself. You're on the right track!", icon: "📈" },
];

function showResults() {
  hideAll();
  resultsSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const overallScore = Math.round(mockResults.reduce((a, b) => a + b.score, 0) / mockResults.length);

  // Animate score ring
  const circle = document.getElementById('score-circle');
  const scoreNum = document.getElementById('score-number');
  let currentScore = 0;
  const scoreAnim = setInterval(() => {
    currentScore += 1;
    if (currentScore > overallScore) { clearInterval(scoreAnim); return; }
    circle.setAttribute('stroke-dasharray', `${currentScore * 3.14} 314`);
    scoreNum.textContent = currentScore;
  }, 20);

  // Skills
  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = skills.map((s, i) =>
    `<span class="skill-pill skill-${s.color}" style="animation: fadeInUp 0.4s ease-out ${0.6 + i * 0.06}s both">${s.name}<span class="skill-level">• ${s.level}</span></span>`
  ).join('');

  // Categories
  const catContainer = document.getElementById('categories');
  catContainer.innerHTML = mockResults.map((cat, i) => {
    const scoreColor = cat.score > 80 ? 'hsl(168 76% 46%)' : cat.score > 70 ? 'hsl(38 92% 55%)' : 'hsl(0 72% 55%)';
    return `<div class="cat-item" style="animation: fadeInUp 0.4s ease-out ${0.6 + i * 0.08}s both">
      <div class="cat-row"><span class="cat-name">${cat.name}</span><span class="cat-score" style="color:${scoreColor}">${cat.score}/100</span></div>
      <div class="cat-bar-bg"><div class="cat-bar" id="cat-bar-${i}" style="background:${cat.gradient};box-shadow:0 0 12px ${cat.glow}"></div></div>
      <p class="cat-feedback">${cat.feedback}</p>
    </div>`;
  }).join('');

  // Animate bars after DOM update
  setTimeout(() => {
    mockResults.forEach((cat, i) => {
      const bar = document.getElementById(`cat-bar-${i}`);
      if (bar) bar.style.width = cat.score + '%';
    });
  }, 100);

  // Quotes
  const quotesGrid = document.getElementById('quotes-grid');
  quotesGrid.innerHTML = quotes.map((q, i) =>
    `<div class="quote-card card-glass" style="animation: fadeInUp 0.4s ease-out ${1.1 + i * 0.08}s both">
      <div class="quote-icon">${q.icon}</div>
      <p class="quote-text">"${q.text}"</p>
    </div>`
  ).join('');
}

// ===== CHATBOT =====
const chatbotResponses = [
  { keywords: ["hello", "hi", "hey", "hola"], response: "Hey there! 👋 How can I help you with your resume today?" },
  { keywords: ["score", "rating", "how did i do"], response: "Your resume score reflects multiple factors: impact, skills, experience, formatting, and ATS compatibility. Focus on quantifying achievements and using relevant keywords to boost it! 📊" },
  { keywords: ["ats", "tracking", "applicant"], response: "ATS (Applicant Tracking Systems) scan resumes for keywords. Tip: Mirror the job description's language, use standard section headers, and avoid images/tables. You'll pass with flying colors! ✅" },
  { keywords: ["skills", "skill"], response: "Great skills are your ticket! 🎯 List both hard skills (React, Python) and soft skills (leadership, communication). Match them to the job posting for maximum impact." },
  { keywords: ["format", "design", "layout", "template"], response: "Keep it clean and scannable: use clear headings, consistent fonts, bullet points, and plenty of white space. One page is ideal for <10 years of experience! 📄" },
  { keywords: ["experience", "work", "job"], response: "For each role, use the STAR method: Situation, Task, Action, Result. Quantify everything — 'Increased revenue by 30%' beats 'Helped improve sales'. 💼" },
  { keywords: ["tip", "advice", "improve", "better", "help"], response: "Here are my top 3 tips:\n1. 🎯 Tailor your resume for each job\n2. 📊 Use numbers to quantify achievements\n3. ✨ Start bullets with strong action verbs\nYou've got this!" },
  { keywords: ["summary", "objective", "profile"], response: "A strong summary is 2-3 lines highlighting your unique value. Lead with your strongest credential, mention key skills, and state your career goal. Make every word count! 🚀" },
  { keywords: ["thank", "thanks", "awesome", "great"], response: "You're welcome! 😊 Remember — every improvement to your resume brings you closer to your dream job. Keep going! 🌟" },
  { keywords: ["motivat", "inspire", "encouragement"], response: "You're already ahead of 90% of applicants just by optimizing your resume! 🔥 Every expert was once a beginner. Your potential is limitless — keep believing in yourself! 💪✨" },
];

const defaultResponses = [
  "That's a great question! For the best resume results, focus on clarity, relevance, and impact. Need specific advice? Just ask! 💡",
  "I'm here to help you shine! Try asking about ATS optimization, formatting tips, or how to improve your score. 🌟",
  "Interesting! While I specialize in resume advice, I can help with skills, experience, formatting, and more. What would you like to improve? 🚀",
];

function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  const icon = document.getElementById('chat-icon');
  chatbot.classList.toggle('hidden');
  icon.textContent = chatbot.classList.contains('hidden') ? '💬' : '✕';
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  addMessage(text, 'user');

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  addTyping(typingId);

  setTimeout(() => {
    removeTyping(typingId);
    const response = getResponse(text);
    addMessage(response, 'bot');
  }, 800 + Math.random() * 800);
}

function addMessage(text, role) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  div.style.animation = 'fadeInUp 0.3s ease-out';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addTyping(id) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = id;
  div.innerHTML = '<div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function getResponse(text) {
  const lower = text.toLowerCase();
  for (const r of chatbotResponses) {
    if (r.keywords.some(k => lower.includes(k))) return r.response;
  }
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}