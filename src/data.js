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

export const trustlense = {
  title: 'TrustLense AI',
  kind: 'Capstone project',
  stack: ['Node.js', 'Express 5', 'MySQL', 'PHP'],
  text: 'Scores how trustworthy a piece of web, text or media content is, using similarity and credibility signals.',
}

// Skills, grouped by area.
export const skillGroups = [
  { group: 'Frontend', items: ['React 18', 'React Router 6', 'Vite 5', 'Tailwind CSS 3', 'Recharts', 'Univer'] },
  { group: 'Backend', items: ['Node.js 24', 'Express 5', 'FastAPI', 'Python 3.11', 'Sequelize 6', 'SQLAlchemy 2', 'Pandas', 'Worker threads', 'JWT', 'OAuth 2.0 / 2.1'] },
  { group: 'Databases', items: ['PostgreSQL 16', 'Row-level security', 'Multi-tenancy', 'MySQL'] },
  { group: 'AI & automation', items: ['Claude API', 'Gemini API', 'LangGraph', 'MCP servers', 'n8n', 'Composio', 'Claude Code', 'Codex'] },
  { group: 'Cloud & DevOps', items: ['AWS EC2', 'Elastic IP & AMI', 'Nginx', 'HTTPS / TLS', 'PM2', 'Linux', 'Git & GitHub', 'Render'] },
  { group: 'Integrations', items: ['Amazon SP-API', 'Shopify Admin API', 'Zoho Books', 'Google Workspace', 'Tally XML'] },
]

// The AI tools I build with, shown as ThreeUI brand orbs.
export const aiTools = [
  ['claude', 'Claude API & Claude Code'],
  ['codex', 'Codex'],
  ['gemini', 'Gemini API'],
  ['react', 'React'],
  ['github', 'GitHub'],
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
