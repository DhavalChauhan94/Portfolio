import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// The sentence inks itself in, word by word, as you scroll through it.
function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const blur = useTransform(progress, range, ['blur(6px)', 'blur(0px)'])
  return (
    <>
      <motion.span className="st-word" style={{ opacity, filter: blur }}>{children}</motion.span>{' '}
    </>
  )
}

export default function Statement({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="statement">
      {words.map((w, i) => {
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}
