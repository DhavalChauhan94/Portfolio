// Everything the page says lives here, so updating the portfolio never means touching layout code.

export const person = {
  name: 'Dhaval Chauhan',
  role: 'Full stack & AI automation engineer, Mumbai',
  email: 'chauhandhaval932@gmail.com',
  phone: '+91 93211 82078',
  linkedin: 'https://www.linkedin.com/in/dhaval-chauhan-93211abc',
  github: 'https://github.com/DhavalChauhan94',
}

export const summary =
  'I’m a BSc IT graduate and full stack & AI automation engineer. I build, deploy and secure AI-driven web applications end to end: React front ends, Node.js and Python services, PostgreSQL data layers, and the AWS servers they run on. Every day I work with LLMs, AI agents, MCP and n8n, and I build with Claude Code and Codex.'

// What I can be trusted with, each with the tools I actually use for it.
export const capabilities = [
  {
    title: 'Full stack products',
    text: 'Interfaces people use daily, the APIs behind them and the database underneath.',
    tools: ['React 18', 'Node.js 24', 'Express 5', 'FastAPI', 'PostgreSQL 16', 'Tailwind CSS 3'],
  },
  {
    title: 'AI agents & LLMs',
    text: 'Agents that read documents, query data safely and answer in plain language.',
    tools: ['Claude API', 'Gemini API', 'LangGraph', 'MCP servers', 'Python 3.11'],
  },
  {
    title: 'Automation & integrations',
    text: 'Pipelines that pull from marketplaces, banks, Google Workspace and Tally on their own.',
    tools: ['n8n', 'Composio', 'Amazon SP-API', 'Shopify', 'Google Workspace', 'Tally'],
  },
  {
    title: 'Cloud & security',
    text: 'Production servers I set up, harden, back up and keep online.',
    tools: ['AWS EC2', 'Nginx', 'HTTPS / TLS', 'PM2', 'Linux', 'Git & GitHub'],
  },
]

export const experience = [
  {
    when: 'July – November 2025',
    title: 'Web development intern',
    org: 'GAOTek Inc.',
    where: 'Remote',
    points: [
      { head: 'Web development', text: 'Built web applications in HTML, CSS and JavaScript for international teams, and ran e-commerce workshops.', tools: ['HTML', 'CSS', 'JavaScript'] },
    ],
  },
]

