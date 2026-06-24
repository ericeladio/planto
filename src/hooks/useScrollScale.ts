import { useEffect, useState } from 'react'

export default function useScrollScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let hasTriggered = false

    function handleScroll() {
      if (hasTriggered) return

      const el = document.getElementById('trending-trigger')
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const isVisible = rect.top < windowHeight && rect.bottom > 0

      if (isVisible) {
        hasTriggered = true
        setScale(1.5)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scale }
}
