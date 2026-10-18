// Interview Preparation Logic
const hrQuestions = [
  {
    id: 'hr-tell-me-about-yourself',
    question: 'Tell me about yourself.',
    intent: 'Evaluates your communication skills, professional storytelling, and relevance to the engineering role.',
    structure: 'Present, Past, and Future formula (1 to 2 minutes maximum).',
    modelAnswer: '“Good morning/afternoon. I am a 5th-semester Computer Science student with a keen interest in full-stack web development and problem solving. During my coursework, I developed strong foundations in data structures and database systems. Recently, I led a Societal Internship project called MargDarshi to solve career guidance gaps for 500+ college students using Node.js and MongoDB. Outside academics, I enjoy participating in hackathons and solving algorithmic problems on LeetCode. I am excited to apply my problem-solving ability to real-world engineering challenges at your company.”',
    avoid: 'Reciting your entire high-school marks, repeating your resume line-by-line, or rambling about unrelated personal hobbies.'
  },
  {
    id: 'hr-strengths',
    question: 'What are your strengths?',
    intent: 'Checks self-awareness and whether your strengths directly align with team needs.',
    structure: 'State strength + Specific evidence/example + Outcome.',
    modelAnswer: '“My biggest strength is disciplined problem-solving and rapid learning. For instance, when our internship project needed database persistence within a strict 3-day milestone, I picked up MongoDB and Mongoose, designed the schema, and delivered the working endpoints ahead of schedule. Additionally, I communicate well in team settings and stay calm under tight project deadlines.”',
    avoid: 'Vague cliches like "I am a perfectionist" or "I am a hard worker" without tangible supporting examples.'
  },
  {
    id: 'hr-weaknesses',
    question: 'What are your weaknesses?',
    intent: 'Tests humility, self-awareness, and proactive efforts toward self-improvement.',
    structure: 'Real non-fatal weakness + How you are actively overcoming it.',
    modelAnswer: '“Earlier, I found it difficult to delegate work in group academic projects because I wanted everything formatted a certain way, which occasionally overloaded me. I realized this was inefficient for the team, so I started using task boards, setting clear interface agreements, and trusting teammates. This has greatly improved my team collaboration and project velocity.”',
    avoid: 'Saying "I have no weaknesses" or disguising a brag ("I work too hard and forget to sleep").'
  },
  {
    id: 'hr-why-hire-you',
    question: 'Why should we hire you?',
    intent: 'Evaluates culture fit, enthusiasm, and unique value proposition compared to other candidates.',
    structure: 'Intersection of technical capability, passion for their mission, and strong work ethic.',
    modelAnswer: '“You should hire me because I offer a strong blend of solid theoretical fundamentals and practical implementation skills. Through my college coursework and projects, I have built complete end-to-end applications rather than just watching tutorials. I am adaptable, take ownership of tasks from day one, and am eager to contribute productively to your engineering teams.”',
    avoid: 'Saying "Because I need a job" or generic statements that apply to any random applicant.'
  },
  {
    id: 'hr-5-years',
    question: 'Where do you see yourself in 5 years?',
    intent: 'Evaluates ambition, realistic career progression, and retention potential.',
    structure: 'Skill mastery -> Technical mentorship/leadership -> Business impact.',
    modelAnswer: '“In five years, I see myself as a seasoned software engineer who has deep domain expertise in scalable backend architectures. I hope to lead feature modules end-to-end, mentor junior engineers joining from campus, and contribute directly to high-impact technical decisions for the company.”',
    avoid: 'Saying "I want to start my own startup in 2 years" or "I want to be in your chair".'
  }
];

