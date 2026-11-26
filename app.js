/**
 * Versant Passage Reconstruction Simulator
 * Features:
 * - 50-paragraph parser with automatic file fetch & bundled fallback
 * - 30-second reading phase & 90-second typing phase with top-right timer
 * - Side-by-side comparison view
 * - Versant 4-skills scoring engine (Grammar, Vocabulary, Organization, Content Retention) out of 100
 * - Prompt copying formatted for Copilot:
 *     original : "original content" ,  typed content : " typed content"
 * - Round-robin navigation (loops continuously)
 */

// Embedded fallback repository of all 50 passages (ensures 100% offline & file:// protocol compatibility)
const EMBEDDED_PASSAGES = [
  "The modern workplace is evolving rapidly as more companies adopt flexible hybrid models. Employees report higher satisfaction when they can balance remote work with in-person collaboration. However, managers must establish clear communication channels to prevent misunderstandings and maintain team cohesion. Regular video check-ins and shared digital dashboards have become essential tools for keeping distributed teams aligned and productive.",
  "Renewable energy sources such as solar and wind power are expanding at an unprecedented rate. Governments around the world are investing heavily in clean infrastructure to reduce reliance on fossil fuels. While initial installation costs remain significant, the long-term environmental benefits and declining equipment prices make sustainable power increasingly attractive for both residential and commercial consumers.",
  "Customer satisfaction plays a pivotal role in the sustained growth of any retail business. When shoppers encounter helpful staff and seamless checkout processes, they are far more likely to become repeat buyers. Conversely, unresolved complaints and delayed deliveries can quickly tarnish a brand's reputation. Investing in comprehensive customer service training ensures that every interaction reinforces trust.",
  "Urban planners are redesigning metropolitan areas to prioritize public transportation and pedestrian walkways. By reducing vehicle congestion in city centers, municipalities can significantly lower carbon emissions and improve air quality. Furthermore, expanding green spaces and dedicated cycling lanes encourages healthier lifestyles among urban residents, creating more livable communities.",
  "Effective time management is a critical skill for working professionals facing competing deadlines. Experts recommend prioritizing tasks based on urgency and importance rather than tackling assignments haphazardly. Utilizing structured techniques like time blocking prevents burnout and minimizes digital distractions, allowing individuals to maintain peak focus throughout the workday.",
  "Artificial intelligence is transforming the healthcare sector by accelerating disease diagnosis and treatment planning. Advanced algorithms can analyze medical imaging with remarkable precision, often identifying subtle abnormalities earlier than traditional methods. While human physicians remain indispensable for clinical judgment, technological assistance enhances diagnostic accuracy and patient outcomes.",
  "Financial literacy is fundamental for young adults entering the workforce and managing their personal finances. Learning how to construct a realistic monthly budget and avoid high-interest debt provides a stable foundation for future security. Financial advisors stress the importance of starting retirement savings early to capitalize on the compounding effects of long-term investments.",
  "Effective team leadership relies heavily on active listening and emotional intelligence rather than rigid authority. Leaders who solicit constructive feedback and acknowledge team contributions foster an environment of psychological safety. When employees feel valued and heard, their creative problem-solving abilities and overall engagement increase dramatically.",
  "Global supply chains have faced unprecedented disruptions in recent years due to geopolitical shifts and natural events. In response, multinational corporations are re-evaluating their logistics networks to build greater resilience. Many firms are diversifying suppliers and investing in local warehousing to mitigate shipping delays and protect inventory levels.",
  "Regular physical exercise combined with balanced nutrition provides immense benefits for cardiovascular health and cognitive clarity. Studies demonstrate that even moderate daily activities like brisk walking can substantially reduce stress hormones and elevate mood. Maintaining consistent habits over time is far more impactful than intermittent periods of extreme exertion.",
  "Digital privacy concerns continue to escalate as consumers share sensitive personal information across numerous online platforms. Cybersecurity specialists urge individuals to enable multi-factor authentication and use robust, unique passwords for every account. In addition, regulatory bodies are introducing stricter data governance policies to hold corporations accountable for security breaches.",
  "The widespread adoption of electric vehicles represents a monumental shift within the automotive industry. Major manufacturers are phasing out internal combustion engines in favor of zero-emission battery technologies. However, the widespread success of this transition depends on expanding charging networks and securing ethical supplies of raw materials.",
  "Cross-cultural communication has become a necessary competency in today's interconnected global marketplace. Business professionals frequently collaborate with international partners who hold diverse communication styles and business etiquette. Developing cultural awareness and patience prevents accidental offense and establishes durable commercial partnerships.",
  "Remote education platforms have broadened access to quality learning resources for students in underserved regions. Digital lecture archives and interactive virtual classrooms allow learners to master complex subjects at their own pace. Nevertheless, educators must address disparities in high-speed internet access to ensure equitable educational opportunities for all.",
  "Effective conflict resolution in the workplace requires objectivity, patience, and mutual respect among colleagues. When disagreements arise, parties should focus on addressing the core problem rather than resorting to personal accusations. Involving a neutral mediator often helps de-escalate tensions and facilitates constructive compromises.",
  "Water conservation is becoming an urgent priority for municipal authorities facing prolonged seasonal droughts. Cities are implementing stricter guidelines on residential irrigation and investing in modern wastewater recycling facilities. Educating communities on practical water-saving habits helps preserve vital reservoirs for future generations.",
  "Continuous professional development is vital for career longevity in an automated, fast-paced economy. Professionals must proactively acquire emerging technical skills and refine their critical thinking abilities. Forward-thinking companies actively sponsor workshops and credential programs to support internal mobility and employee retention.",
  "Sustainable agricultural practices are crucial for feeding a burgeoning global population without exhausting arable land. Techniques such as crop rotation, precision irrigation, and minimal soil tilling preserve topsoil fertility and conserve groundwater. These ecological methods demonstrate that agricultural productivity can coexist harmoniously with environmental stewardship.",
  "Project managers must balance project scope, timelines, and budgets to ensure successful execution. When client expectations change mid-project, managers must implement formal change control procedures to prevent scope creep. Maintaining transparent documentation keeps stakeholders informed and minimizes the risk of unexpected project overruns.",
  "Critical thinking enables individuals to evaluate information objectively and distinguish factual evidence from misleading claims. In an era dominated by rapid social media proliferation, discerning credible sources is more challenging than ever. Cultivating a skeptical, analytical mindset protects citizens from deceptive manipulation and biased narratives.",
  "Mentorship programs inside corporations provide junior employees with invaluable guidance and perspective. Experienced mentors share industry insights, offer honest feedback, and help protégés navigate challenging workplace dynamics. In turn, mentors frequently gain fresh viewpoints and refine their own leadership and advisory skills.",
  "Air quality inside corporate buildings directly influences employee cognitive performance and overall well-being. Poor ventilation systems often cause lethargy, headaches, and decreased workplace focus. Installing modern air purification filtration units and introducing indoor botanical elements can significantly enhance indoor workplace conditions.",
  "Budgeting software and automated banking tools have made personal financial planning simpler and more transparent. Users can track discretionary expenditures, schedule automatic savings transfers, and monitor debt reduction trajectories. Having instantaneous visual breakdowns of spending patterns encourages greater financial discipline and mindfulness.",
  "Scientific research into sleep hygiene emphasizes the importance of consistent sleeping schedules for memory consolidation. Irregular sleep patterns disrupt internal circadian rhythms, leading to compromised immunity and diminished mental alertness. Health practitioners advise eliminating electronic screen exposure at least one hour before bedtime.",
  "Small business enterprises play an indispensable role in stimulating economic vitality and fostering neighborhood innovation. Local businesses often reinvest a significant portion of their revenue back into municipal communities. Supporting homegrown merchants helps preserve unique cultural identities while generating local employment opportunities.",
  "Effective public speaking demands thorough preparation, confident body language, and audience awareness. Presenters who organize their arguments into clear, logical sections maintain audience engagement far better than those who ramble. Rehearsing in advance helps speakers manage stage anxiety and deliver their message with authority.",
  "Ocean conservation initiatives are focusing on reducing single-use plastic waste that pollutes marine ecosystems. Millions of tons of synthetic refuse enter waterways annually, threatening marine life and contaminating commercial food supplies. Collaborative international agreements are necessary to ban hazardous materials and promote biodegradable packaging alternatives.",
  "Collaborative problem-solving thrives when teams embrace cognitive diversity and welcome unconventional perspectives. When individuals from disparate backgrounds analyze a challenge, they uncover innovative solutions that homogenous groups often overlook. Encouraging open discourse without fear of ridicule is essential for breakthrough ingenuity.",
  "Cybersecurity hygiene in corporate settings is only as strong as the least vigilant employee. Cybercriminals frequently exploit human vulnerability through sophisticated email phishing schemes rather than breaching firewalls directly. Conducting periodic security simulations ensures staff recognize suspicious inquiries and report them immediately.",
  "E-commerce retail has revolutionized consumer behavior by offering unparalleled convenience and expansive product selections. Customers can compare merchandise reviews and secure competitive prices with a few clicks. However, traditional brick-and-mortar storefronts are responding by crafting memorable in-store sensory experiences that digital platforms cannot replicate.",
  "Stress management in high-pressure industries is essential for safeguarding mental health and preventing employee turnover. Organizations are increasingly offering wellness benefits, including meditation apps and counseling services. Encouraging reasonable working hours demonstrates that company leadership prioritizes long-term well-being alongside commercial targets.",
  "Biodiversity loss poses a grave threat to global ecological stability and agricultural resilience. The destruction of natural habitats endangers critical pollinators like bees, which are essential for crop reproduction. Protecting natural wildlife corridors and enforcing anti-deforestation laws are paramount steps in reversing this alarming trajectory.",
  "Effective negotiation in commerce requires thorough preparation and an understanding of the counterparty's core interests. Skilled negotiators seek win-win scenarios where both parties walk away with tangible strategic value. Establishing mutual trust during preliminary discussions paves the way for smooth contractual agreements.",
  "Telemedicine services have dismantled geographical barriers to quality clinical care for rural populations. Patients can consult board-certified specialists through encrypted video calls without undertaking strenuous long-distance travel. This technological evolution reduces hospital congestion while delivering timely medical interventions.",
  "Workplace ergonomics plays a decisive role in preventing chronic musculoskeletal injuries among computer operators. Properly configured desk heights, lumbar support chairs, and monitor angles alleviate strain on the spine and wrists. Companies that invest in ergonomic assessments see a measurable decline in health-related absences.",
  "Corporate ethics policies must be backed by transparent accountability mechanisms rather than existing merely as public relations statements. When executives hold themselves to the highest standards of integrity, ethical behavior permeates the entire organizational culture. Whistleblower protection frameworks empower employees to expose misconduct without fear of retaliation.",
  "Microfinance initiatives have empowered aspiring entrepreneurs in developing nations to launch self-sustaining micro-enterprises. Access to modest capital loans enables individuals to purchase raw materials, equipment, and livestock. By fostering economic self-reliance, microfinance acts as a potent catalyst for poverty alleviation.",
  "Public libraries have transformed from quiet book repositories into dynamic community technology hubs. Modern branches offer complimentary internet access, digital literacy workshops, and maker spaces equipped with 3D printers. These civic institutions bridge the digital divide by providing equal educational access to all citizens.",
  "Food waste constitutes a massive economic and environmental inefficiency across modern food supply chains. Supermarkets and consumers discard vast quantities of edible groceries due to cosmetic imperfections and misunderstood expiration dates. Community redistribution programs and composting networks are emerging as sensible solutions to mitigate this issue.",
  "Creative thinking is not an innate talent reserved for artists, but a deliberate cognitive skill that can be cultivated. Engaging in divergent thinking exercises and exposing oneself to novel domains stimulates mental flexibility. When individuals question underlying assumptions, they discover fresh avenues for resolving stubborn problems.",
  "Urban vertical farming is transforming food production by growing crops in vertically stacked layers within climate-controlled facilities. This method uses significantly less land and up to ninety percent less water than conventional agriculture. By producing fresh produce near city centers, vertical farms drastically reduce transit emissions and food spoilage.",
  "Transparent corporate communication during times of crisis is paramount for preserving customer trust and brand equity. Organizations that admit shortcomings promptly and present concrete remediation plans recover far quicker than those attempting cover-ups. Sincerity and prompt action resonate positively with modern consumers.",
  "The transition to cashless economies offers unprecedented transaction efficiency, enhanced accounting accuracy, and reduced physical theft. Mobile payment applications enable seamless peer-to-peer transfers and rapid merchant settlements. Nevertheless, financial authorities must ensure that elderly and unbanked populations are not marginalized by rapid digitization.",
  "Environmental impact assessments are mandatory evaluations conducted before commencing major infrastructure projects. Independent scientists examine potential disruption to local wildlife habitats, water tables, and air quality metrics. These comprehensive analyses ensure developers integrate sustainable safeguards before breaking ground.",
  "Constructive feedback should be specific, actionable, and delivered promptly following an observable event. Vague criticism tends to foster defensiveness and confusion rather than positive behavioral modification. Focusing on observable behaviors and their consequences helps recipients understand how to enhance their future performance.",
  "Nanotechnology is opening groundbreaking frontiers in materials science, electronics, and targeted cancer therapies. By manipulating matter at the molecular scale, engineers can create materials with extraordinary strength and electrical conductivity. Ongoing scientific research promises breakthroughs in energy storage and water purification membranes.",
  "Civic engagement is the cornerstone of healthy democratic societies and responsive governmental institutions. When citizens participate in local municipal hearings, community organizing, and voting, public policies better reflect collective needs. Fostering civic responsibility in schools prepares younger generations for active participation in public affairs.",
  "Effective inventory management prevents capital from being tied up in unsold merchandise while avoiding costly stockouts. Utilizing automated predictive analytics allows retail businesses to anticipate seasonal demand spikes with precision. Maintaining optimal inventory buffers balances supply reliability with cash flow health.",
  "Mindfulness and meditation practices have gained widespread acceptance as practical techniques for combating everyday anxiety. Taking several minutes each morning to practice intentional breathing anchors the mind and improves emotional regulation. Over time, practitioners report sharper focus, increased patience, and greater resilience when facing stressful challenges.",
  "The shift toward lifelong learning is essential in an era of rapid technological disruption and workplace automation. Professionals can no longer rely solely on formal degrees earned decades earlier to sustain their careers. Embracing curiosity, pursuing self-directed study, and adapting to industry shifts are key attributes of modern success."
];

