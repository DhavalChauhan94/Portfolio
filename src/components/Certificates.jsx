import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Logo from './Logo'
import { certificateGroups } from '../data'

// Engraved certificates, after ThreeUI's Engraved Certificate: a guilloche ring
// around the issuer's real mark, and a card that tilts toward the pointer.
// Grouped by issuer, and every card opens the real file.

function Guilloche({ seed }) {
  const rings = []
  for (let k = 0; k < 5; k++) {
    const r = 30 + k * 4.5
    const lobes = 11 + ((seed + k) % 4) * 2
    let d = ''
    for (let i = 0; i <= 200; i++) {
      const a = (i / 200) * Math.PI * 2
      const rr = r + Math.sin(a * lobes + k) * (1.8 + k * 0.3)
      d += `${i ? 'L' : 'M'}${(60 + Math.cos(a) * rr).toFixed(2)} ${(60 + Math.sin(a) * rr).toFixed(2)}`
    }
    rings.push(<path key={k} d={d + 'Z'} />)
  }
  return <svg viewBox="0 0 120 120" className="guilloche" aria-hidden="true">{rings}</svg>
}

function Card({ c, group, i }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 260, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-11, 11]), { stiffness: 260, damping: 20 })
  const shine = useTransform([mx, my], ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.35), transparent 50%)`)

  return (
    <motion.li
      layout
      className="cert-cell"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: i * 0.04 }}
    >
      <motion.a
        ref={ref}
        href={c.url}
        target="_blank"
        rel="noreferrer"
        className="cert"
        onPointerMove={(e) => {
          const b = ref.current.getBoundingClientRect()
          mx.set((e.clientX - b.left) / b.width)
          my.set((e.clientY - b.top) / b.height)
        }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5) }}
        style={{ rotateX: rx, rotateY: ry }}
      >
        <span className="seal">
          <Guilloche seed={i + group.name.length} />
          <span className="seal-mark"><Logo name={c.mark} size={28} light /></span>
        </span>
        <span className="cert-issuer"><Logo name={group.logo} size={14} light />{group.name === 'IIT Bombay' ? `IIT Bombay, ${c.issuer}` : group.issuer}</span>
        <span className="cert-name">{c.name}</span>
        {c.note && <span className="cert-note">{c.note}</span>}
        <span className="cert-open">View certificate</span>
        <motion.span className="cert-shine" style={{ background: shine }} aria-hidden="true" />
      </motion.a>
    </motion.li>
  )
}

export default function Certificates() {
  const [g, setG] = useState('All')
  const groups = ['All', ...certificateGroups.map((x) => x.name)]
  const shown = certificateGroups.filter((x) => g === 'All' || x.name === g)
  const count = (name) => (name === 'All' ? certificateGroups.reduce((n, x) => n + x.items.length, 0) : certificateGroups.find((x) => x.name === name).items.length)

  return (
    <div className="cert-wrap">
      <div className="filters" role="tablist" aria-label="Certificate categories">
        {groups.map((name) => {
          const grp = certificateGroups.find((x) => x.name === name)
          return (
            <button key={name} role="tab" aria-selected={g === name} className={`chip ${g === name ? 'is-on' : ''}`} onClick={() => setG(name)}>
              {g === name && <motion.span layoutId="cert-ink" className="chip-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="chip-label">
                {grp && <Logo name={grp.logo} size={15} color={g === name ? '#05070f' : undefined} />}
                {name}
                <em>{count(name)}</em>
              </span>
            </button>
          )
        })}
      </div>

      <motion.ul layout className="certs">
        <AnimatePresence>
          {shown.flatMap((grp) => grp.items.map((c) => ({ c, grp }))).map(({ c, grp }, i) => (
            <Card key={c.url} c={c} group={grp} i={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
