import { useEffect, useRef } from 'react'

// A soft ink ring that trails the pointer and opens up over anything clickable.
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const hot = e.target.closest('a, button, [role="tab"], canvas')
      ring.current?.classList.toggle('is-hot', !!hot)
    }
    const loop = () => {
      rx += (x - rx) * (reduce ? 1 : 0.18)
      ry += (y - ry) * (reduce ? 1 : 0.18)
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    loop()
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
