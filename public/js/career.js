// Career Guidance Data & Interaction Logic
const careerData = {
  sde: {
    title: 'Software Developer (SDE)',
    icon: '💻',
    tagline: 'Build scalable software systems, backend services, and algorithmic solutions.',
    skills: ['Data Structures & Algorithms', 'Object-Oriented Design', 'DBMS & SQL', 'Operating Systems & Concurrency', 'System Architecture', 'Git & Version Control'],
    technologies: ['C++', 'Java', 'Python', 'Go', 'Linux/Unix', 'Docker', 'PostgreSQL', 'Redis'],
    roadmap: [
      {
        stage: 'Stage 1: Core Foundations',
        desc: 'Master one statically-typed programming language (C++ or Java). Learn Big-O complexity, basic data structures (Arrays, Strings, Linked Lists, Stacks, Queues).'
      },
      {
        stage: 'Stage 2: Advanced Problem Solving',
        desc: 'Solve 150+ problems on LeetCode/HackerRank covering Trees, Graphs, Dynamic Programming, and Two-Pointers. Deepen understanding of DBMS (ACID, Normalization) and OS (Threads, Processes).'
      },
      {
        stage: 'Stage 3: Software Engineering Projects',
        desc: 'Build 2 multi-tiered software applications with database persistence, authentication, and REST APIs. Write unit tests and maintain clean modular code on GitHub.'
      },
      {
        stage: 'Stage 4: Placement Sprints',
        desc: 'Practice timed mock coding tests (60-90 minutes). Review Low-Level Design (LLD / Object-Oriented Design patterns like Singleton, Factory, Strategy) and behavioral STAR stories.'
      }
    ],
    tips: [
      'Focus on problem-solving quality over quantity: understand 5 variations of a problem instead of copying 50 solutions.',
      'Explain your thought process aloud while coding in technical interviews.',
      'Highlight 1-2 substantial software projects on your resume with measurable metrics (e.g. "reduced query latency by 40%").'
    ]
  },

  web: {
    title: 'Web Developer (Full Stack / Frontend / Backend)',
    icon: '🌐',
    tagline: 'Design and engineer interactive web applications, client interfaces, and server APIs.',
    skills: ['HTML5 & Semantic Markup', 'CSS3 & Responsive Design', 'JavaScript (ES6+)', 'Node.js & Express', 'RESTful API Design', 'Database Integration (SQL & NoSQL)'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Git', 'Postman'],
    roadmap: [
      {
        stage: 'Stage 1: Web Fundamentals',
        desc: 'Understand how the web works (DNS, HTTP/HTTPS, Client-Server model). Master semantic HTML5, CSS layout (Flexbox & Grid), and modern JavaScript (DOM manipulation, async/await, fetch).'
      },
      {
        stage: 'Stage 2: Backend & Database Engineering',
        desc: 'Build backend servers with Node.js and Express. Master CRUD operations, routing, middleware, JWT token authentication, and database modeling with MongoDB/Mongoose or SQL.'
      },
      {
        stage: 'Stage 3: Full Stack Integration',
        desc: 'Connect frontend interfaces with backend REST APIs. Implement form validation, state management, session handling, file uploads, and responsive mobile layouts.'
      },
      {
        stage: 'Stage 4: Deployment & Portfolio',
        desc: 'Deploy live full-stack projects to cloud platforms (Render, Vercel, Railway). Setup GitHub repositories with clean documentation, live demo links, and architectural diagrams.'
      }
    ],
    tips: [
      'Recruiters look at live working links: deploy every project and ensure there are no console errors.',
      'Understand API security: never expose API keys, hash passwords with bcrypt, and validate incoming request payloads.',
      'Demonstrate responsive mobile design for all portfolio projects.'
    ]
  },

  'data-analyst': {
    title: 'Data Analyst',
    icon: '📊',
    tagline: 'Transform raw company data into actionable business intelligence and visual dashboards.',
    skills: ['Advanced SQL & Querying', 'Data Cleaning & Wrangling', 'Exploratory Data Analysis (EDA)', 'Statistical Reasoning', 'Dashboard Visualizations', 'Business Storytelling'],
    technologies: ['SQL', 'Python (Pandas, NumPy)', 'Excel / Google Sheets', 'Power BI', 'Tableau', 'Seaborn & Matplotlib'],
    roadmap: [
      {
        stage: 'Stage 1: Excel & Advanced SQL',
        desc: 'Master VLOOKUP, INDEX-MATCH, Pivot Tables, and conditional formatting in Excel. Master complex SQL queries (Window functions, CTEs, Joins, Aggregations).'
      },
      {
        stage: 'Stage 2: Python for Data Analysis',
        desc: 'Learn Python data manipulation libraries: Pandas for tabular data frames, NumPy for numerical operations, and Matplotlib/Seaborn for visual plotting.'
      },
      {
        stage: 'Stage 3: Business Intelligence (BI) Tools',
        desc: 'Learn Power BI or Tableau. Build interactive dashboards tracking business metrics (Sales KPIs, Churn rate, Student performance, Marketing ROI).'
      },
      {
        stage: 'Stage 4: Portfolio Projects & Case Studies',
        desc: 'Publish end-to-end data analysis case studies on Kaggle or GitHub. Include problem definition, cleaning steps, exploratory analysis, and clear executive recommendations.'
      }
    ],
    tips: [
      'Focus on business impact: numbers mean nothing without the "so what?" conclusion.',
      'Practice writing complex SQL queries live during technical screens without relying on autofill.',
      'Create a public portfolio linking to 2-3 interactive Power BI / Tableau dashboards.'
    ]
  },

  'data-scientist': {
    title: 'Data Scientist',
    icon: '🔬',
    tagline: 'Apply predictive modeling, statistical learning, and machine intelligence to complex data.',
    skills: ['Probability & Statistics', 'Machine Learning Algorithms', 'Feature Engineering', 'Data Mining', 'Python Scientific Stack', 'Model Evaluation & Tuning'],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Jupyter', 'SciPy', 'Statsmodels', 'SQL'],
    roadmap: [
      {
        stage: 'Stage 1: Mathematics & Statistics',
        desc: 'Master linear algebra (vectors, matrices), calculus (derivatives, gradient descent), and probability distributions (Normal, Poisson, Bayes Theorem, Hypothesis testing).'
      },
      {
        stage: 'Stage 2: Core Machine Learning',
        desc: 'Implement Supervised Learning (Linear/Logistic Regression, Decision Trees, Random Forests, SVM) and Unsupervised Learning (K-Means, PCA) using Scikit-Learn.'
      },
      {
        stage: 'Stage 3: Feature Engineering & Model Evaluation',
        desc: 'Learn handling imbalanced data (SMOTE), cross-validation, hyperparameter tuning (GridSearchCV), and evaluation metrics (Precision, Recall, F1-Score, ROC-AUC).'
      },
      {
        stage: 'Stage 4: End-to-End ML Pipelines',
        desc: 'Build reproducible ML pipelines and serve models using lightweight Flask/FastAPI REST endpoints for inference.'
      }
    ],
    tips: [
      'Be prepared to derive mathematical loss functions and explain the bias-variance tradeoff in interviews.',
      'Understand why one algorithm is chosen over another for specific data distributions.',
      'Show clean data preprocessing and validation rigor rather than jumping directly to complex models.'
    ]
  },

  aiml: {
    title: 'AI / Machine Learning Engineer',
    icon: '🤖',
    tagline: 'Architect and deploy neural networks, deep learning systems, and generative AI pipelines.',
    skills: ['Deep Learning Architectures', 'Neural Networks (CNN, RNN, Transformers)', 'PyTorch / TensorFlow', 'Model Deployment & Serving', 'LLM Prompt Engineering', 'GPU Acceleration'],
    technologies: ['PyTorch', 'TensorFlow', 'Hugging Face', 'CUDA', 'Python', 'FastAPI', 'ONNX', 'LangChain'],
    roadmap: [
      {
        stage: 'Stage 1: Machine Learning Foundations',
        desc: 'Solidify classic ML algorithms, linear algebra, vector calculus, and object-oriented Python programming.'
      },
      {
        stage: 'Stage 2: Deep Learning & Neural Networks',
        desc: 'Learn backpropagation, activation functions, loss optimizers (Adam, SGD). Train CNNs for Computer Vision and RNNs/LSTMs for sequential data in PyTorch.'
      },
      {
        stage: 'Stage 3: Modern NLP & Transformer Models',
        desc: 'Understand attention mechanisms, Transformer architecture, BERT, and GPT architectures. Explore fine-tuning open-source models using Hugging Face.'
      },
      {
        stage: 'Stage 4: MLOps & Production Deployment',
        desc: 'Containerize AI models with Docker, optimize weights with quantization/ONNX, and serve inference endpoints via FastAPI or Triton Inference Server.'
      }
    ],
    tips: [
      'Build practical projects: a document Q&A system using RAG, an image classification model, or fine-tuned LLM assistant.',
      'Master the math behind self-attention and backpropagation.',
      'Know how to optimize inference latency and handle memory constraints on GPUs.'
    ]
  },

  cyber: {
    title: 'Cyber Security Specialist',
    icon: '🛡️',
    tagline: 'Defend computer systems, networks, and applications against unauthorized access and cyber threats.',
    skills: ['Network Security & Protocols', 'Ethical Hacking & Penetration Testing', 'Cryptography', 'Linux System Administration', 'Vulnerability Assessment (OWASP Top 10)', 'Incident Response'],
    technologies: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'Kali Linux', 'Bash Scripting', 'Python', 'Snort'],
    roadmap: [
      {
        stage: 'Stage 1: Networking & Operating Systems',
        desc: 'Master OSI model, TCP/IP, DNS, routing protocols, firewalls, and Linux command-line administration.'
      },
      {
        stage: 'Stage 2: Web Security & OWASP Top 10',
        desc: 'Understand standard vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), CSRF, Broken Authentication, and IDOR. Learn Burp Suite for traffic interception.'
      },
      {
        stage: 'Stage 3: Ethical Hacking Labs',
        desc: 'Practice hands-on penetration testing on legal platforms like TryHackMe and HackTheBox. Learn privilege escalation, port scanning, and cryptography algorithms (RSA, AES, SHA).'
      },
      {
        stage: 'Stage 4: Defenses & Certifications',
        desc: 'Learn Security Information & Event Management (SIEM), log analysis, and incident response. Prepare for certifications like CompTIA Security+ or CEH.'
      }
    ],
    tips: [
      'Document write-ups of CTF (Capture The Flag) challenges on Medium or GitHub.',
      'Always emphasize ethical principles and legal testing boundaries in campus interviews.',
      'Understand how secure software development lifecycle (DevSecOps) prevents vulnerabilities during coding.'
    ]
  },

  cloud: {
    title: 'Cloud & DevOps Engineer',
    icon: '☁️',
    tagline: 'Automate build pipelines, orchestrate cloud infrastructure, and maintain continuous delivery.',
    skills: ['Linux Administration', 'CI/CD Pipelines', 'Containerization (Docker)', 'Orchestration (Kubernetes)', 'Infrastructure as Code (IaC)', 'Cloud Providers (AWS / Azure / GCP)'],
    technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'AWS (EC2, S3, RDS)', 'Linux/Bash', 'Ansible', 'Prometheus & Grafana'],
    roadmap: [
      {
        stage: 'Stage 1: Linux & Shell Scripting',
        desc: 'Master Linux system administration, permissions, processes, networking (SSH, cURL), and Bash scripting automation.'
      },
      {
        stage: 'Stage 2: Containerization with Docker',
        desc: 'Learn writing multi-stage Dockerfiles, managing container networks, volumes, and multi-container environments with Docker Compose.'
      },
      {
        stage: 'Stage 3: CI/CD & Cloud Infrastructure',
        desc: 'Setup automated Continuous Integration and Continuous Deployment using GitHub Actions. Deploy applications to AWS (EC2, S3, IAM, VPC).'
      },
      {
        stage: 'Stage 4: Kubernetes & Monitoring',
        desc: 'Learn Kubernetes pods, deployments, services, ingress controllers. Configure monitoring and alerting stacks with Prometheus and Grafana.'
      }
    ],
    tips: [
      'Obtain an entry-level cloud certification like AWS Certified Cloud Practitioner or Solutions Architect Associate.',
      'Showcase automated GitHub Actions workflows that automatically run tests, build Docker images, and deploy on commit.',
      'Highlight cost-conscious cloud architecture practices in interviews.'
    ]
  }
};

