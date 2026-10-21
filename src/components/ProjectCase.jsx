import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Spot from './Spot'
import Logo, { LogoChip } from './Logo'

const TABS = ['Overview', 'Features', 'Security', 'Tech stack']
const AUTO_MS = 10_000 // time on each tab before moving to the next
const LOCK_MS = 5 * 60_000 // after a visitor picks a tab, stay there this long

// Flip cards after ThreeUI's Arca benefits: the front says what it is, the back
// says how it works. Hover or tap to turn one over.
function FlipCard({ f, i }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flip-cell"
    >
      <button
        className={`flip ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${f.title}. ${flipped ? f.long : f.short}`}
      >
        <span className="flip-inner">
          <span className="flip-face flip-front">
            <span className="flip-logos">{f.tools.map((t) => <Logo key={t} name={t} size={20} />)}</span>
            <span className="flip-title">{f.title}</span>
            <span className="flip-short">{f.short}</span>
            <span className="flip-more">How it works</span>
          </span>
          <span className="flip-face flip-back">
            <span className="flip-title">{f.title}</span>
            <span className="flip-long">{f.long}</span>
          </span>
        </span>
      </button>
    </motion.li>
  )
}

function Shield() {
  return (
    <svg viewBox="0 0 24 24" className="shield" aria-hidden="true">
      <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.6-7.5 10-4.3-1.4-7.5-5.4-7.5-10v-6z" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" className="tick" />
    </svg>
  )
}

export default function ProjectCase({ p, showcase, aside }) {
  const [tab, setTab] = useState('Overview')
  const [progress, setProgress] = useState(0)
  const [locked, setLocked] = useState(false)
  const box = useRef(null)
  const elapsed = useRef(0)
  const lockUntil = useRef(0)
  const inView = useRef(false)
  const hovering = useRef(false)

  // Tabs advance on their own every 10 s while the project is on screen and the
  // pointer is not resting on it. Picking a tab holds it for 5 minutes.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting }, { threshold: 0.35 })
    io.observe(box.current)
    const id = setInterval(() => {
      const isLocked = Date.now() < lockUntil.current
      setLocked(isLocked)
      if (isLocked || !inView.current || hovering.current) return
      elapsed.current += 100
      if (elapsed.current >= AUTO_MS) {
        elapsed.current = 0
        setTab((t) => TABS[(TABS.indexOf(t) + 1) % TABS.length])
      }
      setProgress(elapsed.current / AUTO_MS)
    }, 100)
    return () => { clearInterval(id); io.disconnect() }
  }, [])

  const pick = (t) => {
    setTab(t)
    lockUntil.current = Date.now() + LOCK_MS
    elapsed.current = 0
    setProgress(0)
    setLocked(true)
  }

  return (
    <article className="case" id={p.id} ref={box} aria-labelledby={`${p.id}-title`}>
      <header className="case-head">
        <div>
          <h3 id={`${p.id}-title`} className="case-title">{p.title}</h3>
          <p className="case-kind">{p.kind}</p>
        </div>
        <div className="case-links">
          {p.live && <a className="btn" href={p.live}><span className="live-dot" />Open the live site</a>}
          <a className="btn btn-ghost" href={p.repo}>Repository</a>
        </div>
      </header>

      <div className="tabs" role="tablist" aria-label={`${p.title} details`}>
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={`tab ${tab === t ? 'is-on' : ''}`} onClick={() => pick(t)}>
            {tab === t && <motion.span layoutId={`tab-ink-${p.id}`} className="tab-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="tab-label">{t}</span>
            {tab === t && !locked && <span className="tab-timer" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="case-body" role="tabpanel" onPointerEnter={() => { hovering.current = true }} onPointerLeave={() => { hovering.current = false }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'Overview' && (
              <div className="overview">
                <div>
                  <p className="overview-text">{p.overview}</p>
                  <dl className="facts">
                    {p.facts.map(([k, v]) => (
                      <div key={k} className="fact"><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                </div>
                {aside}
              </div>
            )}

            {tab === 'Features' && (
              <>
                {showcase}
                <ul className="flips">
                  {p.features.map((f, i) => <FlipCard key={f.title} f={f} i={i} />)}
                </ul>
              </>
            )}

            {tab === 'Security' && (
              <ul className="sec-grid">
                {p.security.map((s, i) => (
                  <motion.li key={s.title} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <Spot className="sec">
                      <Shield />
                      <p className="sec-title">{s.title}</p>
                      <p className="sec-text">{s.text}</p>
                    </Spot>
                  </motion.li>
                ))}
              </ul>
            )}

            {tab === 'Tech stack' && (
              <dl className="stack-groups">
                {p.stack.map(([group, items], gi) => (
                  <motion.div key={group} className="stack-group" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: gi * 0.06 }}>
                    <dt>{group}</dt>
                    <dd>{items.map((t) => <LogoChip key={t} name={t} className="big" />)}</dd>
                  </motion.div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  )
}