// Agent names as they appear in agent.accountant, grouped the way accountants use them.
export const suites = [
  {
    name: 'GST compliance',
    blurb: 'Match the government portal against the company books, return by return.',
    agents: ['GSTR-2B vs Books', 'GSTR-2B vs Books, multi-state', 'GSTR-1 vs Books', 'GSTR-3B vs Books', 'GSTR-3B Tally entry', 'E-invoice reconciliation', 'E-invoice extraction'],
  },
  {
    name: 'Bank & cards',
    blurb: 'Read any bank statement, classify each line to a ledger and tie it to Tally.',
    agents: ['Universal bank statement', 'PDF bank extractor', 'Bank vs Tally reconciliation', 'Credit card booking'],
  },
  {
    name: 'Marketplace sales',
    blurb: 'One sales MIS per channel, then one view across all of them.',
    agents: ['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'Meesho', 'Blinkit', 'Zepto', 'Shopify', 'JioMart', 'FirstCry', 'Tata CLiQ', 'Pepperfry', 'Limeroad', 'Cread', 'Mirrow', 'Varee', 'Total sales analyzer'],
  },
  {
    name: 'Receivables',
    blurb: 'Follow every order through settlement to the money in the bank.',
    agents: ['Amazon settlement', 'Amazon MTR consolidator', 'Receivable cycle', 'Receivables summary', 'Zepto receivables', 'Shopify order cycle', 'Amazon reconciliation', 'Flipkart reconciliation', 'Myntra reconciliation', 'Meesho reconciliation', 'Nykaa reconciliation', 'AJIO reconciliation'],
  },
  {
    name: 'Documents',
    blurb: 'Turn PDFs into structured, Tally-ready rows.',
    agents: ['Invoice processing', 'PO extractor', 'Marketplace ticket generator', 'Salary PDF to Excel'],
  },
]

export const projects = [
  {
    id: 'agent-accountant',
    title: 'agent.accountant',
    kind: 'AI accounting automation platform',
    live: 'https://agent.accountant',
    overview:
      'A CA firm runs its client work for 20+ D2C brands on this platform. Accountants upload a portal export or a bank statement, or let a connector pull it, and an agent returns the reconciliation, the MIS or the Tally entries as a finished Excel file. I build it end to end, from the React app to the Python engine and the AWS server it runs on.',
    facts: [
      ['Live at', 'agent.accountant'],
      ['Used by', 'A CA firm, for 20+ brands'],
      ['Agents', '44 in 5 suites'],
    ],
    features: [
      { title: 'Reconciliation engine', short: 'Multi-pass matching, written in Python.', long: 'GSTR-2B, GSTR-1, GSTR-3B, bank and e-invoice reconciliations in Pandas, with pdfplumber and Tesseract OCR for PDFs. It runs as a pool of processes and returns accountant-ready Excel with a vendor summary.', tools: ['Python 3.11', 'Pandas', 'pdfplumber', 'Tesseract OCR'] },
      { title: 'Order to cash', short: 'Every order traced to the bank.', long: 'Amazon orders followed through the MTR, the settlement and the bank receipt; Shopify orders through Velocity, Eshopbox, Return Prime and Cashfree; Zepto invoices through GRN and payment.', tools: ['Amazon SP-API', 'Shopify', 'Velocity', 'Cashfree'] },
      { title: 'Invoices to Tally', short: 'Vendor PDFs become Tally entries.', long: 'n8n workflows send each invoice to Gemini 2.5 Flash, with Claude as the fallback, then build the Tally import file. Masters remember every correction, so the same vendor never needs fixing twice.', tools: ['n8n', 'Gemini', 'Claude', 'Tally'] },
      { title: 'AI assistant', short: 'Ask the data a question.', long: 'An in-app assistant routes each question and answers from a read-only SQL tool that only sees the signed-in brand. AI also maps new GSTR-2B layouts, with the accountant approving the mapping.', tools: ['Claude', 'Gemini', 'PostgreSQL 16'] },
      { title: 'Workflow engine', short: 'No-code workflows with Excel formulas.', long: 'Accountants chain sheets with Excel-style formulas. Heavy workbooks, some over 130 MB, are built in Node.js worker threads so one export never freezes the site for everyone.', tools: ['Node.js 24', 'Worker threads'] },
      { title: 'Connected workspace', short: 'Drive, Gmail, Calendar and Meet built in.', long: 'Inputs arrive from Google Drive, results go back to Sheets and Gmail, and meetings, a compliance tracker and a feedback loop live beside the agents.', tools: ['Google Drive', 'Google Sheets', 'Gmail', 'Google Meet'] },
    ],
    security: [
      { title: 'HTTPS everywhere', text: 'Let’s Encrypt TLS with auto-renewal, HTTP redirected to HTTPS, HSTS and hardening headers, server details hidden.' },
      { title: 'Locked-down network', text: 'Only ports 80 and 443 are public. The database, API and engines listen on localhost, and SSH is key-only from an allowlisted IP.' },
      { title: 'Login protection', text: 'bcrypt passwords and signed JWTs that reject forged and alg:none tokens, with login rate-limited at Nginx.' },
      { title: 'Tested, not assumed', text: 'An authorised pentest checked SQL injection, JWT tampering and path traversal, and found and closed a privilege-escalation route.' },
      { title: 'Encrypted secrets', text: 'Amazon refresh tokens are stored AES-256-GCM encrypted per seller, outside the codebase.' },
      { title: 'Least access', text: 'Roles, per-user brand assignment and per-user agent allowlists. A revoked account loses access on its next request.' },
      { title: 'Domain & OS', text: 'DNSSEC on agent.accountant and unattended security updates on the server.' },
      { title: 'Recovery', text: 'An AMI snapshot before every deploy, with restores actually exercised, and a watchdog that saves diagnostics before restarting a stalled service.' },
    ],
    stack: [
      ['Frontend', ['React 18', 'React Router 6', 'Tailwind CSS 3', 'Recharts']],
      ['Backend', ['Node.js 24', 'Express 5', 'Sequelize 6', 'JWT', 'Worker threads']],
      ['Engine', ['Python 3.11', 'Pandas', 'pdfplumber', 'Tesseract OCR']],
      ['Data', ['PostgreSQL 16']],
      ['AI & automation', ['Claude', 'Gemini', 'n8n', 'Composio']],
      ['Infrastructure', ['AWS EC2', 'Nginx', "Let's Encrypt", 'PM2', 'Ubuntu']],
    ],
  },
  {
    id: 'aicfo',
    title: 'AICFO',
    kind: 'AI CFO copilot for D2C brands',
    repo: 'https://github.com/tech-colonel/Colonel-AICFO',
    overview:
      'AICFO turns a company’s Tally books into statements that reconcile, then lets the founder ask questions about them in plain language, in the app or straight from Claude. Every figure links down to the voucher behind it, so nothing has to be taken on trust.',
    facts: [
      ['Built with', 'FastAPI and LangGraph'],
      ['Works inside', 'Claude, as a connector'],
      ['Reads from', 'Tally, live or by upload'],
    ],
    features: [
      { title: 'Financial MIS', short: 'Statements that actually reconcile.', long: 'Day Book, Chart of Accounts and Trial Balance become a P&L, Balance Sheet and Cash Flow for any period, with drill-down from a statement line to the ledger and the voucher.', tools: ['Python 3.11', 'FastAPI', 'Tally'] },
      { title: 'AI CFO chat', short: 'Ask the books anything.', long: 'A LangGraph agent graph routes the question, guards against off-topic requests, writes and validates SQL, adds statement context, picks a chart and writes the answer, streamed live.', tools: ['LangGraph', 'Claude'] },
      { title: 'AI spreadsheet', short: 'A spreadsheet with the agent beside it.', long: 'A Univer grid where the agent loads live data, analyses it and exports to Excel. Each sheet saves with its conversation and reopens anywhere.', tools: ['Univer', 'React 18'] },
      { title: 'Claude connector', short: 'Your books, inside Claude.', long: 'A remote MCP server with read-only tools for the P&L, Balance Sheet, Cash Flow and channel P&L, plus CFO review workflows exposed as prompts in Claude.', tools: ['MCP', 'Claude', 'OAuth 2.1'] },
      { title: 'Tally connected', short: 'Live sync or a simple upload.', long: 'Reads straight from Tally’s XML gateway or from its standard exports, and every load reports what it read and anything it could not place.', tools: ['Tally', 'Python 3.11'] },
      { title: 'Analytics & alerts', short: 'Channels, margins and forecasts.', long: 'Multi-channel sales and GST analytics, trade margin, a pivot builder, forecasting, threshold alerts and scheduled report packs.', tools: ['Recharts', 'PostgreSQL 16'] },
    ],
    security: [
      { title: 'Tenant from the token', text: 'The company is read from the signed token and re-checked against the database. No tool accepts a company id, so the model cannot ask for another company’s data.' },
      { title: 'Least privilege', text: 'Connector tokens carry one audience and a finance:read scope, and there are no write tools at all.' },
      { title: 'Guarded SQL', text: 'Model-written SQL must be a single SELECT, passes a validator and is force-filtered to the company’s own brand.' },
      { title: 'PII masked', text: 'Buyer names, GSTINs, PANs, phones and addresses become one-way HMAC pseudonyms before any row reaches the model.' },
      { title: 'OAuth 2.1 with PKCE', text: 'Dynamic client registration and PKCE, 8-hour access tokens, and refreshes that re-check the user is still active.' },
      { title: 'Full audit trail', text: 'Every tool call is logged with who, which company, which tool, rows returned and duration, and auth and chat are rate-limited.' },
    ],
    stack: [
      ['Frontend', ['React 18', 'Vite 5', 'Tailwind CSS 3', 'Recharts', 'Univer']],
      ['Backend', ['Python 3.11', 'FastAPI', 'SQLAlchemy 2', 'Gunicorn']],
      ['Data', ['PostgreSQL 16']],
      ['AI', ['LangGraph', 'Claude', 'MCP']],
      ['Auth & deploy', ['OAuth 2.1', 'JWT', 'Render']],
    ],
  },
]

// The AICFO chat agent, step by step, as wired in its LangGraph graph.
export const graphSteps = [
  ['Router', 'Reads the question and decides what kind of answer it needs.'],
  ['Guardrail', 'Stops anything that is not about the company’s finances.'],
  ['SQL agent', 'Writes a query against this company’s books, then a validator checks it before it runs.'],
  ['Advisory', 'Pulls the P&L, Balance Sheet and Cash Flow for context.'],
  ['Visualizer', 'Picks a chart that fits the numbers.'],
  ['Synthesizer', 'Writes the answer, linked to the transactions behind it.'],
]
export const aicfoQuestion = 'Which channel is dragging profitability this quarter?'

export const trustlense = {
  title: 'TrustLense AI',
  kind: 'Capstone project',
  stack: ['Node.js', 'Express 5', 'MySQL', 'PHP'],
  text: 'Scores how trustworthy a piece of web, text or media content is, using similarity and credibility signals.',
}

// Skills, with the projects they were used in. 'aa' = agent.accountant, 'cfo' = AICFO.
export const skillGroups = [
  { group: 'Frontend', items: [['React 18', 'aa cfo'], ['React Router 6', 'aa'], ['Vite 5', 'cfo'], ['Tailwind CSS 3', 'aa cfo'], ['Recharts', 'aa cfo'], ['Univer', 'cfo']] },
  { group: 'Backend', items: [['Node.js 24', 'aa'], ['Express 5', 'aa'], ['FastAPI', 'cfo'], ['Python 3.11', 'aa cfo'], ['Sequelize 6', 'aa'], ['SQLAlchemy 2', 'cfo'], ['Pandas', 'aa'], ['Worker threads', 'aa'], ['JWT', 'aa cfo'], ['OAuth 2.0 / 2.1', 'aa cfo']] },
  { group: 'Databases', items: [['PostgreSQL 16', 'aa cfo'], ['Row-level security', 'aa'], ['Multi-tenancy', 'aa cfo'], ['MySQL', '']] },
  { group: 'AI & automation', items: [['Claude API', 'aa cfo'], ['Gemini API', 'aa'], ['LangGraph', 'cfo'], ['MCP servers', 'cfo'], ['n8n', 'aa'], ['Composio', 'aa'], ['Claude Code', 'aa cfo'], ['Codex', 'aa cfo']] },
  { group: 'Cloud & DevOps', items: [['AWS EC2', 'aa'], ['Elastic IP & AMI', 'aa'], ['Nginx', 'aa'], ['HTTPS / TLS', 'aa'], ['PM2', 'aa'], ['Linux', 'aa cfo'], ['Git & GitHub', 'aa cfo'], ['Render', 'cfo']] },
  { group: 'Integrations', items: [['Amazon SP-API', 'aa'], ['Shopify Admin API', 'aa'], ['Zoho Books', 'aa'], ['Zepto seller portal', 'aa'], ['Google Workspace', 'aa cfo'], ['Velocity, Eshopbox', 'aa'], ['Return Prime, Cashfree', 'aa'], ['Tally XML', 'aa cfo']] },
]

// The AI tools I build with, shown as ThreeUI brand orbs.
export const aiTools = [
  ['claude', 'Claude API & Claude Code'],
  ['codex', 'Codex'],
  ['gemini', 'Gemini API'],
  ['react', 'React'],
  ['github', 'GitHub'],
]

// Everything that feeds agent.accountant, grouped by what it sends in.
export const integrationRows = [
  ['Amazon SP-API', 'Shopify', 'Zepto', 'Flipkart', 'Myntra', 'Blinkit', 'Nykaa', 'Meesho', 'JioMart'],
  ['Velocity', 'Eshopbox', 'Return Prime', 'Cashfree', 'Zoho Books', 'Tally', 'GST portal', 'Bank statements'],
  ['Google Drive', 'Google Sheets', 'Google Docs', 'Gmail', 'Google Calendar', 'Google Meet', 'n8n', 'Composio', 'Claude'],
]

const d = (id) => `https://drive.google.com/file/d/${id}/view`

export const certificateGroups = [
  {
    name: 'AI & developer tools',
    issuer: 'Anthropic',
    logo: 'Anthropic',
    items: [{ name: 'Claude Code in Action', mark: 'Claude', url: d('1Mas4k_I_sQ6moRaiPlO01w2Zvn6bxS5N') }],
  },
  {
    name: 'Google',
    issuer: 'Google for Developers, with AICTE and EduSkills',
    logo: 'Google',
    items: [{ name: 'Android Developer Virtual Internship', note: 'Oct – Dec 2025', mark: 'Android', url: d('1DP3BLO39hdnFDfqfKoPAh-SsyeXeW9Jp') }],
  },
  {
    name: 'IIT Bombay',
    issuer: 'IIT Bombay',
    logo: 'IIT Bombay',
    items: [
      { name: 'Internship: Bootstrap, PHP & MySQL', note: 'Dec 2025 – Jan 2026', issuer: 'Internship, EduPyramids, SINE', mark: 'IIT Bombay', url: d('1YrPKFn3lnykpMa5bz3IjlIwBTAq1Jd7z') },
      { name: 'Bootstrap', note: 'Grade 97.5%', issuer: 'Internship, EduPyramids, SINE', mark: 'Bootstrap', url: d('15z18Za_IajAwc8LL7zM-GRycthrU76nv') },
      { name: 'PHP & MySQL', note: 'Grade 87.5%', issuer: 'Internship, EduPyramids, SINE', mark: 'PHP & MySQL', url: d('16_rpOJ7-9CUvypmTcfw5MLpzoawDjt6E') },
      { name: 'Python', issuer: 'Spoken Tutorial Project', mark: 'Python', url: d('1rMXOYSxCHPYKOpPhlUKU8-FjW3pV8ghw') },
      { name: 'RDBMS PostgreSQL', issuer: 'Spoken Tutorial Project', mark: 'PostgreSQL', url: d('1t_CypJb7Vx_34FRBSS0YBFuQo9b88Fbz') },
      { name: 'Java', issuer: 'Spoken Tutorial Project', mark: 'Java', url: d('1cNyY5d4JA9wPruMZVANo3JQg7Hnv5ErG') },
      { name: 'Android with Kotlin', issuer: 'Spoken Tutorial Project', mark: 'Kotlin', url: d('1QyqVYSNWAvFyiT8BMVgH6lmMTY34zZO0') },
      { name: 'HTML', issuer: 'Spoken Tutorial Project', mark: 'HTML', url: d('1pJdP-7eig-_jlRD267Gs0qcYMamWgLke') },
      { name: 'Introduction to Computers', issuer: 'Spoken Tutorial Project', mark: 'IIT Bombay', url: d('1h3rIQQLNx9xIbZM-ARbZqCYnn8vHRddl') },
    ],
  },
]
