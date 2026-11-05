window.PORTFOLIO_PROJECTS = [
  {
    id: "soc-siem-simulator",
    title: "SOC/SIEM Dashboard Simulator",
    summary: "I built a local Python dashboard to generate fictional login events, store them in SQLite and flag repeated failed logins. Each alert links to its supporting events and timeline so I can review why the rule matched. All data is simulated; the application does not collect live security logs.",
    tags: ["Python", "Flask", "SQLite", "Detection logic"],
    groups: [
      {
        title: "What I implemented",
        items: [
          "Event generation and storage: creates successful login events or a batch of five failures for a dedicated fictional account. SQLite stores the timestamp, account, host, source IP and outcome for each event.",
          "Rolling-window detection: alerts on at least five failed logins within 300 seconds for the same account, host and source IP. The exact time boundaries are included; successful logins do not count or reset the window.",
          "Alert evidence: shows five qualifying failures in a timeline and suppresses additional matching alerts for five minutes after an alert.",
          "Bounded storage: retains at most 1,000 events and 100 alerts. An alert is removed when its supporting evidence expires."
        ],
        text: ""
      },
      {
        title: "Testing and connection to SOC analysis",
        items: [
          "Verified tests: passed 11 automated tests on Windows covering normal logins, the four/five-failure threshold, matching fields, 300-second and 301-second boundaries, alert suppression, evidence, persistence and retention limits.",
          "Evidence review: practised reading account, host, IP and timestamp information to understand why a detection matched.",
          "Investigation judgement: tested a scenario where legitimate password mistakes trigger the rule. An alert identifies activity to investigate; it does not automatically prove an attack.",
          "Current limits: one detection rule using generated events in event-time order. Review status, investigation notes, additional rules and Windows/Linux scenarios remain planned. Test results validate these simulated cases, not real-world detection accuracy."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/soc-siem-simulator"
      }
    ],
    images: [
      {
        src: "assets/siem.png",
        alt: "SOC/SIEM simulator showing repeated-failed-login alerts and fictional successful and failed logins for demo.account on LAB-PC-01 from 192.0.2.25.",
        caption: "Actual dashboard screenshot. The events and accounts are simulated. Select the image to inspect it."
      }
    ],
    category: "blue",
    area: "Detection & investigation",
    kind: "Independent project",
    short: "A local login-detection lab that connects every alert to the events behind it.",
    proof: "11 automated tests passed · Recorded Windows run",
    value: "11",
    result: "automated tests passed",
    resultNote: "The recorded Windows run covers detection thresholds, time boundaries, suppression, evidence, persistence and retention. These tests were not rerun by this portfolio.",
    scope: "Generated login events only. One repeated-failed-login rule; no live security telemetry.",
    relevance: "Practised reviewing accounts, hosts, source IPs and timestamps to explain why a rule matched. An alert is a lead to investigate, not proof of an attack.",
    number: "01"
  },
  {
    id: "bank-lab",
    title: "Secure Bank Security Lab",
    summary: "I built vulnerable and secured versions of Mellow’s Bank using Flask and SQLite. I tested its customer and admin workflows, documented the weaknesses, then implemented fixes and repeated the tests. Both versions are available on GitHub so the original behaviour and the changes can be compared.",
    tags: ["Python", "Flask", "Burp Suite", "Wireshark"],
    groups: [
      {
        title: "What I tested and fixed",
        items: [
          "Database queries: tested SQL injection in customer search and used parameterised queries in the secured version.",
          "Access control: restricted debt changes to administrators and checked giveaway eligibility against the database.",
          "Input validation: rejected negative transfers and unexpected profile fields, including attempts to change a credit score.",
          "Stored XSS: escaped support messages in the admin inbox and added a Content Security Policy.",
          "Data protection: reduced customer information returned by search and added HTTPS/TLS for local testing."
        ],
        text: ""
      },
      {
        title: "Testing evidence and project scope",
        items: [],
        text: "I used browser developer tools and Burp Suite to examine and modify requests, then retested the fixes. Wireshark was used to compare readable HTTP traffic with encrypted HTTPS traffic. The screenshots below show a negative-transfer test in the vulnerable version and an HTTP 400 response from the secured version. This is a completed local coursework lab using fictional accounts and balances; it is not a live banking service."
      }
    ],
    repos: [
      {
        label: "Secured source code",
        url: "https://github.com/Melloww-png/local-bank-cw2/tree/main/Ver.Secured-Bank"
      },
      {
        label: "Vulnerable source code",
        url: "https://github.com/Melloww-png/local-bank-cw2/tree/main/vulnerable"
      }
    ],
    images: [
      {
        src: "assets/bank-secured.png",
        alt: "Burp Suite showing HTTP 400 Bad Request when the secured bank receives a transfer amount of minus 100 over HTTPS.",
        caption: "Secured version: Burp Suite records HTTP 400 for a transfer amount of −100 over HTTPS. One validation example from the wider remediation work.",
        label: "Secured"
      },
      {
        src: "assets/bank-vulnerable.png",
        alt: "Vulnerable bank dashboard beside a browser console submitting a negative transfer of minus 100.",
        caption: "Vulnerable version: a negative transfer submitted through the browser console using a fictional customer account.",
        label: "Vulnerable"
      }
    ],
    category: "appsec",
    area: "Testing & remediation",
    kind: "Secure programming coursework",
    short: "Two versions of Mellow’s Bank. Find the flaws, apply the fixes and compare the evidence.",
    proof: "Vulnerable → secured · Fixes checked by retesting",
    value: "Before / after",
    result: "Vulnerabilities tested and fixes retested",
    resultNote: "SQL injection, access control, input validation, stored XSS and transport protection were covered. The negative-transfer screenshots show one example from this wider set.",
    scope: "Completed local coursework lab with fictional customers and balances. HTTPS uses a local development certificate.",
    relevance: "Connected malicious requests to the server-side controls that should stop them, then documented the behaviour before and after remediation.",
    number: "02"
  },
  {
    id: "firewall-simulator",
    title: "Firewall Simulator",
    summary: "I built a Python firewall simulator to explore how filtering rules control network traffic. It evaluates simulated packets against configured rules and records whether traffic is allowed or blocked. The project models firewall decisions without filtering live network traffic.",
    tags: ["Python", "SQLite", "IPv4", "Packet filtering"],
    groups: [
      {
        title: "What I implemented",
        items: [
          "Rule-based filtering: checks packet information against rules containing a source IP address, port, protocol, action and priority.",
          "Rule priority: uses the configured priority when evaluating filtering rules, making rule order part of the decision process.",
          "Input validation: validates IPv4 addresses to identify malformed input.",
          "Traffic logging: stores allowed and blocked packet events in SQLite so decisions can be reviewed after a simulation."
        ],
        text: ""
      },
      {
        title: "Testing and security relevance",
        items: [
          "Testing: exercised the filtering logic with valid, invalid and unauthorised traffic scenarios.",
          "Security concepts: applied access-control rules, input validation and event logging in one project.",
          "Connection to SOC work: filtering decisions and packet logs provide a practical foundation for understanding network activity and reviewing blocked traffic."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/firewall-sim-home-project-"
      }
    ],
    images: [
      {
        src: "assets/firewall.png",
        alt: "Firewall Simulator output showing invalid protocol validation and a TCP packet blocked by the port 23 rule.",
        caption: "Actual terminal output: protocol validation and a TCP packet blocked by a port 23 rule."
      }
    ],
    category: "blue",
    area: "Network defence",
    kind: "Independent project",
    short: "Prioritised packet-filtering rules with a log explaining each allow or block decision.",
    proof: "Rule priority, validation & decision logs",
    value: "Allow / Block",
    result: "Decisions you can trace",
    resultNote: "Tested valid, invalid and unauthorised traffic scenarios. Every simulated filtering decision is recorded in SQLite.",
    scope: "Simulated packets. This tool models filtering decisions and does not filter live network traffic.",
    relevance: "Built a foundation for reviewing network events and explaining how rule order affects traffic decisions.",
    number: "03"
  },
  {
    id: "digital-forensics",
    title: "Digital Forensics Investigation",
    summary: "I examined the Mantooth.E01 forensic disk image using Autopsy and FTK. I analysed deleted files, browsing activity and email artefacts, then wrote a report connecting the evidence to the investigation. The project helped me practise careful evidence handling and explain how individual findings support a conclusion.",
    tags: ["Autopsy", "FTK", "Evidence handling"],
    groups: [
      {
        title: "What I investigated",
        items: [
          "Disk examination: examined the supplied image for files, user activity and artefacts relevant to the coursework investigation.",
          "Deleted files and activity: analysed deleted files, browser history and email evidence to understand the activity recorded on the system.",
          "Evidence and reporting: documented findings, supporting screenshots, evidence handling and chain of custody in a forensic report."
        ],
        text: ""
      },
      {
        title: "Skills practised and security relevance",
        items: [],
        text: "Digital forensics, deleted-file recovery, artefact analysis, evidence preservation, chain of custody and technical report writing. These skills support investigating system activity and explaining findings with evidence."
      }
    ],
    repos: [],
    images: [
      {
        src: "assets/forensics.png",
        alt: "Autopsy screenshot from the Mantooth.E01 coursework forensic investigation.",
        caption: "An actual screenshot from the Mantooth.E01 coursework investigation."
      }
    ],
    category: "blue",
    area: "Forensic investigation",
    kind: "Digital forensics coursework",
    short: "An investigation of Mantooth.E01, connecting deleted files, browsing and email artefacts.",
    proof: "Disk-image analysis & documented chain of custody",
    value: "Mantooth.E01",
    result: "Evidence connected to findings",
    resultNote: "Examined a supplied forensic disk image and documented deleted files, browser activity, email artefacts and chain of custody in a coursework report.",
    scope: "Coursework investigation using a supplied forensic image. Findings relate to that image, not a live incident.",
    relevance: "Practised preserving evidence, identifying relevant artefacts and explaining how individual findings support a conclusion.",
    number: "04"
  },
  {
    id: "smart-bin",
    title: "Smart Public Bin Monitoring",
    summary: "I built a monitoring prototype to show how fill-level data could help identify public bins that need collection. Python simulates ultrasonic sensor readings for four bins, Azure services process and store the data, and a Flask dashboard presents bin status, alerts and historical readings.",
    tags: ["Python", "Azure IoT Hub", "Cosmos DB", "Flask"],
    groups: [
      {
        title: "What I implemented",
        items: [
          "Sensor simulation: models ultrasonic sensor behaviour to generate changing waste-level readings for four bins without physical sensor hardware.",
          "Cloud data flow: sends readings through Azure IoT Hub and Stream Analytics before storing them in Azure Cosmos DB.",
          "Status detection: identifies nearly-full and full bins, with collection alerts for full bins.",
          "Monitoring dashboard: uses Flask to display fill levels, individual bin status, alerts and previous readings."
        ],
        text: ""
      },
      {
        title: "Scenario handling and practical relevance",
        items: [
          "Waste scenarios: supports random, low, high and full waste levels to exercise different monitoring conditions.",
          "Operational purpose: brings the status of multiple bins into one view so a person can identify which bins need attention.",
          "Connection to cloud security: provides experience tracing data across connected devices, cloud processing, storage and a web application.",
          "Project scope: a prototype using simulated readings; it does not represent a live deployment of public bins."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/smart-bin-monitoring"
      }
    ],
    images: [
      {
        src: "assets/iot.png",
        alt: "Azure Cosmos DB showing a stored BIN001 reading at 100 percent fill with a collection alert.",
        caption: "Actual Azure Cosmos DB evidence: a stored full-bin reading and collection alert."
      }
    ],
    category: "cloud",
    area: "Cloud & IoT monitoring",
    kind: "IoT coursework prototype",
    short: "A simulated sensor-to-cloud pipeline, with Azure storage and a Flask monitoring dashboard.",
    proof: "4 simulated bins · Sensor-to-cloud data flow",
    value: "04",
    result: "simulated public bins",
    resultNote: "Python → Azure IoT Hub → Stream Analytics → Cosmos DB, with fill levels, collection alerts and history presented in Flask.",
    scope: "Prototype using simulated readings. No physical sensor deployment or live public bins.",
    relevance: "Learned to trace telemetry across devices, cloud processing, database storage and a monitoring interface.",
    number: "05"
  },
  {
    id: "secure-mail",
    title: "Secure Mail Cryptography System",
    summary: "I developed a Python project to protect message contents and verify their authenticity. It combines encryption, integrity checks and digital signatures to address three separate questions: who can read a message, whether it has changed, and whether its signature is valid.",
    tags: ["Python", "AES-256-CBC", "RSA-2048", "HMAC", "RSA-PSS"],
    groups: [
      {
        title: "What I implemented",
        items: [
          "Message encryption: uses AES-256-CBC to encrypt message contents and supports decryption with the corresponding key.",
          "Key exchange: uses RSA-2048 to protect the exchange of the symmetric encryption key.",
          "Integrity verification: uses SHA-256 and HMAC to check message integrity and detect unauthorised modifications.",
          "Digital signatures: uses RSA-PSS to sign messages and verify signatures using the corresponding public key."
        ],
        text: ""
      },
      {
        title: "Testing and security relevance",
        items: [
          "Testing: tested encryption, decryption, integrity verification and tampered-message scenarios.",
          "Security concepts: combined confidentiality, integrity and authentication, with a separate mechanism for each purpose.",
          "Connection to cloud security: the project provides a foundation for understanding encryption, key handling and trust in services that exchange sensitive data."
        ],
        text: ""
      }
    ],
    repos: [],
    images: [
      {
        src: "assets/cryptography.png",
        alt: "Secure Mail terminal windows showing message delivery, decryption, integrity checks and signature verification.",
        caption: "Actual command-window output from the Secure Mail demonstration."
      }
    ],
    category: "more",
    area: "Cryptography",
    kind: "Cryptography coursework",
    short: "Message encryption, integrity checks and sender verification in a Python communication lab.",
    proof: "Encryption, tampering & signature checks",
    value: "AES + RSA",
    result: "Message protection at separate layers",
    resultNote: "AES-256-CBC protects message contents, RSA-2048 protects key exchange, HMAC checks integrity and RSA-PSS verifies signatures.",
    scope: "Educational cryptography implementation. Tested within the coursework lab.",
    relevance: "Separated confidentiality, integrity and authentication, then checked how tampering affected verification.",
    number: "06"
  },
  {
    id: "owasp-juice-shop",
    title: "OWASP Juice Shop Assessment",
    summary: "I assessed OWASP Juice Shop, an intentionally vulnerable web application, in a controlled local lab using Kali Linux. I used Burp Suite and browser developer tools to examine requests, demonstrate security weaknesses and document their impact, with recommendations for addressing each finding.",
    tags: ["Burp Suite", "Kali Linux", "HTTP analysis"],
    groups: [
      {
        title: "What I assessed",
        items: [
          "SQL injection and data exposure: tested the product-search endpoint and demonstrated how manipulated input could expose user email addresses and password hashes from the lab database.",
          "Cross-site scripting (XSS): tested search input to demonstrate script execution when user-controlled content was handled insecurely.",
          "Server-side input validation: intercepted a feedback request in Burp Suite and changed its rating to zero, showing that the server accepted a value outside the options provided by the interface.",
          "CAPTCHA bypass: used Burp Proxy, Repeater and Intruder to examine and replay feedback requests, demonstrating that CAPTCHA values could be reused for repeated submissions.",
          "Predictable passwords: used challenge clues and publicly available information to identify a predictable password, demonstrating why password length alone does not ensure strong authentication.",
          "Chatbot prompt manipulation: repeated requests to the support chatbot until it disclosed a coupon code, highlighting weaknesses in how it enforced restrictions across repeated interactions."
        ],
        text: ""
      },
      {
        title: "Evidence, recommendations and security relevance",
        items: [
          "Assessment report: documented the test methods, observed behaviour, security impact and supporting screenshots for each finding.",
          "Recommended mitigations: proposed parameterised queries, safe output encoding, server-side validation, single-use CAPTCHA verification, request limits and stronger authentication controls.",
          "Connection to security operations: practised analysing HTTP requests, recognising malicious input and communicating findings with clear evidence and actionable remediation advice."
        ],
        text: ""
      }
    ],
    repos: [],
    images: [
      {
        src: "assets/juice-shop.png",
        alt: "Screenshot from the local OWASP Juice Shop web security assessment.",
        caption: "Actual evidence from the controlled local Juice Shop assessment."
      }
    ],
    category: "appsec",
    area: "Web security assessment",
    kind: "Controlled security lab",
    short: "Request-level testing, evidence and remediation recommendations for a deliberately vulnerable app.",
    proof: "6 documented security findings",
    value: "06",
    result: "documented security findings",
    resultNote: "SQL injection, XSS, feedback validation, CAPTCHA reuse, predictable passwords and chatbot prompt manipulation were documented with evidence.",
    scope: "Intentionally vulnerable OWASP Juice Shop in a controlled local lab. Recommendations were documented; this project did not implement fixes in Juice Shop.",
    relevance: "Practised recognising malicious input in HTTP traffic and explaining impact with clear supporting evidence.",
    number: "07"
  },
  {
    id: "library-system",
    title: "Library Management System",
    summary: "A Python and SQLite application for managing a library. Borrowers can search for items, borrow and return them, and check their fines. Administrators can manage the catalogue and review borrowers. I used it to put object-oriented programming and data structures into a working application.",
    tags: ["Python", "SQLite", "OOP", "Data structures"],
    groups: [
      {
        title: "What I built",
        items: [
          "User roles: separate borrower and administrator classes and menus.",
          "Library operations: search, borrowing, returns, fine balances and catalogue updates.",
          "Data structures: a binary search tree for library items and a doubly linked list for borrower records.",
          "Item types: books, periodicals and audiobooks share a base library-item class."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/Library-Management-System"
      }
    ],
    images: [
      {
        src: "assets/library.png",
        alt: "SOLA Library Management System interface from the algorithms and data structures project.",
        caption: "Actual screenshot of the SOLA Library Management System."
      }
    ],
    category: "more",
    area: "Software & data structures",
    kind: "Algorithms & data structures coursework",
    short: "Borrowing, returns and catalogue management, built with Python classes and SQLite.",
    proof: "Binary search tree & doubly linked list",
    value: "Search. Borrow. Return.",
    result: "Data structures in a working application",
    resultNote: "A binary search tree organises library items and a doubly linked list stores borrower records. Administrator and borrower workflows are separate.",
    scope: "Coursework application, with records stored in SQLite.",
    relevance: "Applied object-oriented design and data structures to a practical application with distinct user roles.",
    number: "08"
  },
  {
    id: "grade-calculator",
    title: "Coursework Grade Calculator",
    summary: "A small browser tool that combines two coursework scores using their percentage weights. It checks the inputs, calculates the final score and shows a classification using the thresholds defined in the code.",
    tags: ["HTML", "CSS", "JavaScript"],
    groups: [
      {
        title: "What I built",
        items: [
          "Weighted calculation: combines CW1 and CW2 scores according to the weights entered by the user.",
          "Input checks: requires every field, checks scores and weights are between 0 and 100, and requires the two weights to total 100%.",
          "Result display: shows the final score to two decimal places and the classification calculated by the script."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/grade-calculator"
      }
    ],
    images: [],
    category: "more",
    area: "Small web application",
    kind: "Independent project",
    short: "A browser tool for weighted coursework marks, input validation and final classification.",
    proof: "80 × 30% + 60 × 70% = 66.00%",
    value: "66.00%",
    result: "An example weighted result",
    resultNote: "CW1: 80 × 30%. CW2: 60 × 70%. Scores and weights must be between 0 and 100, and the weights must total 100%.",
    scope: "Classification follows the thresholds in this project’s code. It is not an official university grade service.",
    relevance: "Practised input checks and clear feedback in a small browser application.",
    number: "09"
  },
  {
    id: "portfolio-site",
    title: "Cybersecurity Portfolio",
    summary: "I built my original GitHub Pages portfolio to make my projects, screenshots and source code easy to find. This private version keeps its warm palette and Manrope typography while improving project navigation, evidence views and resume access.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive design"],
    groups: [
      {
        title: "What this version includes",
        items: [
          "Project navigation: Search by project or tool and filter by area. Each project has its own shareable view.",
          "Evidence: Read focused case studies and enlarge actual screenshots without leaving the page.",
          "Resume access: Preview the current PDF, open it in a separate tab or download it.",
          "Usability: Responsive layouts, visible keyboard focus and reduced-motion support."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "Original portfolio repository",
        url: "https://github.com/Melloww-png/melloww-png.github.io"
      }
    ],
    images: [],
    category: "more",
    area: "Web development",
    kind: "Independent project",
    short: "A place to explain the work, inspect screenshots and find the source without digging.",
    proof: "Project navigation, evidence & resume access",
    value: "This portfolio.",
    result: "Work explained with context",
    resultNote: "The original GitHub Pages portfolio provides the content and visual direction. This private version adds project filters, evidence views, image inspection and resume access.",
    scope: "The linked repository is the original GitHub Pages portfolio. This private preview is hosted separately.",
    relevance: "Turned technical work into clear case studies, with keyboard navigation and responsive layouts.",
    number: "10"
  },
  {
    id: "christmas-lyrics",
    title: "Merry Christmas, Please Don’t Call",
    summary: "A little Python experiment I made after seeing people animate song lyrics with code. It displays timed lyric cards with a typewriter effect and floating music notes. I wanted to see how it worked, so I gave it a try.",
    tags: ["Python", "Tkinter", "Animation"],
    groups: [
      {
        title: "What I built",
        items: [
          "Timed cards: displays lyric cards at scheduled moments, alternating between two screen positions.",
          "Typewriter effect: reveals the text a character at a time while the cards rise up the screen.",
          "Floating notes: uses random sizes, positions and a gentle sideways motion for the music-note animations."
        ],
        text: ""
      }
    ],
    repos: [
      {
        label: "View repository",
        url: "https://github.com/Melloww-png/Merry-Christmas-please-dont-call"
      }
    ],
    images: [],
    category: "more",
    area: "Just for fun",
    kind: "Side project",
    short: "A small Tkinter experiment with timed lyric cards, a typewriter effect and floating notes.",
    proof: "16 scheduled lyric cues",
    value: "16",
    result: "scheduled lyric cues",
    resultNote: "Cards appear at scheduled moments, alternate between positions and reveal text a character at a time. Floating notes add a little motion.",
    scope: "Personal animation experiment, separate from the security projects.",
    relevance: "Explored timing, UI updates and animation in Python.",
    number: "11"
  }
];
