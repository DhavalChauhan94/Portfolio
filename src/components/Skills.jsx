import Logo from './Logo'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <div className="skills">
      <table className="tb">
        <caption className="sr-only">Skills grouped by area</caption>
        <tbody>
          {skillGroups.map((g) => (
            <tr key={g.group}>
              <th scope="row">{g.group}</th>
              <td>
                <ul className="skill-list">
                  {g.items.map((name) => (
                    <li key={name}>
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
