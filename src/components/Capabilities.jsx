import { motion } from 'motion/react'
import Spot from './Spot'
import { LogoChip } from './Logo'
import { capabilities } from '../data'

export default function Capabilities() {
  return (
    <ul className="caps">
      {capabilities.map((c, i) => (
        <motion.li
          key={c.title}
          initial={{ opacity: 0, y: 40, rotateX: -12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Spot className="cap">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <div className="chip-row">
              {c.tools.map((t) => <LogoChip key={t} name={t} />)}
            </div>
          </Spot>
        </motion.li>
      ))}
    </ul>
  )
}