const technicalQuestions = [
  {
    id: 'tech-oop',
    question: 'What is Object-Oriented Programming (OOP)?',
    coreConcepts: 'Encapsulation, Abstraction, Inheritance, Polymorphism',
    modelAnswer: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which contain data (fields/attributes) and code (methods/behaviors). Its four core pillars are: 1) Encapsulation (bundling data and restricting direct access via getters/setters), 2) Abstraction (hiding implementation details and exposing only the interface), 3) Inheritance (creating new classes from existing ones to maximize code reuse), and 4) Polymorphism (allowing entities to take different forms via method overloading and method overriding).',
    interviewTip: 'Always give a real-world analogy: e.g., Car class with accelerate() method (Abstraction) and private engine details (Encapsulation).'
  },
  {
    id: 'tech-dbms',
    question: 'What is a Database Management System (DBMS)?',
    coreConcepts: 'Data definition, storage engine, concurrency control, ACID properties',
    modelAnswer: 'A Database Management System (DBMS) is software that manages, creates, retrieves, and updates digital databases. Unlike traditional file processing systems, a DBMS ensures data independence, eliminates redundancy, controls concurrent user access, enforces security privileges, and guarantees ACID properties (Atomicity, Consistency, Isolation, Durability) for transaction integrity.',
    interviewTip: 'Contrast DBMS with file systems: file systems lack concurrency locking, transactional rollback, and query optimization.'
  },
  {
    id: 'tech-sql-vs-nosql',
    question: 'What is the difference between SQL and NoSQL databases?',
    coreConcepts: 'Relational vs Document/Key-Value, Schema vs Schema-less, Vertical vs Horizontal Scaling',
    modelAnswer: 'SQL (Relational) databases (MySQL, PostgreSQL, Oracle) store data in fixed structured tables with predefined schemas and enforce ACID transactions using SQL joins. They scale vertically. NoSQL (Non-Relational) databases (MongoDB, Redis, Cassandra) store unstructured or semi-structured data as JSON documents or key-value pairs with dynamic schemas. They excel at horizontal scaling, high write throughput, and rapid schema evolution.',
    interviewTip: 'When asked which is better, state: "It depends on the use-case. Financial and transactional apps require relational SQL; real-time analytics, social feeds, and rapid prototyping benefit from NoSQL."'
  },
  {
    id: 'tech-api',
    question: 'What is an API (Application Programming Interface)?',
    coreConcepts: 'Contract, REST, JSON, Endpoints, Statelessness',
    modelAnswer: 'An API (Application Programming Interface) is a defined set of rules and protocols that allows two separate software applications to communicate with each other. In web development, REST APIs use standard HTTP verbs (GET, POST, PUT, DELETE) to exchange data, typically serialized as JSON, between a frontend client (browser) and a backend server.',
    interviewTip: 'Mention the restaurant waiter analogy: The customer (client) orders food via the waiter (API), who conveys it to the kitchen (server/database) and delivers the dish back.'
  },
  {
    id: 'tech-normalization',
    question: 'What is Normalization in databases?',
    coreConcepts: '1NF, 2NF, 3NF, BCNF, Anomaly reduction',
    modelAnswer: 'Normalization is the systematic process of organizing data in a relational database to reduce data redundancy and eliminate undesirable anomalies (Insertion, Update, and Deletion anomalies). It divides large, messy tables into smaller, well-linked tables: 1NF requires atomic values; 2NF eliminates partial functional dependencies on candidate keys; 3NF eliminates transitive dependencies.',
    interviewTip: 'Mention that while normalization is ideal for write-heavy OLTP databases, denormalization is often used in read-heavy data warehouses for query speed.'
  }
];

