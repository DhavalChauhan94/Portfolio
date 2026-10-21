import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'

// A floating dock in the spirit of ThreeUI's Animated Top Dock: items swell as
// the pointer comes near, the section you are reading stays lit, and Projects
// opens a small menu of the projects underneath it.

function useMagnify(ref, mouseX) {
  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect()
    return b ? x - (b.left + b.width / 2) : 999
  })
  const scale = useSpring(useTransform(dist, [-130, 0, 130], [1, 1.22, 1]), { stiffness: 380, damping: 26 })
  const y = useSpring(useTransform(dist, [-130, 0, 130], [0, 3, 0]), { stiffness: 380, damping: 26 })
  return { scale, y }
}

function Item({ id, label, mouseX, active, onGo }) {
  const ref = useRef(null)
  const { scale, y } = useMagnify(ref, mouseX)
  return (
    <motion.a
      ref={ref}
      href={`#${id}`}
      onClick={(e) => { e.preventDefault(); onGo(id) }}
      className={`dock-item ${active ? 'is-on' : ''}`}
      style={{ scale, y }}
      aria-current={active ? 'true' : undefined}
    >
      {active && <motion.span layoutId="dock-ink" className="dock-ink" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
      <span className="dock-label">{label}</span>
    </motion.a>
  )
}

function Menu({ label, children: kids, mouseX, active, onGo }) {
  const ref = useRef(null)
  const { scale, y } = useMagnify(ref, mouseX)
  const [open, setOpen] = useState(false)
  const close = useRef(0)
  const show = () => { clearTimeout(close.current); setOpen(true) }
  const hide = () => { close.current = setTimeout(() => setOpen(false), 160) }

  return (
    <div className="dock-menu" onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={hide}>
      <motion.button
        ref={ref}
        className={`dock-item ${active ? 'is-on' : ''}`}
        style={{ scale, y }}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {active && <motion.span layoutId="dock-ink" className="dock-ink" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
        <span className="dock-label">{label}<svg viewBox="0 0 12 12" className="caret" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg></span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="dock-pop"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            {kids.map(([id, name, hint]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); setOpen(false); onGo(id) }}>
                <strong>{name}</strong>
                <span>{hint}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Dock({ items, onGo, resume }) {
  const mouseX = useMotionValue(-9999)
  const [current, setCurrent] = useState(items[0][0])

  useEffect(() => {
    const ids = items.flatMap(([id, , kids]) => (kids ? kids.map((k) => k[0]) : [id]))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <motion.nav
      className="dock"
      aria-label="Sections"
      onPointerMove={(e) => mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(-9999)}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, type: 'spring', stiffness: 200, damping: 22 }}
    >
      {items.map(([id, label, kids]) =>
        kids ? (
          <Menu key={id} label={label} mouseX={mouseX} onGo={onGo} active={kids.some((k) => k[0] === current)}>
            {kids}
          </Menu>
        ) : (
          <Item key={id} id={id} label={label} mouseX={mouseX} active={current === id} onGo={onGo} />
        ),
      )}
      <a className="dock-cta" href={resume} download>Resume</a>
    </motion.nav>
  )
}
