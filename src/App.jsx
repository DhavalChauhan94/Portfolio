import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Lenis from 'lenis'
import { UplinkLoader } from '@designcodeio/threeui/components/UplinkLoader'
import { StreamConvergenceBackground } from '@designcodeio/threeui/components/StreamConvergenceBackground'
import { TypographyVortexCanvas } from '@designcodeio/threeui/components/TypographyVortexCanvas'
import { BrandOrbs } from '@designcodeio/threeui/components/BrandOrbs'
import '@designcodeio/threeui/style.css'

import ParticleName from './components/ParticleName'
import AgentGalaxy from './components/AgentGalaxy'
import AgentGraph from './components/AgentGraph'
import Skills from './components/Skills'
import Dock from './components/Dock'
import Cursor from './components/Cursor'
import Statement from './components/Statement'
import Certificates from './components/Certificates'
import Capabilities from './components/Capabilities'
import Work from './components/Work'
import ProjectCase from './components/ProjectCase'
import { LogoChip } from './components/Logo'
import { person, summary, projects, suites, trustlense, integrationRows, aiTools } from './data'

const HUE = ['#6d8bff', '#8fd3ff', '#b69cff', '#7ff0c8', '#ffb86b']

const sections = [
  ['top', 'Home'],
  ['about', 'About'],
  ['work', 'Work'],
  ['projects', 'Projects', [
    ['agent-accountant', 'agent.accountant', 'AI accounting automation, live'],
    ['aicfo', 'AICFO', 'AI CFO copilot, inside Claude'],
  ]],
  ['skills', 'Skills'],
  ['certificates', 'Certificates'],
  ['contact', 'Contact'],
]

function Chapter({ id, title, lede, children, className = '' }) {
  return (
    <section id={id} className={`chapter ${className}`}>
      <header className="chapter-head">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {title}
        </motion.h2>
        {lede && <p className="chapter-lede">{lede}</p>}
      </header>
      {children}
    </section>
  )
}

