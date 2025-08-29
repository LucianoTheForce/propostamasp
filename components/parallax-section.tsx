"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { withScrollSafety } from "./motion-wrapper"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
  overflow?: "visible" | "hidden"
}

function ParallaxSectionComponent({
  children,
  speed = 0.2,
  className = "",
  direction = "up",
  overflow = "hidden",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Wait for mount and ref to be ready
    const timer = setTimeout(() => {
      if (containerRef.current) {
        setIsMounted(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Always call hooks with valid config, even if not ready
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate parallax effect based on direction
  const factor = direction === "up" ? -1 : 1
  // Always call useTransform to maintain hook order
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor])

  // Render static version during SSR and initial mount
  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={`relative ${overflow === "hidden" ? "overflow-hidden" : ""} ${className}`}
        suppressHydrationWarning
      >
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${overflow === "hidden" ? "overflow-hidden" : ""} ${className}`}>
      <motion.div
        style={{ y }}
        className="w-full h-full"
        initial={{ y: 0 }}
        suppressHydrationWarning
      >
        {children}
      </motion.div>
    </div>
  )
}

export const ParallaxSection = withScrollSafety(ParallaxSectionComponent)
