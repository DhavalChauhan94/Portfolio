import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// The name, drawn as a few thousand ink particles. They fly in from depth, part
// around the cursor like ink pushed by a fingertip, and drift apart as you scroll away.

const vert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uDpr;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uDpr;
    gl_Position = projectionMatrix * mv;
  }
`
const frag = /* glsl */ `
  varying vec3 vColor;
  uniform float uAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(vColor, a * uAlpha);
  }
`

// Draws the role line (small) above the name (large) and returns one particle
// per inked pixel step, each carrying its own dot size.
function sampleText(lines, kicker, w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d', { willReadFrequently: true })
  const size = Math.min(w * (w < 700 ? 0.235 : 0.155), h * 0.3)
  const small = Math.max(15, Math.min(w * 0.045, 26))
  const gap = size * 0.98
  const block = gap * (lines.length - 1) + size
  const top = h / 2 - block / 2 + small * 0.9
  g.fillStyle = '#fff'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.font = `800 ${size}px "Bricolage Grotesque", sans-serif`
  lines.forEach((l, i) => g.fillText(l, w / 2, top + size / 2 + i * gap))
  const bigData = g.getImageData(0, 0, w, h).data
  g.clearRect(0, 0, w, h)
  g.font = `600 ${small}px "Bricolage Grotesque", sans-serif`
  const kickerY = top - small * 1.6
  if (kicker) g.fillText(kicker, w / 2, kickerY)
  const smallData = g.getImageData(0, 0, w, h).data

  const pts = []
  const step = Math.max(w < 700 ? 2 : 3, Math.round(size / 34))
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (bigData[(y * w + x) * 4 + 3] > 128) pts.push([x - w / 2 + (Math.random() - 0.5) * step * 0.6, h / 2 - y + (Math.random() - 0.5) * step * 0.6, step * (0.55 + Math.random() * 0.6)])
    }
  }
  // The role line is small, so it needs a much finer grid to stay readable.
  const fine = small < 20 ? 1 : 1.5
  const y0 = Math.max(0, Math.floor(kickerY - small))
  const y1 = Math.min(h, Math.ceil(kickerY + small))
  for (let y = y0; y < y1; y += fine) {
    for (let x = 0; x < w; x += fine) {
      if (smallData[(Math.round(y) * w + Math.round(x)) * 4 + 3] > 140) pts.push([x - w / 2, h / 2 - y, fine * 1.35, 1])
    }
  }
  return { pts }
}

const NAME = ['DHAVAL', 'CHAUHAN']

export default function ParticleName({ lines = NAME, kicker = '', progress }) {
  const host = useRef(null)

  useEffect(() => {
    const el = host.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = el.clientWidth
    let h = el.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -2000, 2000)
    camera.position.z = 10

    let points, geo, mat, home, pos, vel, count
    const mouse = { x: 9999, y: 9999, active: false }
    let raf = 0
    let visible = true
    const t0 = performance.now()

    const build = () => {
      if (points) {
        scene.remove(points)
        geo.dispose()
        mat.dispose()
      }
      const { pts } = sampleText(lines, kicker, w, h)
      count = pts.length
      home = new Float32Array(count * 3)
      pos = new Float32Array(count * 3)
      vel = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      const colors = new Float32Array(count * 3)
      const paper = new THREE.Color('#eef0f7')
      const blue = new THREE.Color('#6d8bff')
      const red = new THREE.Color('#ff6a5c')
      for (let i = 0; i < count; i++) {
        home[i * 3] = pts[i][0]
        home[i * 3 + 1] = pts[i][1]
        home[i * 3 + 2] = 0
        const r = Math.max(w, h) * (0.6 + Math.random() * 0.8)
        const a = Math.random() * Math.PI * 2
        pos[i * 3] = reduce ? pts[i][0] : Math.cos(a) * r
        pos[i * 3 + 1] = reduce ? pts[i][1] : Math.sin(a) * r
        pos[i * 3 + 2] = reduce ? 0 : (Math.random() - 0.5) * 800
        sizes[i] = pts[i][2]
        const roll = Math.random()
        const c = pts[i][3] ? paper : roll < 0.06 ? blue : roll < 0.075 ? red : paper
        colors[i * 3] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b
      }
      geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
      mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        uniforms: { uDpr: { value: dpr }, uAlpha: { value: 1 } },
      })
      points = new THREE.Points(geo, mat)
      scene.add(points)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || !points) return
      const t = (performance.now() - t0) / 1000
      const intro = Math.min(1, t / 2.2)
      const pull = 0.015 + intro * 0.06
      const scatter = progress ? progress.get() : 0
      const radius = Math.min(w, h) * 0.13
      for (let i = 0; i < count; i++) {
        const ix = i * 3
        // Home, pushed outward as the hero scrolls away.
        const hx = home[ix] * (1 + scatter * 0.9) + Math.sin(i * 12.9898) * scatter * w * 0.35
        const hy = home[ix + 1] * (1 + scatter * 0.9) + Math.cos(i * 78.233) * scatter * h * 0.35
        const hz = Math.sin(i * 3.7) * scatter * 600
        let fx = (hx - pos[ix]) * pull
        let fy = (hy - pos[ix + 1]) * pull
        let fz = (hz - pos[ix + 2]) * pull
        if (mouse.active && !reduce) {
          const dx = pos[ix] - mouse.x
          const dy = pos[ix + 1] - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / radius) * 9
            fx += (dx / d) * f
            fy += (dy / d) * f
          }
        }
        // A slow breathing wobble so the name never looks frozen.
        fy += Math.sin(t * 1.3 + home[ix] * 0.012) * 0.04
        vel[ix] = (vel[ix] + fx) * 0.82
        vel[ix + 1] = (vel[ix + 1] + fy) * 0.82
        vel[ix + 2] = (vel[ix + 2] + fz) * 0.82
        pos[ix] += vel[ix]
        pos[ix + 1] += vel[ix + 1]
        pos[ix + 2] += vel[ix + 2]
      }
      geo.attributes.position.needsUpdate = true
      mat.uniforms.uAlpha.value = 1 - scatter * 0.85
      renderer.render(scene, camera)
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      mouse.x = e.clientX - r.left - w / 2
      mouse.y = h / 2 - (e.clientY - r.top)
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false }
    const onResize = () => {
      w = el.clientWidth
      h = el.clientHeight
      renderer.setSize(w, h)
      camera.left = -w / 2
      camera.right = w / 2
      camera.top = h / 2
      camera.bottom = -h / 2
      camera.updateProjectionMatrix()
      build()
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    let cancelled = false
    document.fonts.load('800 100px "Bricolage Grotesque"').finally(() => {
      if (cancelled) return
      build()
      tick()
    })
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      if (geo) geo.dispose()
      if (mat) mat.dispose()
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [lines, kicker, progress])

  return <div ref={host} className="particle-name" aria-hidden="true" />
}