// Application State
const state = {
  passages: [...EMBEDDED_PASSAGES],
  currentIndex: 0,
  phase: 'READING', // 'READING', 'TYPING', 'REVIEW'
  readingTimeLeft: 30,
  typingTimeLeft: 90,
  timerInterval: null,
  typingStartTime: null,
  typedText: '',
  audioEnabled: true
};

// Constant Timer Limits (Seconds)
const READING_DURATION = 30;
const TYPING_DURATION = 90;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 28; // 175.929 px

// DOM Elements Cache
const elements = {
  // Top bar & round robin
  currentPassageNum: document.getElementById('currentPassageNum'),
  totalPassagesNum: document.getElementById('totalPassagesNum'),
  passageSelect: document.getElementById('passageSelect'),
  
  // Timer Banner
  timerBanner: document.getElementById('timerBanner'),
  phasePill: document.getElementById('phasePill'),
  phaseTitle: document.getElementById('phaseTitle'),
  phaseInstruction: document.getElementById('phaseInstruction'),
  timerRing: document.getElementById('timerRing'),
  timerDigits: document.getElementById('timerDigits'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  soundIcon: document.getElementById('soundIcon'),
  fullscreenBtn: document.getElementById('fullscreenBtn'),
  fullscreenIcon: document.getElementById('fullscreenIcon'),
  
  // Views
  readingView: document.getElementById('readingView'),
  typingView: document.getElementById('typingView'),
  reviewView: document.getElementById('reviewView'),
  
  // Reading View Elements
  readingPassageText: document.getElementById('readingPassageText'),
  readingWordCount: document.getElementById('readingWordCount'),
  startWritingEarlyBtn: document.getElementById('startWritingEarlyBtn'),
  
  // Typing View Elements
  reconstructionInput: document.getElementById('reconstructionInput'),
  typingWordCount: document.getElementById('typingWordCount'),
  typingCharCount: document.getElementById('typingCharCount'),
  submitTypingBtn: document.getElementById('submitTypingBtn'),
  
  // Review View Elements
  scoreOverall: document.getElementById('scoreOverall'),
  scoreBadgeText: document.getElementById('scoreBadgeText'),
  scoreVersantScale: document.getElementById('scoreVersantScale'),
  
  // 4 Skills elements
  grammarScore: document.getElementById('grammarScore'),
  grammarBar: document.getElementById('grammarBar'),
  grammarFeedback: document.getElementById('grammarFeedback'),
  
  vocabScore: document.getElementById('vocabScore'),
  vocabBar: document.getElementById('vocabBar'),
  vocabFeedback: document.getElementById('vocabFeedback'),
  
  orgScore: document.getElementById('orgScore'),
  orgBar: document.getElementById('orgBar'),
  orgFeedback: document.getElementById('orgFeedback'),
  
  contentScore: document.getElementById('contentScore'),
  contentBar: document.getElementById('contentBar'),
  contentFeedback: document.getElementById('contentFeedback'),
  
  // Comparison boxes
  originalCompareText: document.getElementById('originalCompareText'),
  originalWordCount: document.getElementById('originalWordCount'),
  typedCompareText: document.getElementById('typedCompareText'),
  typedWordCount: document.getElementById('typedWordCount'),
  wpmStat: document.getElementById('wpmStat'),
  
  // Copilot prompt & copy
  copilotPromptSnippet: document.getElementById('copilotPromptSnippet'),
  copyPromptBtn: document.getElementById('copyPromptBtn'),
  copyDetailedPromptBtn: document.getElementById('copyDetailedPromptBtn'),
  
  // Round Robin controls
  nextPassageBtn: document.getElementById('nextPassageBtn'),
  prevPassageBtn: document.getElementById('prevPassageBtn'),
  retryPassageBtn: document.getElementById('retryPassageBtn'),
  
  // Toast
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toastMessage')
};

// Web Audio API Sound Synthesizer (Zero External Dependencies)
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  
  playTone(freq, type = 'sine', duration = 0.15, vol = 0.08) {
    if (!state.audioEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
  
  tick() {
    this.playTone(880, 'sine', 0.06, 0.04);
  }
  
  phaseTransition() {
    this.playTone(523.25, 'triangle', 0.12, 0.07); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.18, 0.08), 120); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.09), 240); // G5
  }
  
  completeChime() {
    this.playTone(587.33, 'triangle', 0.15, 0.08); // D5
    setTimeout(() => this.playTone(880, 'triangle', 0.35, 0.09), 150); // A5
  }
}

