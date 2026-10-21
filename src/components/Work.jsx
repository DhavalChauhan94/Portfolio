import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import Spot from './Spot'
import Logo from './Logo'
import { experience } from '../data'

// A career path in the spirit of ThreeUI's DRIFT timeline: a line that draws
// itself as you scroll, a glowing marker riding its tip, and each role's work
// as cards that light up under the pointer.

function Role({ job, index }) {
  return (
    <li className="role">
      <div className="role-node" aria-hidden="true"><span /></div>
      <div className="role-head">
        <p className="when">{job.when}</p>
        <h3>{job.title}</h3>
        <p className="org">
          {job.org}, {job.where}
          {job.current && <span className="now"><span className="live-dot" />Current role</span>}
        </p>
      </div>
      <div className={`role-grid ${job.points.length === 1 ? 'is-single' : ''}`}>
        {job.points.map((p, i) => (
          <motion.div
            key={p.head}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: (index ? 0 : 0.05) + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Spot className="work-card">
              <p className="work-head">{p.head}</p>
              <p className="work-text">{p.text}</p>
              <div className="work-logos">
                {p.tools.map((t) => (
                  <span key={t} className="work-logo" title={t}><Logo name={t} size={18} /></span>
                ))}
              </div>
            </Spot>
          </motion.div>
        ))}
      </div>
    </li>
  )
}

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const top = useTransform(draw, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  return (
    <div className="work" ref={ref}>
      <div className="track" aria-hidden="true">
        <motion.div className="track-fill" style={{ scaleY: draw }} />
        <motion.div className="track-dot" style={{ top }} />
      </div>
      <ol className="roles">
        {experience.map((job, i) => <Role key={job.org} job={job} index={i} />)}
      </ol>
    </div>
  )
}