const interviewTips = [
  {
    category: '1. Communication Skills',
    icon: '🗣️',
    points: [
      '<strong>Active Listening:</strong> Never interrupt the interviewer. Let them finish the question completely before answering.',
      '<strong>Structured Thinking:</strong> Take a 3-5 second pause before answering complex questions to organize your points.',
      '<strong>Eliminate Fillers:</strong> Reduce "umms", "likes", and "you knows". A deliberate silence sounds confident; filler words sound anxious.',
      '<strong>Ask Clarifying Questions:</strong> In technical problem-solving, clarify edge cases (e.g. "Can the input array contain negative numbers?") before writing code.'
    ]
  },
  {
    category: '2. Body Language & Posture',
    icon: '🧍',
    points: [
      '<strong>Eye Contact:</strong> Maintain natural eye contact (60-70% of the time). In video interviews, look directly into the camera lens, not just at your screen.',
      '<strong>Upright Posture:</strong> Sit upright with shoulders open and hands resting on the desk. Avoid slouching or defensive crossed arms.',
      '<strong>Nodding & Gestures:</strong> Nod gently to acknowledge points and use open hand gestures to explain technical flows.',
      '<strong>Smile & Warmth:</strong> A pleasant smile upon entering and leaving sets an immediate positive psychological tone.'
    ]
  },
  {
    category: '3. Confidence & Nerve Management',
    icon: '⚡',
    points: [
      '<strong>Reframe Nervousness as Excitement:</strong> Both physiological responses release adrenaline. Remind yourself: "I am ready and excited to showcase my skills."',
      '<strong>Box Breathing Technique:</strong> Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds before the interview begins.',
      '<strong>Handling the Unknown:</strong> If you don’t know an answer, never guess or bluff. Say: "I haven\'t worked with that specific tool yet, but based on my knowledge of X, here is how I think it operates..."'
    ]
  },
  {
    category: '4. Preparation Protocol',
    icon: '📋',
    points: [
      '<strong>Know Your Resume Inside Out:</strong> Every single project, technology, and line on your resume is fair game for deep grilling.',
      '<strong>Company Research:</strong> Know what the company does, their latest products, engineering tech stack, and founders/leadership.',
      '<strong>Prepare Smart Reverse Questions:</strong> When asked "Do you have any questions for us?", ask: "What does success look like for a graduate engineer in this team in the first 90 days?"'
    ]
  },
  {
    category: '5. Common Fatal Mistakes to Avoid',
    icon: '⚠️',
    points: [
      '<strong>Arriving Late or Technical Glitches:</strong> Test your webcam, mic, and internet 30 minutes in advance for online rounds.',
      '<strong>Badmouthing College or Past Teams:</strong> Always maintain a constructive, solution-oriented narrative.',
      '<strong>Lack of Curiosity:</strong> Saying "No questions" at the end signals disinterest to interviewers.'
    ]
  }
];

let completedInterviewSet = new Set();

document.addEventListener('DOMContentLoaded', async () => {
  checkAuthGuard(true);
  initUserNavbar();

  await loadCompletedInterviewTopics();

  // Tab switching
  const tabs = document.querySelectorAll('#interviewTabs .tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      document.querySelectorAll('.interview-section').forEach((sec) => (sec.style.display = 'none'));
      document.getElementById(`tab-${target}`).style.display = 'block';
    });
  });

  // Render initial sections
  renderHRSection();
  renderTechSection();
  renderTipsSection();
});

// Load completed interview items from API
async function loadCompletedInterviewTopics() {
  try {
    const res = await fetchWithAuth('/api/progress');
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && data.data.completedTopicIds) {
        completedInterviewSet = new Set(data.data.completedTopicIds);
      }
    }
  } catch (e) {
    console.warn('Error loading progress:', e);
  }
}

// Render HR Section
function renderHRSection() {
  const container = document.getElementById('tab-hr');
  container.innerHTML = hrQuestions
    .map((item, idx) => {
      const topicIdStr = `interview:${item.id}`;
      const isDone = completedInterviewSet.has(topicIdStr);

      return `
        <div class="card" style="margin-bottom: 24px;" id="card-${item.id}">
          <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="badge badge-blue" style="margin-bottom: 4px;">HR Question #${idx + 1}</span>
              <h3 class="card-title">${item.question}</h3>
            </div>
            <button class="btn ${isDone ? 'btn-success' : 'btn-outline'} btn-sm" id="btn-${item.id}" onclick="toggleInterviewPractice('${item.id}')">
              ${isDone ? '✅ Practiced' : 'Mark as Practiced 📌'}
            </button>
          </div>

          <div style="margin-bottom: 14px; font-size: 0.9rem; color: var(--text-muted);">
            <strong>What Interviewer Evaluates:</strong> ${item.intent}
          </div>

          <div class="star-step" style="margin-bottom: 14px;">
            <strong>Recommended Response Framework:</strong> ${item.structure}
          </div>

          <div style="background: #f1f5f9; padding: 16px; border-radius: var(--radius-md); margin-bottom: 14px;">
            <div style="font-weight: 700; color: var(--secondary); margin-bottom: 6px; font-size: 0.92rem;">
              ⭐ High-Scoring Sample Response:
            </div>
            <p style="color: #334155; font-size: 0.92rem; line-height: 1.6; font-style: italic;">
              ${item.modelAnswer}
            </p>
          </div>

          <div style="font-size: 0.88rem; color: #dc2626;">
            <strong>⚠️ Common Trap to Avoid:</strong> ${item.avoid}
          </div>
        </div>
      `;
    })
    .join('');
}