export default function App() {
  const [loading, setLoading] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const lenis = useRef(null)
  const hero = useRef(null)
  const { scrollYProgress: heroOut } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const touch = window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.current = l
    let raf = 0
    const loop = (t) => { l.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); l.destroy() }
  }, [])

  useEffect(() => {
    if (!loading) return
    lenis.current?.stop()
    const t = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(t)
  }, [loading])
  useEffect(() => { if (!loading) lenis.current?.start() }, [loading])

  const go = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis.current) lenis.current.scrollTo(el, { offset: id === 'top' ? 0 : -96 })
    else el.scrollIntoView()
  }

  const [aa, cfo] = projects

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Cursor />
      <motion.div className="progress" style={{ scaleX: bar }} aria-hidden="true" />

      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.7 }}>
            <UplinkLoader className="loader-art" />
          </motion.div>
        )}
      </AnimatePresence>

      <Dock items={sections} onGo={go} resume={person.resume} />

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero" ref={hero}>
          {!loading && <ParticleName kicker={person.role} progress={heroOut} />}
          <h1 className="sr-only">{person.name}, {person.role}</h1>
          <motion.p className="hero-hint" initial={{ opacity: 0 }} animate={loading ? {} : { opacity: 1 }} transition={{ delay: 2 }}>
            {touch ? 'Touch the name and drag.' : 'Move your cursor through the name.'}
          </motion.p>
          <motion.button className="scroll-cue" onClick={() => go('about')} initial={{ opacity: 0 }} animate={loading ? {} : { opacity: 1 }} transition={{ delay: 2.2 }} aria-label="Scroll to the next section">
            <span />
          </motion.button>
        </section>

        {/* About */}
        <section id="about" className="about">
          <p className="about-kicker">About me</p>
          <Statement text={summary} />
          <Capabilities />
        </section>

        {/* Work */}
        <Chapter id="work" title="Work">
          <Work />
        </Chapter>

        {/* Projects */}
        <section id="projects" className="chapter projects">
          <header className="chapter-head">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              Projects
            </motion.h2>
            <p className="chapter-lede">Two products I build at Colonel. Open a tab to see what each one does, how it is secured and what it is built with.</p>
          </header>

          <ProjectCase
            p={aa}
            showcase={<AgentGalaxy />}
            aside={
              <div className="aside-card">
                <p className="aside-title">Five suites</p>
                <ul className="aside-suites">
                  {suites.map((s, i) => (
                    <li key={s.name} style={{ '--c': HUE[i] }}><span className="dot" />{s.name}<em>{s.agents.length}</em></li>
                  ))}
                </ul>
                <p className="aside-note">Open Features to fly through them in 3D.</p>
              </div>
            }
          />
        </section>

        {/* Integrations */}
        <section className="streams" aria-labelledby="streams-title">
          <div className="streams-bg" aria-hidden="true">
            <StreamConvergenceBackground hue={-30} opacity={0.55} brightness={0.85} speed={0.7} />
          </div>
          <div className="streams-inner">
            <h2 id="streams-title">Everything flows into one ledger</h2>
            <p className="chapter-lede">Marketplaces, logistics, payments, Google Workspace and Tally, all pulled into agent.accountant by connectors I built.</p>
          </div>
          <div className="marquees">
            {integrationRows.map((row, i) => (
              <div key={i} className={`marquee ${i % 2 ? 'rev' : ''}`} style={{ '--d': `${38 + i * 8}s` }}>
                <div className="marquee-track">
                  {[...row, ...row].map((n, k) => <span key={k} aria-hidden={k >= row.length}><LogoChip name={n} className="bare" /></span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="chapter projects projects-2">
          <ProjectCase
            p={cfo}
            showcase={<div className="aicfo-showcase"><AgentGraph /></div>}
            aside={
              <div className="mcp-card">
                <div className="orb-wrap"><BrandOrbs variant="claude" size="medium" mode="dark" aria-label="Claude" /></div>
                <p className="mcp-title">Connected to Claude</p>
                <p className="mcp-text">AICFO runs as a custom connector: a client asks about their books inside Claude, and only the narrow answer ever leaves our server.</p>
              </div>
            }
          />

          <div className="side-project">
            <h3>{trustlense.title}</h3>
            <p className="kind">{trustlense.kind}</p>
            <p>{trustlense.text}</p>
            <div className="chip-row">{trustlense.stack.map((t) => <LogoChip key={t} name={t} />)}</div>
          </div>
        </section>

        {/* Skills */}
        <Chapter id="skills" title="Skills" lede="The AI tools I build with every day, then everything else. Filter by project to see what I used where.">
          <ul className="orbs" aria-label="AI tools I build with">
            {aiTools.map(([v, label]) => (
              <li key={v}>
                <div className="orb-wrap"><BrandOrbs variant={v} size="medium" mode="dark" aria-label={label} /></div>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <Skills />
        </Chapter>

        {/* Certificates */}
        <Chapter id="certificates" title="Certificates" lede="Grouped by issuer. Every card opens the certificate itself.">
          <Certificates />
          <p className="edu"><strong>BSc Information Technology</strong>, Nagindas Khandwala College, Mumbai. Graduated 2026 with a CGPA of 8.50.</p>
        </Chapter>

        {/* Finale */}
        <section id="contact" className="finale">
          <div className="finale-bg">
            <TypographyVortexCanvas mode="dark" phrase="DHAVAL CHAUHAN / AI AGENTS / FULL STACK / AWS / " speed={0.8} />
          </div>
          <div className="finale-card">
            <h2>Let’s build something that runs.</h2>
            <p>I’m open to full stack and AI engineering roles. Email is the quickest way to reach me.</p>
            <a className="finale-mail" href={`mailto:${person.email}`}>{person.email}</a>
            <ul className="contact-links">
              <li><a href={person.linkedin}>LinkedIn</a></li>
              <li><a href={person.github}>GitHub</a></li>
              <li><a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a></li>
              <li><a href={person.resume} download>Resume (PDF)</a></li>
            </ul>
          </div>
          <p className="finale-hint">Click the rings to pull the words in.</p>
        </section>
      </main>

      <footer className="footer">
        <p>Built by Dhaval Chauhan with React, Three.js, Motion and ThreeUI.</p>
      </footer>
    </>
  )
}