let activeRoleKey = 'sde';

document.addEventListener('DOMContentLoaded', () => {
  checkAuthGuard(true);
  initUserNavbar();

  // Tab switching
  const tabs = document.querySelectorAll('#careerTabs .tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeRoleKey = tab.dataset.role;
      renderCareerDetails(activeRoleKey);
    });
  });

  renderCareerDetails(activeRoleKey);
});

function renderCareerDetails(roleKey) {
  const data = careerData[roleKey];
  const container = document.getElementById('careerContent');
  if (!data) return;

  const skillsHtml = data.skills.map((s) => `<span class="skill-chip">${s}</span>`).join('');
  const techHtml = data.technologies.map((t) => `<span class="badge badge-gray" style="font-size: 0.85rem; padding: 6px 12px;">${t}</span>`).join(' ');

  const roadmapHtml = data.roadmap
    .map(
      (r, idx) => `
      <div class="roadmap-step">
        <div class="roadmap-num">${idx + 1}</div>
        <div class="roadmap-body">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--secondary); margin-bottom: 4px;">${r.stage}</h4>
          <p style="color: #334155; font-size: 0.93rem; line-height: 1.6;">${r.desc}</p>
        </div>
      </div>
    `
    )
    .join('');

  const tipsHtml = data.tips
    .map(
      (tip) => `
      <li style="padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 0.92rem; line-height: 1.6;">
        💡 ${tip}
      </li>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2.2rem;">${data.icon}</span>
          <div>
            <h2 class="card-title" style="margin-bottom: 2px;">${data.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem;">${data.tagline}</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 8px;">
          🎯 Essential Core Skills
        </h3>
        <div class="skills-pill-container">
          ${skillsHtml}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
          🛠️ Technologies & Tools to Learn
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${techHtml}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 16px;">
          🗺️ Step-by-Step College Learning Roadmap
        </h3>
        <div>
          ${roadmapHtml}
        </div>
      </div>

      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
          🚀 Entry-Level Placement Preparation Advice
        </h3>
        <ul style="list-style: none;">
          ${tipsHtml}
        </ul>
      </div>
    </div>
  `;
}

