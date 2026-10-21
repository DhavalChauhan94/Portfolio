import {
  siReact, siReactrouter, siVite, siTailwindcss, siNodedotjs, siExpress, siFastapi, siSequelize, siSqlalchemy,
  siPandas, siJsonwebtokens, siOpenid, siPostgresql, siMysql, siClaude, siAnthropic, siGooglegemini, siN8n,
  siLanggraph, siModelcontextprotocol, siNginx, siPm2, siLinux, siUbuntu, siGit, siGithub, siRender, siShopify,
  siZoho, siGoogledrive, siGooglesheets, siGoogledocs, siGmail, siGooglecalendar, siGooglemeet, siGoogle,
  siPython, siJavascript, siLetsencrypt, siAndroid, siKotlin, siHtml5, siPhp, siBootstrap, siOpenjdk, siClaudecode,
  siGunicorn, siPostman, siCss,
} from 'simple-icons'

// Brand marks from Simple Icons (CC0). Brands it does not carry get a small
// monogram tile in a colour close to their own, so every chip still has a mark.

const SI = {
  'React': siReact, 'React 18': siReact, 'React Router 6': siReactrouter, 'Vite 5': siVite, 'Vite': siVite,
  'Tailwind CSS 3': siTailwindcss, 'Node.js 24': siNodedotjs, 'Node.js': siNodedotjs, 'Express 5': siExpress, 'Express': siExpress,
  'FastAPI': siFastapi, 'Sequelize 6': siSequelize, 'SQLAlchemy 2': siSqlalchemy, 'Pandas': siPandas,
  'JWT': siJsonwebtokens, 'OAuth 2.0 / 2.1': siOpenid, 'OAuth 2.1': siOpenid, 'PostgreSQL 16': siPostgresql, 'PostgreSQL': siPostgresql,
  'MySQL': siMysql, 'Claude API': siClaude, 'Claude': siClaude, 'Claude Code': siClaudecode, 'Anthropic': siAnthropic,
  'Gemini API': siGooglegemini, 'Gemini': siGooglegemini, 'n8n': siN8n, 'LangGraph': siLanggraph,
  'MCP servers': siModelcontextprotocol, 'MCP': siModelcontextprotocol, 'Nginx': siNginx, 'PM2': siPm2,
  'Linux': siLinux, 'Ubuntu': siUbuntu, 'Git & GitHub': siGithub, 'Git': siGit, 'GitHub': siGithub, 'Render': siRender,
  'Shopify Admin API': siShopify, 'Shopify': siShopify, 'Zoho Books': siZoho, 'Google Workspace': siGoogle, 'Google': siGoogle,
  'Google Drive': siGoogledrive, 'Google Sheets': siGooglesheets, 'Google Docs': siGoogledocs, 'Gmail': siGmail,
  'Google Calendar': siGooglecalendar, 'Google Meet': siGooglemeet, 'Python 3.11': siPython, 'Python': siPython,
  'JavaScript': siJavascript, 'HTTPS / TLS': siLetsencrypt, "Let's Encrypt": siLetsencrypt, 'Android': siAndroid,
  'Android with Kotlin': siKotlin, 'Kotlin': siKotlin, 'HTML': siHtml5, 'PHP & MySQL': siPhp, 'PHP': siPhp,
  'Bootstrap': siBootstrap, 'Java': siOpenjdk, 'Gunicorn': siGunicorn, 'Postman': siPostman, 'CSS': siCss,
  'Univer': null, 'Recharts': null,
}

const MONO = {
  'AWS': ['aws', '#FF9900'], 'AWS EC2': ['aws', '#FF9900'], 'Elastic IP & AMI': ['EC2', '#FF9900'],
  'Amazon SP-API': ['a', '#FF9900'], 'Zepto seller portal': ['Z', '#7B2CBF'], 'Zepto': ['Z', '#7B2CBF'],
  'Velocity, Eshopbox': ['V', '#2E7DF6'], 'Velocity': ['V', '#2E7DF6'], 'Eshopbox': ['E', '#F25C2A'],
  'Return Prime, Cashfree': ['₹', '#6A3FF2'], 'Cashfree': ['C', '#6A3FF2'], 'Return Prime': ['R', '#111827'],
  'Tally XML': ['T', '#1D4ED8'], 'Tally': ['T', '#1D4ED8'], 'Composio': ['C', '#10B981'], 'Codex': ['>_', '#E5E7EB'],
  'Recharts': ['R', '#22B5BF'], 'Univer': ['U', '#2C53F1'], 'Worker threads': ['⇉', '#5FA04E'],
  'Row-level security': ['RLS', '#4169E1'], 'Multi-tenancy': ['MT', '#4169E1'], 'Tesseract OCR': ['OCR', '#3c8dbc'],
  'pdfplumber': ['pdf', '#D71F00'], 'GST portal': ['GST', '#F59E0B'], 'IIT Bombay': ['IIT', '#1F3A93'],
}

// Dark brand colours vanish on a dark page, so lift them to paper white.
function visible(hex) {
  const n = parseInt(hex, 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70 ? '#e9ecf7' : `#${hex}`
}

export function hasLogo(name) {
  return Boolean(SI[name] || MONO[name])
}

export default function Logo({ name, size = 18, color, light = false, className = '' }) {
  if (name === 'IIT Bombay') {
    return <img src="/logos/iit-bombay.svg" alt="" width={size} height={size} className={`logo ${className}`} style={{ objectFit: 'contain' }} />
  }
  const si = SI[name]
  if (si) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={`logo ${className}`} aria-hidden="true">
        <path d={si.path} fill={color || (light ? `#${si.hex}` : visible(si.hex))} />
      </svg>
    )
  }
  const m = MONO[name]
  if (!m) return null
  const [txt, bg] = m
  const fs = txt.length > 2 ? 7 : txt.length === 2 ? 9 : 12
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`logo ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill={bg} />
      <text x="12" y="12.5" textAnchor="middle" dominantBaseline="middle" fontFamily="IBM Plex Sans, sans-serif" fontWeight="700" fontSize={fs} fill={bg === '#E5E7EB' ? '#111' : '#fff'}>{txt}</text>
    </svg>
  )
}

export function LogoChip({ name, className = '' }) {
  return (
    <span className={`logo-chip ${className}`}>
      <Logo name={name} size={16} />
      <span>{name}</span>
    </span>
  )
}
