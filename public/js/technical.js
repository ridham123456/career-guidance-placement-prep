// Technical Preparation Data & Interaction Logic
const techData = {
  'programming-basics': {
    title: 'Programming Basics & Fundamentals',
    icon: '⚙️',
    explanation: 'Fundamental building blocks of software development including data types, memory addressing, flow control, and asymptotic analysis (Big-O notation).',
    concepts: [
      '<strong>Compilation vs Interpretation:</strong> Compiled languages (C, C++) convert source directly to machine code ahead of time; interpreted languages (Python, JS) execute line-by-line via a runtime engine.',
      '<strong>Time and Space Complexity:</strong> Big-O notation measures performance scalability as input size (N) grows. Constant O(1), Logarithmic O(log N), Linear O(N), Quadratic O(N^2).',
      '<strong>Stack vs Heap Memory:</strong> Stack stores local variables and function call frames (fast, LIFO, limited size). Heap handles dynamically allocated runtime objects.',
      '<strong>Pass by Value vs Pass by Reference:</strong> Passing a copy of data versus passing the actual memory location pointer.'
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between compile-time and run-time errors?',
        a: 'Compile-time errors (syntax errors, type mismatches) are caught before program execution by the compiler. Run-time errors (null pointer dereference, divide by zero, stack overflow) occur during active execution.'
      },
      {
        q: 'Explain recursion and identify the risk of infinite recursion.',
        a: 'Recursion is when a function calls itself to solve a smaller instance of the same problem. A base condition is strictly mandatory. Without a base condition, the call stack overflows leading to StackOverflowError.'
      },
      {
        q: 'What is Big-O notation and why is it preferred over wall-clock time?',
        a: 'Wall-clock time fluctuates depending on CPU speed, RAM, and background tasks. Big-O provides a machine-independent metric describing how execution time scales with input size.'
      }
    ],
    practiceQuestions: [
      'Write an algorithm to reverse an array in-place with O(1) auxiliary space.',
      'Explain how a ternary operator functions with an example.',
      'Calculate the Big-O time complexity of nested loops where the inner loop doubles each step.'
    ]
  },

  'c-lang': {
    title: 'C Programming Language',
    icon: '⚡',
    explanation: 'A procedural, statically typed language renowned for low-level memory control, pointers, and high runtime speed.',
    concepts: [
      '<strong>Pointers & Dereferencing:</strong> A pointer variable holds the memory address of another variable (`int *ptr = &val;`). Dereferencing (`*ptr`) retrieves or modifies value at that address.',
      '<strong>Dynamic Memory Management:</strong> `malloc()` allocates uninitialized memory block, `calloc()` allocates and zeros memory, `realloc()` resizes allocated block, `free()` releases memory to prevent memory leaks.',
      '<strong>Structure vs Union:</strong> In `struct`, each member gets its own separate memory address. In `union`, all members share the same memory space (size equal to largest member).',
      '<strong>Storage Classes:</strong> `auto`, `register`, `static` (retains value across function calls), `extern` (global variable accessed across multiple source files).'
    ],
    interviewQuestions: [
      {
        q: 'What is a Dangling Pointer and how can it be prevented?',
        a: 'A dangling pointer points to a memory location that has been deallocated with `free()`. Prevent it by assigning `ptr = NULL;` immediately after freeing memory.'
      },
      {
        q: 'What is a Memory Leak?',
        a: 'A memory leak occurs when heap memory allocated via `malloc()` or `calloc()` is not released using `free()` after usage, gradually consuming available system memory.'
      },
      {
        q: 'What is the purpose of the `volatile` keyword in C?',
        a: '`volatile` informs the compiler that a variable’s value can change unexpectedly (e.g., hardware register or interrupt service routine), preventing the compiler from optimizing it into a CPU register.'
      }
    ],
    practiceQuestions: [
      'Implement string copy `strcpy()` logic manually using pointers.',
      'Write a C program to swap two numbers using bitwise XOR without a temporary variable.',
      'Differentiate between `const int *ptr` and `int * const ptr`.'
    ]
  },

  'java': {
    title: 'Java & Object-Oriented Programming (OOP)',
    icon: '☕',
    explanation: 'A class-based, object-oriented language that achieves platform independence via the Java Virtual Machine ("Write Once, Run Anywhere").',
    concepts: [
      '<strong>4 Pillars of OOP:</strong> Encapsulation (data hiding), Abstraction (hiding implementation details), Inheritance (reusability), Polymorphism (method overloading & overriding).',
      '<strong>JVM, JRE, and JDK:</strong> JDK is the development kit including compiler (`javac`); JRE provides runtime libraries; JVM executes compiled bytecode.',
      '<strong>String vs StringBuilder:</strong> Strings in Java are immutable (stored in String Constant Pool). `StringBuilder` is mutable and preferred for concatenation in loops.',
      '<strong>Collections Framework:</strong> `List` (ArrayList, LinkedList), `Set` (HashSet, TreeSet - unique elements), `Map` (HashMap, TreeMap - key-value pairs).'
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between Method Overloading and Method Overriding?',
        a: 'Overloading (compile-time polymorphism) occurs within the same class with same method name but different parameter list. Overriding (runtime polymorphism) occurs in a child class providing a specific implementation of a parent class method.'
      },
      {
        q: 'What is Garbage Collection in Java and how does it operate?',
        a: 'Garbage Collection is an automatic background daemon thread that reclaims memory occupied by unreachable heap objects, eliminating manual memory deallocation.'
      },
      {
        q: 'Why is Java not considered 100% object-oriented?',
        a: 'Because Java supports primitive data types (`int`, `char`, `float`, `boolean`, `double`) which are not objects.'
      }
    ],
    practiceQuestions: [
      'Explain the difference between `==` operator and `.equals()` method.',
      'Write a snippet showing how custom exceptions are declared and thrown in Java.',
      'What are the advantages of Java Generics?'
    ]
  },

  'python': {
    title: 'Python Programming',
    icon: '🐍',
    explanation: 'A high-level, dynamically typed language emphasizing readable syntax, comprehensive standard libraries, and rapid development.',
    concepts: [
      '<strong>Built-in Data Structures:</strong> Lists (ordered, mutable), Tuples (ordered, immutable), Dictionaries (key-value hash table), Sets (unordered, unique items).',
      '<strong>List Comprehension:</strong> Concise syntax to create lists based on existing iterables: `[x**2 for x in nums if x % 2 == 0]`.',
      '<strong>GIL (Global Interpreter Lock):</strong> A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously in CPython.',
      '<strong>Args & Kwargs:</strong> `*args` allows passing a variable number of positional arguments; `**kwargs` accepts arbitrary keyword arguments.'
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between `is` and `==` in Python?',
        a: '`==` checks for value equality (do both variables contain identical values?), whereas `is` checks for reference identity (do both variables point to the same memory object in memory?).'
      },
      {
        q: 'What are Python Generators and why are they memory efficient?',
        a: 'Generators are functions that use the `yield` statement instead of `return`. They produce items lazily one-at-a-time on demand rather than loading the whole sequence into memory.'
      },
      {
        q: 'Explain Python decorators with a use-case.',
        a: 'Decorators are functions that take another function as an argument and extend its behavior without modifying its source code. Used for logging, execution timing, and authentication.'
      }
    ],
    practiceQuestions: [
      'Write a one-line Python list comprehension to flatten a matrix of numbers.',
      'Explain how shallow copy differs from deep copy in Python `copy` module.',
      'Write a function to count word frequencies in a sentence using `collections.Counter`.'
    ]
  },

  'dbms': {
    title: 'Database Management Systems (DBMS)',
    icon: '🗄️',
    explanation: 'Software systems designed to organize, store, retrieve, and manage structured data with high concurrency and integrity.',
    concepts: [
      '<strong>ACID Properties:</strong> Atomicity (all or nothing), Consistency (preserves database integrity rules), Isolation (concurrent transactions execute independently), Durability (committed data survives system crashes).',
      '<strong>Database Keys:</strong> Primary Key (uniquely identifies a record, non-null), Foreign Key (enforces referential integrity with another table), Candidate Key (potential primary key).',
      '<strong>Normalization Forms:</strong> 1NF (atomic values, no repeating groups), 2NF (in 1NF and no partial dependencies), 3NF (in 2NF and no transitive dependencies), BCNF.',
      '<strong>Database Indexing:</strong> B-Trees and Hash indexes that accelerate data search operations at the cost of slight write overhead.'
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between DBMS and RDBMS?',
        a: 'DBMS stores data as flat files with basic validation and no relationship constraints. RDBMS stores data in tabular relation format with strict relational integrity, primary/foreign keys, and ACID compliance.'
      },
      {
        q: 'Explain the 3 levels of Data Abstraction in DBMS architecture.',
        a: '1) Physical Level (how data is stored on disk), 2) Logical Level (what data is stored and relational schemas), 3) View Level (what subsets of data individual users/applications see).'
      },
      {
        q: 'What is Deadlock in a database transaction and how is it resolved?',
        a: 'A state where two transactions wait indefinitely for locks held by each other. RDBMS detects deadlocks using wait-for graphs and aborts one transaction (the victim) to release locks.'
      }
    ],
    practiceQuestions: [
      'Convert an unnormalized student database schema into 3rd Normal Form (3NF).',
      'Explain Clustered Index vs Non-Clustered Index.',
      'What are the anomalies prevented by Database Normalization?'
    ]
  },

  'sql': {
    title: 'SQL & Query Optimization',
    icon: '🔍',
    explanation: 'Structured Query Language used for defining, querying, manipulating, and controlling relational database systems.',
    concepts: [
      '<strong>SQL Commands Breakdown:</strong> DDL (`CREATE`, `ALTER`, `DROP`), DML (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), DCL (`GRANT`, `REVOKE`), TCL (`COMMIT`, `ROLLBACK`).',
      '<strong>Joins:</strong> INNER JOIN (matches in both tables), LEFT JOIN (all left + matched right), RIGHT JOIN, FULL OUTER JOIN.',
      '<strong>WHERE vs HAVING:</strong> `WHERE` filters rows before grouping occurs; `HAVING` filters aggregated groups after `GROUP BY`.',
      '<strong>Subqueries vs CTEs:</strong> Common Table Expressions (`WITH cte AS (...)`) improve query readability over deeply nested subqueries.'
    ],
    interviewQuestions: [
      {
        q: 'Write a query to find the 2nd highest salary from an Employee table.',
        a: '`SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);` or `SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;`'
      },
      {
        q: 'What is the difference between DELETE, TRUNCATE, and DROP?',
        a: 'DELETE is a DML command that removes specific rows (can be rolled back, fires triggers). TRUNCATE is DDL that resets the table data quickly (cannot be rolled back in some DBs). DROP removes table data and schema permanently.'
      },
      {
        q: 'What are SQL Aggregate Functions?',
        a: 'Functions that compute a single summary value across a column of data: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.'
      }
    ],
    practiceQuestions: [
      'Write a query to find employees whose department has more than 5 members.',
      'Write a query to delete duplicate rows from a table while keeping the lowest ID.',
      'Explain when to use UNION versus UNION ALL.'
    ]
  },

  'dsa': {
    title: 'Data Structures & Algorithms (DSA)',
    icon: '🌳',
    explanation: 'Techniques for organizing, storing, and manipulating data efficiently to solve computational problems in placement coding rounds.',
    concepts: [
      '<strong>Linear Structures:</strong> Arrays (contiguous memory, O(1) random access), Linked Lists (pointer nodes, O(1) insertion at head), Stacks (LIFO), Queues (FIFO).',
      '<strong>Non-Linear Structures:</strong> Binary Search Trees (left < root < right), Heaps (Priority Queues), Graphs (Adjacency Matrix/List).',
      '<strong>Searching & Sorting:</strong> Binary Search (O(log N) on sorted array), Merge Sort (O(N log N) stable), Quick Sort (O(N log N) in-place average).',
      '<strong>Algorithmic Paradigms:</strong> Two Pointers, Sliding Window, Divide and Conquer, Greedy, Dynamic Programming (memoization & tabulation).'
    ],
    interviewQuestions: [
      {
        q: 'How do you detect a cycle in a Linked List?',
        a: 'Using Floyd’s Cycle Detection (Tortoise and Hare algorithm) with two pointers: slow pointer moves 1 step, fast pointer moves 2 steps. If they meet, a cycle exists. Time O(N), Space O(1).'
      },
      {
        q: 'What is the difference between Breadth-First Search (BFS) and Depth-First Search (DFS)?',
        a: 'BFS explores neighbor nodes level by level using a Queue (FIFO); DFS explores branch depths first using recursion or a Stack (LIFO).'
      },
      {
        q: 'What is Dynamic Programming and when is it applicable?',
        a: 'An optimization technique that solves subproblems once and caches results. Applicable when a problem exhibits: 1) Overlapping Subproblems, and 2) Optimal Substructure.'
      }
    ],
    practiceQuestions: [
      'Implement Two Sum problem in O(N) time using a Hash Map.',
      'Write the algorithm to validate if a string of parentheses is balanced using a Stack.',
      'Explain how a Min-Heap is constructed and how `extractMin()` operates.'
    ]
  },

  'webdev': {
    title: 'Web Development & APIs',
    icon: '🌐',
    explanation: 'Architectures, protocols, and client-server mechanisms that power modern interactive web applications.',
    concepts: [
      '<strong>Client-Server Architecture:</strong> Client (Browser) makes HTTP requests; Server (Node.js/Express) processes business logic and queries database; returns response payload.',
      '<strong>HTTP Methods & Status Codes:</strong> GET (retrieve), POST (create), PUT (update), DELETE (remove). 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.',
      '<strong>RESTful Principles:</strong> Stateless communication, standard resource-based URLs (`/api/users`), JSON data serialization, uniform interface.',
      '<strong>Authentication Mechanisms:</strong> Session cookies (stateful, server-side store) versus JSON Web Tokens / JWT (stateless, cryptographically signed token stored client-side).'
    ],
    interviewQuestions: [
      {
        q: 'What happens when you type a URL into a browser address bar and press Enter?',
        a: '1) Browser checks DNS cache / resolves domain to IP address. 2) Browser initiates TCP 3-way handshake with server (plus TLS for HTTPS). 3) Sends HTTP GET request. 4) Server processes and returns HTML/JSON. 5) Browser parses HTML, builds DOM/CSSOM trees, and renders page.'
      },
      {
        q: 'What is CORS (Cross-Origin Resource Sharing)?',
        a: 'A browser security mechanism that restricts web pages from making API requests to a different domain, port, or protocol than the one serving the web page, unless the server explicitly permits it via HTTP headers (`Access-Control-Allow-Origin`).'
      },
      {
        q: 'Explain the difference between synchronous and asynchronous code in JavaScript.',
        a: 'Synchronous code executes sequentially and blocks subsequent operations. Asynchronous code (callbacks, Promises, async/await) runs non-blocking via the JavaScript Event Loop.'
      }
    ],
    practiceQuestions: [
      'Explain the difference between localStorage, sessionStorage, and Cookies.',
      'Write a simple Express.js route handler accepting POST JSON data with error validation.',
      'What are WebSockets and how do they differ from standard HTTP polling?'
    ]
  }
};

