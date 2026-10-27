import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { graphSteps, aicfoQuestion } from '../data'

export default function AgentGraph() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  const play = () => {
    clearInterval(timer.current)
    setPlaying(true)
    setStep(0)
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      if (i >= graphSteps.length) {
        clearInterval(timer.current)
        setPlaying(false)
        return
      }
      setStep(i)
    }, reduce ? 250 : 900)
  }

  const current = step >= 0 ? graphSteps[step] : null
  const finished = step === graphSteps.length - 1 && !playing

  return (
    <div className="graph">
      <div className="graph-ask">
        <p className="graph-q">“{aicfoQuestion}”</p>
        <button className="btn" onClick={play} disabled={playing}>
          {step === -1 ? 'Ask the agent' : 'Ask again'}
        </button>
      </div>

      <ol className="graph-nodes" aria-label="Agent steps">
        {graphSteps.map(([name], i) => {
          const state = i < step ? 'past' : i === step ? 'now' : 'next'
          return (
            <li key={name} className={`node is-${state}`}>
              <button onClick={() => { clearInterval(timer.current); setPlaying(false); setStep(i) }} aria-current={state === 'now' ? 'step' : undefined}>
                {name}
              </button>
              {i < graphSteps.length - 1 && (
                <span className="edge" aria-hidden="true">
                  <motion.span className="edge-fill" initial={false} animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} />
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <div className="graph-say" aria-live="polite">
        {current ? (
          <motion.p key={step} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <strong>{current[0]}.</strong> {current[1]}
            {finished && ' The same tools are open to Claude through the MCP connector.'}
          </motion.p>
        ) : (
          <p className="muted">Press “Ask the agent” to watch a question move through the LangGraph graph.</p>
        )}
      </div>
    </div>
  )
}