// Render Technical Section
function renderTechSection() {
  const container = document.getElementById('tab-tech');
  container.innerHTML = technicalQuestions
    .map((item, idx) => {
      const topicIdStr = `interview:${item.id}`;
      const isDone = completedInterviewSet.has(topicIdStr);

      return `
        <div class="card" style="margin-bottom: 24px;" id="card-${item.id}">
          <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="badge badge-blue" style="margin-bottom: 4px;">Core Tech Question #${idx + 1}</span>
              <h3 class="card-title">${item.question}</h3>
            </div>
            <button class="btn ${isDone ? 'btn-success' : 'btn-outline'} btn-sm" id="btn-${item.id}" onclick="toggleInterviewPractice('${item.id}')">
              ${isDone ? '✅ Practiced' : 'Mark as Practiced 📌'}
            </button>
          </div>

          <div style="margin-bottom: 12px; font-size: 0.88rem; color: var(--text-muted);">
            <strong>Keywords:</strong> <span class="badge badge-gray">${item.coreConcepts}</span>
          </div>

          <div style="background: #f8fafc; border-left: 4px solid var(--primary); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 14px;">
            <div style="font-weight: 700; color: var(--secondary); margin-bottom: 4px; font-size: 0.95rem;">Model Answer:</div>
            <p style="color: #1e293b; font-size: 0.93rem; line-height: 1.6;">${item.modelAnswer}</p>
          </div>

          <div style="font-size: 0.88rem; color: #047857;">
            <strong>💡 Pro-Tip for Evaluation:</strong> ${item.interviewTip}
          </div>
        </div>
      `;
    })
    .join('');
}

// Render Tips Section
function renderTipsSection() {
  const container = document.getElementById('tab-tips');
  container.innerHTML = interviewTips
    .map(
      (tip) => `
      <div class="tip-card">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          <span style="font-size: 1.6rem;">${tip.icon}</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--secondary);">${tip.category}</h3>
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${tip.points
            .map(
              (p) => `
            <li style="padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.92rem; line-height: 1.6;">
              ${p}
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `
    )
    .join('');
}

// Toggle practice status
async function toggleInterviewPractice(itemId) {
  const topicIdStr = `interview:${itemId}`;
  const willBeDone = !completedInterviewSet.has(topicIdStr);
  const btn = document.getElementById(`btn-${itemId}`);
  if (btn) btn.disabled = true;

  try {
    const res = await fetchWithAuth('/api/progress/topic', {
      method: 'POST',
      body: JSON.stringify({
        module: 'interview',
        topicId: itemId,
        completed: willBeDone
      })
    });

    if (res && res.ok) {
      if (willBeDone) {
        completedInterviewSet.add(topicIdStr);
        if (btn) {
          btn.className = 'btn btn-success btn-sm';
          btn.innerHTML = '✅ Practiced';
        }
      } else {
        completedInterviewSet.delete(topicIdStr);
        if (btn) {
          btn.className = 'btn btn-outline btn-sm';
          btn.innerHTML = 'Mark as Practiced 📌';
        }
      }
    }
  } catch (err) {
    console.error('Failed to update interview progress:', err);
  } finally {
    if (btn) btn.disabled = false;
  }
}

