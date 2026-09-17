import { useEffect, useState } from "react"

export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timeout)
  }, [secondsLeft])

  const restart = () => setSecondsLeft(initialSeconds)

  return { secondsLeft, restart }
}