let completedTopicsSet = new Set();
let activeTechKey = 'programming-basics';

document.addEventListener('DOMContentLoaded', async () => {
  checkAuthGuard(true);
  initUserNavbar();

  // Load completed topics from API
  await loadCompletedTopics();

  // Setup tab listeners
  const tabs = document.querySelectorAll('#techCategoryTabs .tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeTechKey = tab.dataset.tech;
      renderTechTopic(activeTechKey);
    });
  });

  // Render initial topic
  renderTechTopic(activeTechKey);
});

// Fetch student completed topics from API
async function loadCompletedTopics() {
  try {
    const res = await fetchWithAuth('/api/progress');
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && data.data.completedTopicIds) {
        completedTopicsSet = new Set(data.data.completedTopicIds);
      }
    }
  } catch (e) {
    console.warn('Could not load completed topics:', e);
  }
}

// Render selected technical topic
function renderTechTopic(key) {
  const data = techData[key];
  const container = document.getElementById('techContent');
  if (!data) return;

  const topicIdStr = `technical:${key}`;
  const isCompleted = completedTopicsSet.has(topicIdStr);

  const conceptsHtml = data.concepts.map((c) => `<li style="margin-bottom: 8px;">${c}</li>`).join('');

  const interviewHtml = data.interviewQuestions
    .map(
      (item, idx) => `
      <div class="accordion-item" id="faq-${key}-${idx}">
        <div class="accordion-header" onclick="toggleAccordion('faq-${key}-${idx}')">
          <div class="accordion-title">
            <span style="color: var(--primary); font-weight: 700;">Q${idx + 1}:</span>
            <span>${item.q}</span>
          </div>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content">
          <p style="color: #334155; font-size: 0.95rem;">${item.a}</p>
        </div>
      </div>
    `
    )
    .join('');

  const practiceHtml = data.practiceQuestions
    .map(
      (pq, idx) => `
      <li style="padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 0.92rem;">
        <strong>#${idx + 1}</strong>: ${pq}
      </li>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.8rem;">${data.icon}</span>
          <div>
            <h2 class="card-title" style="margin-bottom: 2px;">${data.title}</h2>
            <span style="font-size: 0.85rem; color: var(--text-muted);">Core Subject Revision</span>
          </div>
        </div>

        <button id="toggleCompleteBtn" class="btn ${isCompleted ? 'btn-success' : 'btn-outline'}" onclick="handleToggleComplete('${key}')">
          ${isCompleted ? '✅ Marked as Prepared' : 'Mark as Prepared 📌'}
        </button>
      </div>

      <div style="font-size: 1rem; color: var(--text-main); margin-bottom: 20px; line-height: 1.6;">
        ${data.explanation}
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
          📌 Important Concepts & Formulas
        </h3>
        <ul style="padding-left: 20px; line-height: 1.7; color: #334155;">
          ${conceptsHtml}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
          💬 Common Technical Interview Questions (Click to Reveal Answers)
        </h3>
        <div class="accordion">
          ${interviewHtml}
        </div>
      </div>

      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
          ✍️ Recommended Practice Exercises
        </h3>
        <ul style="list-style: none;">
          ${practiceHtml}
        </ul>
      </div>
    </div>
  `;
}

// Toggle accordion
function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) {
    item.classList.toggle('active');
  }
}

// Handle topic completion toggle
async function handleToggleComplete(topicKey) {
  const topicIdStr = `technical:${topicKey}`;
  const willBeCompleted = !completedTopicsSet.has(topicIdStr);

  const btn = document.getElementById('toggleCompleteBtn');
  btn.disabled = true;

  try {
    const res = await fetchWithAuth('/api/progress/topic', {
      method: 'POST',
      body: JSON.stringify({
        module: 'technical',
        topicId: topicKey,
        completed: willBeCompleted
      })
    });

    if (res && res.ok) {
      if (willBeCompleted) {
        completedTopicsSet.add(topicIdStr);
        btn.className = 'btn btn-success';
        btn.innerHTML = '✅ Marked as Prepared';
      } else {
        completedTopicsSet.delete(topicIdStr);
        btn.className = 'btn btn-outline';
        btn.innerHTML = 'Mark as Prepared 📌';
      }
    }
  } catch (err) {
    console.error('Failed to update topic status:', err);
  } finally {
    btn.disabled = false;
  }
}

