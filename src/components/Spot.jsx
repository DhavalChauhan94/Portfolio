// A card whose border and surface light up under the pointer, like a torch
// passing over paper. Used by the capability, work and security cards.
export default function Spot({ as: Tag = 'div', className = '', children, ...rest }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={`spot ${className}`} onPointerMove={move} {...rest}>
      {children}
    </Tag>
  )
}
