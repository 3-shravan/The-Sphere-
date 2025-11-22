import { useEffect, useRef } from "react"

export default function useInfiniteScroll({ scrollRef, threshold = 80, onReach }) {
  const lockRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const remaining = scrollHeight - (scrollTop + clientHeight)

      if (remaining < threshold && !lockRef.current) {
        lockRef.current = true
        onReach?.().finally(() => {
          // delay unlock to avoid spamming
          setTimeout(() => {
            lockRef.current = false
          }, 150)
        })
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [scrollRef, threshold, onReach])

  return { lockRef }
}
