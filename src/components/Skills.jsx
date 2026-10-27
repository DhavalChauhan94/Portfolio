import { useState } from 'react'
import { motion } from 'motion/react'
import Logo from './Logo'
import { skillGroups } from '../data'

const filters = [
  ['all', 'Everything'],
  ['aa', 'Used in agent.accountant'],
  ['cfo', 'Used in AICFO'],
]

export default function Skills() {
  const [f, setF] = useState('all')
  const used = (tags) => f === 'all' || tags.split(' ').includes(f)

  return (
    <div className="skills">
      <div className="filters" role="group" aria-label="Filter skills by project">
        {filters.map(([k, label]) => (
          <button key={k} className={`chip ${f === k ? 'is-on' : ''}`} aria-pressed={f === k} onClick={() => setF(k)}>
            {f === k && <motion.span layoutId="chip-ink" className="chip-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="chip-label">{label}</span>
          </button>
        ))}
      </div>

      <table className="tb">
        <caption className="sr-only">Skills grouped by area</caption>
        <tbody>
          {skillGroups.map((g) => (
            <tr key={g.group}>
              <th scope="row">{g.group}</th>
              <td>
                <ul className="skill-list">
                  {g.items.map(([name, tags]) => (
                    <li key={name} className={used(tags) ? '' : 'is-dim'}>
                      <Logo name={name} size={17} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
