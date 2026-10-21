import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'motion/react'
import { suites } from '../data'

// Every agent in agent.accountant as a moon around its suite. Drag to turn the
// system, hover a moon to read its name, pick a suite to fly the camera to it.

const HUE = ['#6d8bff', '#8fd3ff', '#b69cff', '#7ff0c8', '#ffb86b']

export default function AgentGalaxy() {
  const host = useRef(null)
  const labels = useRef([])
  const api = useRef({})
  const [active, setActive] = useState(-1)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    const el = host.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = el.clientWidth
    let h = el.clientHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h)
    el.prepend(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog('#05070f', 14, 34)
    const camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100)
    // Narrow screens need the camera further back to fit the whole ring.
    const far = () => 17 * Math.max(1, 0.9 / (w / h))
    const camPos = new THREE.Vector3(0, 6.5, far())
    scene.fog.far = far() + 17
    const camLook = new THREE.Vector3(0, 0, 0)
    const camPosTarget = camPos.clone()
    const camLookTarget = camLook.clone()
    camera.position.copy(camPos)

    const world = new THREE.Group()
    scene.add(world)

    // Dust
    const dustGeo = new THREE.BufferGeometry()
    const dust = new Float32Array(1400 * 3)
    for (let i = 0; i < dust.length; i++) dust[i] = (Math.random() - 0.5) * 60
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3))
    const dustMat = new THREE.PointsMaterial({ color: '#41507a', size: 0.06, transparent: true, opacity: 0.8 })
    scene.add(new THREE.Points(dustGeo, dustMat))

    const sphere = new THREE.SphereGeometry(1, 24, 24)
    const ring = new THREE.RingGeometry(1.35, 1.42, 64)
    const hubs = []
    const moons = []
    const R = 7

    suites.forEach((s, si) => {
      const a = (si / suites.length) * Math.PI * 2 - Math.PI / 2
      const hub = new THREE.Group()
      hub.position.set(Math.cos(a) * R, Math.sin(si * 1.7) * 0.8, Math.sin(a) * R)
      world.add(hub)
      const color = new THREE.Color(HUE[si])
      const core = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 }))
      core.scale.setScalar(0.42)
      hub.add(core)
      const glow = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, depthWrite: false }))
      glow.scale.setScalar(0.85)
      hub.add(glow)
      const halo = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: THREE.DoubleSide }))
      halo.rotation.x = Math.PI / 2
      hub.add(halo)
      const linePos = new Float32Array(s.agents.length * 6)
      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22 })
      const lines = new THREE.LineSegments(lineGeo, lineMat)
      hub.add(lines)
      hubs.push({ hub, core, glow, halo, lines, linePos, lineMat, color })

      s.agents.forEach((name, ai) => {
        const m = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: '#e9ecf7', transparent: true, opacity: 0.95 }))
        m.scale.setScalar(0.11 + (ai % 3) * 0.02)
        m.userData = {
          name,
          suite: si,
          r: 1.1 + (ai % 4) * 0.42 + Math.random() * 0.2,
          speed: (0.18 + Math.random() * 0.25) * (ai % 2 ? 1 : -1),
          phase: (ai / s.agents.length) * Math.PI * 2,
          tilt: (Math.random() - 0.5) * 1.1,
        }
        hub.add(m)
        moons.push(m)
      })
    })

    // Faint ring joining the suites into one platform.
    const orbit = new THREE.Mesh(new THREE.RingGeometry(R - 0.015, R + 0.015, 160), new THREE.MeshBasicMaterial({ color: '#2a3557', side: THREE.DoubleSide, transparent: true, opacity: 0.7 }))
    orbit.rotation.x = Math.PI / 2
    world.add(orbit)

    // Interaction
    const ray = new THREE.Raycaster()
    const ndc = new THREE.Vector2(9, 9)
    let drag = null
    let rotY = 0
    let rotYTarget = 0
    let tiltTarget = 0
    let focus = -1
    let hovered = null

    const onDown = (e) => { drag = { x: e.clientX, y: e.clientY, r: rotYTarget, t: tiltTarget } }
    const onUp = () => { drag = null }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      ndc.x = ((e.clientX - r.left) / w) * 2 - 1
      ndc.y = -((e.clientY - r.top) / h) * 2 + 1
      if (drag) {
        rotYTarget = drag.r + (e.clientX - drag.x) * 0.006
        tiltTarget = Math.max(-0.35, Math.min(0.35, drag.t + (e.clientY - drag.y) * 0.002))
      }
    }
    const onLeave = () => { ndc.set(9, 9); drag = null }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    const setFocus = (i) => {
      focus = i
      if (i < 0) {
        camPosTarget.set(0, 6.5, far())
        camLookTarget.set(0, 0, 0)
        return
      }
      // Turn the system so the chosen suite faces the camera, then move in.
      const a = (i / suites.length) * Math.PI * 2 - Math.PI / 2
      // world.rotation.y = -rotY puts a hub at angle a in front of the camera when rotY = PI/2 - a.
      rotYTarget = Math.PI / 2 - a
      while (rotYTarget - rotY > Math.PI) rotYTarget -= Math.PI * 2
      while (rotYTarget - rotY < -Math.PI) rotYTarget += Math.PI * 2
      camPosTarget.set(0, 2.2, R + 5.2 * Math.max(1, 1.2 / (w / h)))
      camLookTarget.set(0, 0, R * 0.92)
    }
    api.current.setFocus = setFocus

    const v = new THREE.Vector3()
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    const clock = new THREE.Clock()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime
      if (!drag && focus < 0 && !reduce) rotYTarget += dt * 0.06
      rotY += (rotYTarget - rotY) * 0.06
      world.rotation.y = -rotY
      world.rotation.x += (tiltTarget - world.rotation.x) * 0.08
      camPos.lerp(camPosTarget, 0.05)
      camLook.lerp(camLookTarget, 0.05)
      camera.position.copy(camPos)
      camera.lookAt(camLook)

      hubs.forEach((hb, si) => {
        const on = focus < 0 || focus === si
        hb.core.material.opacity += ((on ? 1 : 0.25) - hb.core.material.opacity) * 0.1
        hb.halo.rotation.z = t * 0.2
        hb.glow.scale.setScalar(0.85 + Math.sin(t * 2 + si) * 0.08)
        hb.lineMat.opacity += ((on ? 0.28 : 0.05) - hb.lineMat.opacity) * 0.1
        hb.hub.lookAt(camera.position.x, hb.hub.position.y, camera.position.z)
      })

      ray.setFromCamera(ndc, camera)
      const hit = ray.intersectObjects(moons, false)[0]
      const nowHover = hit ? hit.object : null
      if (nowHover !== hovered) {
        hovered = nowHover
        setHover(hovered ? { name: hovered.userData.name, suite: suites[hovered.userData.suite].name } : null)
        el.style.cursor = hovered ? 'pointer' : drag ? 'grabbing' : 'grab'
      }

      const counters = hubs.map(() => 0)
      moons.forEach((m) => {
        const u = m.userData
        const a = u.phase + (reduce ? 0 : t * u.speed)
        m.position.set(Math.cos(a) * u.r, Math.sin(a) * u.r * Math.sin(u.tilt), Math.sin(a) * u.r * Math.cos(u.tilt))
        const on = focus < 0 || focus === u.suite
        const target = m === hovered ? 1.9 : 1
        const base = 0.11 + (u.r % 3) * 0.01
        m.scale.setScalar(m.scale.x + (base * target - m.scale.x) * 0.2)
        m.material.opacity += ((on ? 0.95 : 0.15) - m.material.opacity) * 0.1
        const hb = hubs[u.suite]
        const k = counters[u.suite]++ * 6
        hb.linePos[k + 3] = m.position.x
        hb.linePos[k + 4] = m.position.y
        hb.linePos[k + 5] = m.position.z
      })
      hubs.forEach((hb) => { hb.lines.geometry.attributes.position.needsUpdate = true })

      // Suite labels follow their hubs on screen.
      hubs.forEach((hb, si) => {
        const lab = labels.current[si]
        if (!lab) return
        hb.hub.getWorldPosition(v)
        v.project(camera)
        const x = (v.x * 0.5 + 0.5) * w
        const y = (-v.y * 0.5 + 0.5) * h
        lab.style.transform = `translate(${x}px, ${y}px) translate(-50%, 26px)`
        lab.style.opacity = v.z < 1 ? (focus < 0 || focus === si ? 1 : 0.3) : 0
      })

      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      w = el.clientWidth
      h = el.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (focus < 0) camPosTarget.set(0, 6.5, far())
      scene.fog.far = far() + 17
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  const pick = (i) => {
    const next = active === i ? -1 : i
    setActive(next)
    api.current.setFocus?.(next)
  }

  const s = active >= 0 ? suites[active] : null
  const total = suites.reduce((n, x) => n + x.agents.length, 0)

  return (
    <div className="galaxy">
      <div className="galaxy-stage" ref={host}>
        {suites.map((x, i) => (
          <button
            key={x.name}
            ref={(n) => (labels.current[i] = n)}
            className={`hub-label ${active === i ? 'is-on' : ''}`}
            style={{ '--c': HUE[i] }}
            onClick={() => pick(i)}
          >
            {x.name} <span>{x.agents.length}</span>
          </button>
        ))}
        <AnimatePresence>
          {hover && (
            <motion.div className="moon-tip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <strong>{hover.name}</strong>
              <span>{hover.suite}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="galaxy-hint">Drag to turn. Hover a moon to read it. Pick a suite to fly to it.</p>
      </div>

      <div className="galaxy-panel">
        <AnimatePresence mode="wait" initial={false}>
          {s ? (
            <motion.div key={s.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
              <p className="panel-kicker" style={{ color: HUE[active] }}>{s.name}</p>
              <p className="panel-blurb">{s.blurb}</p>
              <ul className="agent-list">
                {s.agents.map((a, i) => (
                  <motion.li key={a} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.025 * i }}>{a}</motion.li>
                ))}
              </ul>
              <button className="link-btn" onClick={() => pick(active)}>Back to all suites</button>
            </motion.div>
          ) : (
            <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="panel-big">{total}</p>
              <p className="panel-blurb">agents in {suites.length} suites, live for 20+ D2C brands. Pick a suite to see what is inside.</p>
              <ul className="suite-picks">
                {suites.map((x, i) => (
                  <li key={x.name}>
                    <button onClick={() => pick(i)} style={{ '--c': HUE[i] }}>
                      <span className="dot" />{x.name}<em>{x.agents.length}</em>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
