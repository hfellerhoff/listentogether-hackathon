import { useState, useEffect } from "react"

function getWindowDimensions() {
  if (typeof window === undefined) return undefined
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    if (typeof window === undefined) return

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      if (typeof window === undefined) return
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowDimensions
}