const sounds = new SoundFX();

// -------------------------------------------------------------
// Initialization & Loading
// -------------------------------------------------------------
async function initApp() {
  await loadParagraphs();
  populateDropdown();
  setupEventListeners();
  loadCurrentPassage();
}

/**
 * Attempts to fetch Paragraph.txt. Falls back to EMBEDDED_PASSAGES if offline or CORS blocked.
 */
async function loadParagraphs() {
  try {
    const response = await fetch('Paragraph.txt');
    if (response.ok) {
      const text = await response.text();
      const parsed = text
        .split(/_{5,}/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
      
      if (parsed.length > 0) {
        state.passages = parsed;
        console.log(`Loaded ${parsed.length} paragraphs from Paragraph.txt.`);
      }
    }
  } catch (err) {
    console.warn("Could not fetch Paragraph.txt directly (normal on local file://). Using embedded passages repository.", err);
    state.passages = [...EMBEDDED_PASSAGES];
  }
  
  if (elements.totalPassagesNum) {
    elements.totalPassagesNum.textContent = state.passages.length;
  }
}

/**
 * Populates the Jump to Passage dropdown.
 */
function populateDropdown() {
  if (!elements.passageSelect) return;
  elements.passageSelect.innerHTML = '';
  state.passages.forEach((_, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `Passage ${idx + 1}`;
    elements.passageSelect.appendChild(opt);
  });
}

/**
 * Loads the current passage based on state.currentIndex and starts Reading Phase.
 */
function loadCurrentPassage() {
  clearInterval(state.timerInterval);
  
  // Bound check
  if (state.currentIndex >= state.passages.length) {
    state.currentIndex = 0;
  } else if (state.currentIndex < 0) {
    state.currentIndex = state.passages.length - 1;
  }
  
  // Update header badges
  if (elements.currentPassageNum) {
    elements.currentPassageNum.textContent = state.currentIndex + 1;
  }
  if (elements.passageSelect) {
    elements.passageSelect.value = state.currentIndex;
  }
  
  // Set Phase to READING
  startReadingPhase();
}

// -------------------------------------------------------------
// Phase 1: Reading (30 Seconds)
// -------------------------------------------------------------
function startReadingPhase() {
  state.phase = 'READING';
  state.readingTimeLeft = READING_DURATION;
  clearInterval(state.timerInterval);
  
  const original = state.passages[state.currentIndex];
  
  // Show reading view, hide others
  elements.readingView.style.display = 'block';
  elements.typingView.style.display = 'none';
  elements.reviewView.style.display = 'none';
  
  // Display text & stats
  elements.readingPassageText.textContent = original;
  const words = original.trim().split(/\s+/).filter(Boolean).length;
  elements.readingWordCount.textContent = `${words} words`;
  
  // Reset input field
  elements.reconstructionInput.value = '';
  updateTypingStats();
  
  // Setup timer banner UI
  updateTimerBannerUI('reading', 'READING PHASE', 'Read and memorize the passage carefully. You will reconstruct it in your own words next.');
  updateTimerDisplay(state.readingTimeLeft, READING_DURATION);
  
  // Play subtle sound
  sounds.playTone(440, 'sine', 0.1, 0.05);
  
  // Start countdown
  state.timerInterval = setInterval(() => {
    state.readingTimeLeft--;
    updateTimerDisplay(state.readingTimeLeft, READING_DURATION);
    
    // Countdown audio alert for last 3 seconds
    if (state.readingTimeLeft <= 3 && state.readingTimeLeft > 0) {
      sounds.tick();
    }
    
    if (state.readingTimeLeft <= 0) {
      clearInterval(state.timerInterval);
      sounds.phaseTransition();
      startTypingPhase();
    }
  }, 1000);
}

// -------------------------------------------------------------
// Phase 2: Typing / Reconstruction (90 Seconds)
// -------------------------------------------------------------
function startTypingPhase() {
  state.phase = 'TYPING';
  state.typingTimeLeft = TYPING_DURATION;
  state.typingStartTime = Date.now();
  clearInterval(state.timerInterval);
  
  // Hide reading view, show typing view
  elements.readingView.style.display = 'none';
  elements.typingView.style.display = 'block';
  elements.reviewView.style.display = 'none';
  
  // Focus textarea
  setTimeout(() => {
    elements.reconstructionInput.focus();
  }, 50);
  
  // Setup timer banner UI
  updateTimerBannerUI('typing', 'TYPING PHASE', 'Type the paragraph in your own words. Focus on meaning, accuracy, and clear organization.');
  updateTimerDisplay(state.typingTimeLeft, TYPING_DURATION);
  
  // Countdown interval
  state.timerInterval = setInterval(() => {
    state.typingTimeLeft--;
    updateTimerDisplay(state.typingTimeLeft, TYPING_DURATION);
    
    if (state.typingTimeLeft <= 5 && state.typingTimeLeft > 0) {
      sounds.tick();
    }
    
    if (state.typingTimeLeft <= 0) {
      clearInterval(state.timerInterval);
      completeTypingPhase();
    }
  }, 1000);
}

function updateTypingStats() {
  const text = elements.reconstructionInput.value;
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  elements.typingWordCount.textContent = words;
  elements.typingCharCount.textContent = text.length;
}

function completeTypingPhase() {
  clearInterval(state.timerInterval);
  state.typedText = elements.reconstructionInput.value.trim();
  sounds.completeChime();
  evaluateAndShowResults();
}

// -------------------------------------------------------------
// Phase 3: Review, Comparison & Versant 4 Skills Evaluation
// -------------------------------------------------------------
function evaluateAndShowResults() {
  state.phase = 'REVIEW';
  
  // Switch Views
  elements.readingView.style.display = 'none';
  elements.typingView.style.display = 'none';
  elements.reviewView.style.display = 'block';
  
  // Update Timer Banner to Completed state
  elements.timerBanner.className = 'timer-display-dock';
  elements.phasePill.className = 'phase-pill review';
  elements.phasePill.textContent = 'COMPLETED';
  if (elements.phaseTitle) elements.phaseTitle.textContent = 'Passage Review';
  if (elements.phaseInstruction) elements.phaseInstruction.textContent = 'Score generated across 4 Versant skills.';
  elements.timerDigits.textContent = 'DONE';
  elements.timerRing.style.strokeDashoffset = 0;
  elements.timerRing.style.stroke = '#7e22ce';
  
  const original = state.passages[state.currentIndex];
  const typed = state.typedText;
  
  // Calculate WPM
  const timeTakenSeconds = Math.max(1, TYPING_DURATION - Math.max(0, state.typingTimeLeft));
  const wordsTyped = typed ? typed.split(/\s+/).filter(Boolean).length : 0;
  const wpm = Math.round((wordsTyped / timeTakenSeconds) * 60);
  
  // Update Comparison Boxes
  elements.originalCompareText.textContent = original;
  const origWords = original.split(/\s+/).filter(Boolean).length;
  elements.originalWordCount.textContent = `${origWords} words`;
  
  elements.typedCompareText.textContent = typed || '(No text submitted)';
  elements.typedWordCount.textContent = `${wordsTyped} words`;
  elements.wpmStat.textContent = `${wpm} WPM (${timeTakenSeconds}s)`;
  
  // Highlight keyword retention in original and typed
  highlightComparison(original, typed);
  
  // Run Versant 4-Skills Evaluation Engine
  const evaluation = computeVersantEvaluation(original, typed);
  
  // Update Score Board UI
  elements.scoreOverall.textContent = evaluation.totalScore;
  elements.scoreBadgeText.textContent = evaluation.badge;
  elements.scoreVersantScale.textContent = `Versant Scale: ${evaluation.versantScore} / 80 | CEFR: ${evaluation.cefr}`;
  
  // 1. Grammar
  elements.grammarScore.textContent = `${evaluation.grammar.score} / 25`;
  elements.grammarBar.style.width = `${(evaluation.grammar.score / 25) * 100}%`;
  elements.grammarFeedback.textContent = evaluation.grammar.feedback;
  
  // 2. Vocabulary
  elements.vocabScore.textContent = `${evaluation.vocab.score} / 25`;
  elements.vocabBar.style.width = `${(evaluation.vocab.score / 25) * 100}%`;
  elements.vocabFeedback.textContent = evaluation.vocab.feedback;
  
  // 3. Organization
  elements.orgScore.textContent = `${evaluation.org.score} / 25`;
  elements.orgBar.style.width = `${(evaluation.org.score / 25) * 100}%`;
  elements.orgFeedback.textContent = evaluation.org.feedback;
  
  // 4. Content Retention
  elements.contentScore.textContent = `${evaluation.content.score} / 25`;
  elements.contentBar.style.width = `${(evaluation.content.score / 25) * 100}%`;
  elements.contentFeedback.textContent = evaluation.content.feedback;
  
  // Format the exact user-requested Copilot prompt:
  // original : "original content" ,  typed content : " typed content"
  const formattedPrompt = `original : "${original}" ,  typed content : " ${typed}"`;
  elements.copilotPromptSnippet.textContent = formattedPrompt;
  
  // Smooth scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------------------------------------------
// Versant 4-Skills Evaluation Engine
// -------------------------------------------------------------
function computeVersantEvaluation(original, typed) {
  if (!typed || typed.trim().length === 0) {
    return {
      totalScore: 0,
      versantScore: 20,
      cefr: 'Pre-A1',
      badge: 'No Response',
      grammar: { score: 0, feedback: 'No text submitted to evaluate.' },
      vocab: { score: 0, feedback: 'No text submitted.' },
      org: { score: 0, feedback: 'No text submitted.' },
      content: { score: 0, feedback: 'No core ideas were captured.' }
    };
  }
  
  const origTokens = tokenize(original);
  const typedTokens = tokenize(typed);
  
  // --- 1. Content Retention & Meaning (Max 25 pts) ---
  const stopWords = new Set([
    'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
    'from','up','about','into','over','after','is','am','are','was','were','be',
    'been','being','have','has','had','do','does','did','can','could','will','would',
    'shall','should','may','might','must','that','this','these','those','it','its',
    'they','them','their','we','us','our','you','your','he','him','his','she','her',
    'as','so','than','too','very','more','most','also'
  ]);
  
  const origKeywords = origTokens.filter(t => !stopWords.has(t) && t.length > 2);
  const uniqueOrigKeywords = [...new Set(origKeywords)];
  
  const typedSet = new Set(typedTokens);
  let matchedKeywords = 0;
  uniqueOrigKeywords.forEach(kw => {
    // Check exact or stem-like match
    const stem = kw.slice(0, Math.max(3, kw.length - 2));
    const hasMatch = Array.from(typedSet).some(tt => tt.includes(stem) || stem.includes(tt));
    if (hasMatch) matchedKeywords++;
  });
  
  const coverageRatio = uniqueOrigKeywords.length > 0 ? (matchedKeywords / uniqueOrigKeywords.length) : 0;
  let contentPts = Math.min(25, Math.round(coverageRatio * 25));
  
  // Penalize extreme brevity
  if (typedTokens.length < 15) {
    contentPts = Math.min(contentPts, Math.round(typedTokens.length * 0.7));
  }
  
  let contentFeedback = '';
  if (contentPts >= 22) {
    contentFeedback = `Superb content fidelity! Captured ${matchedKeywords} of ${uniqueOrigKeywords.length} primary ideas and themes accurately.`;
  } else if (contentPts >= 16) {
    contentFeedback = `Good retention (${matchedKeywords}/${uniqueOrigKeywords.length} key concepts). Most critical propositions were preserved.`;
  } else if (contentPts >= 10) {
    contentFeedback = `Partial retention (${matchedKeywords}/${uniqueOrigKeywords.length} key concepts). Try to capture more supporting details.`;
  } else {
    contentFeedback = `Limited idea retention. Review the passage themes and ensure all essential arguments are conveyed.`;
  }
  
  // --- 2. Grammar & Sentence Mastery (Max 25 pts) ---
  const sentences = typed.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
  let grammarPts = 25;
  const grammarDeductions = [];
  
  // Sentence capitalization check
  let capErrors = 0;
  sentences.forEach(s => {
    const trimmed = s.trim();
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase() && !/^\d/.test(trimmed)) {
      capErrors++;
    }
  });
  if (capErrors > 0) {
    const ded = Math.min(6, capErrors * 2);
    grammarPts -= ded;
    grammarDeductions.push(`${capErrors} uncapitalized sentence start(s)`);
  }
  
  // Punctuation check (does last sentence have a terminal punctuation?)
  const trimmedTyped = typed.trim();
  if (!/[.!?]$/.test(trimmedTyped)) {
    grammarPts -= 3;
    grammarDeductions.push('Missing terminal punctuation');
  }
  
  // Sentence length & run-on/fragment analysis
  const avgWordsPerSentence = typedTokens.length / Math.max(1, sentences.length);
  if (avgWordsPerSentence > 35) {
    grammarPts -= 4;
    grammarDeductions.push('Contains very long/run-on sentences');
  } else if (avgWordsPerSentence < 4 && typedTokens.length >= 10) {
    grammarPts -= 3;
    grammarDeductions.push('Choppy sentence fragments');
  }
  
  // Double spaces or irregular punctuation
  if (/\s{2,}/.test(typed) || /[,;]{2,}/.test(typed)) {
    grammarPts -= 2;
    grammarDeductions.push('Minor spacing or punctuation irregularities');
  }
  
  grammarPts = Math.max(0, Math.min(25, grammarPts));
  let grammarFeedback = grammarDeductions.length === 0
    ? 'Excellent grammatical accuracy and clean syntactic sentence boundaries.'
    : `Good syntactic control with minor notes: ${grammarDeductions.join(', ')}.`;
    
  // --- 3. Vocabulary & Lexical Resource (Max 25 pts) ---
  const uniqueTyped = new Set(typedTokens);
  const ttr = typedTokens.length > 0 ? (uniqueTyped.size / typedTokens.length) : 0; // Type-Token Ratio
  
  // Measure word length sophistication
  const totalCharLen = typedTokens.reduce((sum, w) => sum + w.length, 0);
  const avgWordLen = typedTokens.length > 0 ? (totalCharLen / typedTokens.length) : 0;
  
  let vocabPts = 10;
  // Diversity points
  if (ttr >= 0.70) vocabPts += 9;
  else if (ttr >= 0.55) vocabPts += 7;
  else if (ttr >= 0.40) vocabPts += 4;
  else vocabPts += 1;
  
  // Complexity points (academic word length)
  if (avgWordLen >= 5.3) vocabPts += 6;
  else if (avgWordLen >= 4.6) vocabPts += 4;
  else vocabPts += 2;
  
  if (typedTokens.length < 15) {
    vocabPts = Math.min(vocabPts, Math.round(typedTokens.length * 0.8));
  }
  vocabPts = Math.max(0, Math.min(25, vocabPts));
  
  let vocabFeedback = '';
  if (vocabPts >= 22) {
    vocabFeedback = `Rich lexical diversity (TTR: ${(ttr * 100).toFixed(0)}%) with sophisticated professional terminology.`;
  } else if (vocabPts >= 16) {
    vocabFeedback = `Good lexical variety and appropriate register. Good balance between common and academic words.`;
  } else {
    vocabFeedback = `Adequate vocabulary. Try utilizing more precise synonyms and varied descriptive terms.`;
  }
  
  // --- 4. Organization & Cohesion (Max 25 pts) ---
  const cohesiveMarkers = [
    'however','therefore','furthermore','in addition','moreover','consequently',
    'while','conversely','similarly','nevertheless','in turn','as a result',
    'subsequently','overall','in contrast','on the other hand','for example',
    'although','meanwhile','thus','hence','because'
  ];
  
  const lowerTyped = typed.toLowerCase();
  let foundMarkers = 0;
  cohesiveMarkers.forEach(cm => {
    if (lowerTyped.includes(cm)) foundMarkers++;
  });
  
  let orgPts = 12;
  // Transition bonus
  if (foundMarkers >= 3) orgPts += 8;
  else if (foundMarkers >= 1) orgPts += 5;
  else orgPts += 2;
  
  // Proportional balance to original length
  const lengthRatio = typedTokens.length / Math.max(1, origTokens.length);
  if (lengthRatio >= 0.7 && lengthRatio <= 1.3) {
    orgPts += 5;
  } else if (lengthRatio >= 0.4 && lengthRatio <= 1.6) {
    orgPts += 3;
  } else {
    orgPts += 1;
  }
  
  if (typedTokens.length < 15) {
    orgPts = Math.min(orgPts, Math.round(typedTokens.length * 0.7));
  }
  orgPts = Math.max(0, Math.min(25, orgPts));
  
  let orgFeedback = '';
  if (orgPts >= 21) {
    orgFeedback = `Cohesive logical flow with clear transitions and well-proportioned ideas.`;
  } else if (orgPts >= 15) {
    orgFeedback = `Clear structure. Adding linking phrases (e.g., "furthermore", "however") will improve fluency.`;
  } else {
    orgFeedback = `Basic paragraph flow. Organize clauses into sequenced ideas connected by transition words.`;
  }
  
  // --- Total & Overall Scaled Score ---
  const totalScore = Math.max(0, Math.min(100, contentPts + grammarPts + vocabPts + orgPts));
  
  // Versant scale is 20 to 80
  const versantScore = Math.round(20 + (totalScore / 100) * 60);
  
  // CEFR Benchmark
  let cefr = 'B1';
  let badge = 'Competent';
  if (totalScore >= 88) {
    cefr = 'C2';
    badge = 'Mastery';
  } else if (totalScore >= 75) {
    cefr = 'C1';
    badge = 'Effective Operational';
  } else if (totalScore >= 60) {
    cefr = 'B2';
    badge = 'Vantage (Proficient)';
  } else if (totalScore >= 45) {
    cefr = 'B1';
    badge = 'Threshold (Intermediate)';
  } else if (totalScore >= 30) {
    cefr = 'A2';
    badge = 'Waystage (Elementary)';
  } else {
    cefr = 'A1';
    badge = 'Novice / Beginner';
  }
  
  return {
    totalScore,
    versantScore,
    cefr,
    badge,
    grammar: { score: grammarPts, feedback: grammarFeedback },
    vocab: { score: vocabPts, feedback: vocabFeedback },
    org: { score: orgPts, feedback: orgFeedback },
    content: { score: contentPts, feedback: contentFeedback }
  };
}

/**
 * Tokenizes text into lowercase words.
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Highlights matched keywords between original and typed in the comparison view.
 */
function highlightComparison(original, typed) {
  if (!typed) return;
  const typedLower = typed.toLowerCase();
  const words = original.split(/(\s+|[.,;!?]+)/);
  
  const highlighted = words.map(w => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 3 && typedLower.includes(clean)) {
      return `<mark class="matched-kw">${escapeHtml(w)}</mark>`;
    }
    return escapeHtml(w);
  }).join('');
  
  elements.originalCompareText.innerHTML = highlighted;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// -------------------------------------------------------------
// UI Timer & Banner Updates
// -------------------------------------------------------------
function updateTimerBannerUI(phaseClass, title, instruction) {
  elements.timerBanner.className = `timer-display-dock ${phaseClass}`;
  elements.phasePill.className = `phase-pill ${phaseClass}`;
  elements.phasePill.textContent = phaseClass === 'reading' ? 'READING (30s)' : 'TYPING (90s)';
  if (elements.phaseTitle) elements.phaseTitle.textContent = title;
  if (elements.phaseInstruction) elements.phaseInstruction.textContent = instruction;
}

function updateTimerDisplay(secondsLeft, totalSeconds) {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  elements.timerDigits.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  
  // Progress Ring
  const fraction = Math.max(0, secondsLeft / totalSeconds);
  const offset = CIRCLE_CIRCUMFERENCE * (1 - fraction);
  elements.timerRing.style.strokeDashoffset = offset;
  
  // Urgency styling
  if (secondsLeft <= 5) {
    elements.timerBanner.classList.remove('warning');
    elements.timerBanner.classList.add('urgent');
  } else if (secondsLeft <= 12) {
    elements.timerBanner.classList.add('warning');
    elements.timerBanner.classList.remove('urgent');
  } else {
    elements.timerBanner.classList.remove('warning', 'urgent');
  }
}

// -------------------------------------------------------------
// Clipboard & Toast Actions
// -------------------------------------------------------------
async function copyToClipboard(text, customMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers / insecure context
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(customMessage || 'Copied to clipboard for Copilot!');
  } catch (err) {
    console.error('Failed to copy: ', err);
    showToast('Copy failed. Please manually select and copy text.');
  }
}

function showToast(msg) {
  elements.toastMessage.textContent = msg;
  elements.toast.classList.add('show');
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3200);
}

// -------------------------------------------------------------
// Event Listeners & Navigation
// -------------------------------------------------------------
function setupEventListeners() {
  // Early start from reading
  elements.startWritingEarlyBtn.addEventListener('click', () => {
    clearInterval(state.timerInterval);
    sounds.phaseTransition();
    startTypingPhase();
  });
  
  // Typing textarea live counts
  elements.reconstructionInput.addEventListener('input', updateTypingStats);
  
  // Keyboard shortcut: Ctrl + Enter to submit typing
  elements.reconstructionInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      completeTypingPhase();
    }
  });
  
  // Manual submit typing
  elements.submitTypingBtn.addEventListener('click', () => {
    completeTypingPhase();
  });
  
  // Sound toggle button
  elements.soundToggleBtn.addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    elements.soundIcon.textContent = state.audioEnabled ? '🔔' : '🔕';
    elements.soundToggleBtn.title = state.audioEnabled ? 'Sound is Enabled' : 'Sound is Muted';
    showToast(state.audioEnabled ? 'Audio notifications enabled' : 'Audio notifications muted');
  });
  
  // Fullscreen toggle button
  if (elements.fullscreenBtn) {
    elements.fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.warn(err));
        if (elements.fullscreenIcon) elements.fullscreenIcon.textContent = '🗗';
        showToast('Entered Fullscreen Mode');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => console.warn(err));
          if (elements.fullscreenIcon) elements.fullscreenIcon.textContent = '⛶';
          showToast('Exited Fullscreen Mode');
        }
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (elements.fullscreenIcon) {
        elements.fullscreenIcon.textContent = document.fullscreenElement ? '🗗' : '⛶';
      }
    });
  }
  
  // Passage Jump Dropdown
  elements.passageSelect.addEventListener('change', (e) => {
    state.currentIndex = parseInt(e.target.value, 10) || 0;
    loadCurrentPassage();
  });
  
  // Round Robin Next button
  elements.nextPassageBtn.addEventListener('click', () => {
    // Round-robin increment: loop from 49 back to 0
    state.currentIndex = (state.currentIndex + 1) % state.passages.length;
    loadCurrentPassage();
  });
  
  // Round Robin Prev button
  elements.prevPassageBtn.addEventListener('click', () => {
    state.currentIndex = (state.currentIndex - 1 + state.passages.length) % state.passages.length;
    loadCurrentPassage();
  });
  
  // Try Again button
  elements.retryPassageBtn.addEventListener('click', () => {
    loadCurrentPassage();
  });
  
  // Copy Copilot Prompt Button (Exact user specification)
  elements.copyPromptBtn.addEventListener('click', () => {
    const original = state.passages[state.currentIndex];
    const typed = state.typedText;
    const formatted = `original : "${original}" ,  typed content : " ${typed}"`;
    copyToClipboard(formatted, 'Copied prompt in exact format for Copilot!');
  });
  
  // Copy Detailed Copilot Prompt Button (Includes examiner instruction)
  elements.copyDetailedPromptBtn.addEventListener('click', () => {
    const original = state.passages[state.currentIndex];
    const typed = state.typedText;
    const detailed = `You are a certified Pearson Versant English test examiner. Evaluate this passage reconstruction according to the 4 official Versant writing skills (Grammar, Vocabulary, Organization, and Content Retention). Provide a detailed score out of 100, highlight key errors, and suggest improvements:\n\noriginal : "${original}" ,  typed content : " ${typed}"`;
    copyToClipboard(detailed, 'Copied Copilot prompt with Versant examiner instructions!');
  });
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
