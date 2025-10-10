"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type BackgroundSlideshowProps = {
  images?: string[]
  startId?: string
  endId?: string
  overlayOpacity?: number
}

const fallbackImages = [
  "/takes/ice takes.png",
  "/takes/ice takes2.png",
  "/takes/ice takes3.png",
  "/takes/ice takes4.png",
  "/takes/ice takes5.png",
  "/takes/ice takes6.png",
  "/takes/ice takes7.png",
]

export function BackgroundSlideshow({
  images = fallbackImages,
  startId = "about",
  endId,
  overlayOpacity = 0.35,
}: BackgroundSlideshowProps) {
  const [state, setState] = useState({ index: 0, active: false })

  useEffect(() => {
    if (!images.length) return

    const handlePosition = () => {
      const startElement = startId ? document.getElementById(startId) : null
      const endElement = endId ? document.getElementById(endId) : null

      const documentHeight = document.documentElement.scrollHeight

      const startOffset = startElement
        ? startElement.getBoundingClientRect().top + window.scrollY
        : 0
      const endOffset = endElement
        ? endElement.getBoundingClientRect().top + window.scrollY
        : documentHeight

      const viewportCenter = window.scrollY + window.innerHeight * 0.5

      if (viewportCenter < startOffset) {
        setState((prev) => (prev.active ? { index: 0, active: false } : prev))
        return
      }

      if (endElement && viewportCenter >= endOffset) {
        setState((prev) => (prev.active ? { index: prev.index, active: false } : prev))
        return
      }

      const range = Math.max(endOffset - startOffset, 1)
      const progress = Math.min(
        Math.max((viewportCenter - startOffset) / range, 0),
        1
      )
      const nextIndex = Math.min(
        Math.floor(progress * images.length),
        images.length - 1
      )

      setState((prev) =>
        prev.index === nextIndex && prev.active
          ? prev
          : { index: nextIndex, active: true }
      )
    }

    handlePosition()
    window.addEventListener("scroll", handlePosition, { passive: true })
    window.addEventListener("resize", handlePosition)

    return () => {
      window.removeEventListener("scroll", handlePosition)
      window.removeEventListener("resize", handlePosition)
    }
  }, [images, startId, endId])

  if (!images.length) {
    return null
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500"
      style={{ opacity: state.active ? 1 : 0, backgroundColor: "#000" }}
    >
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="absolute inset-0 h-full w-full"
          style={{
            opacity: index === state.index ? 1 : 0,
            transform: index === state.index ? "scale(1.06)" : "scale(1)",
            transition: "opacity 0.8s ease-in-out, transform 3s ease-out",
          }}
        >
          <Image
            src={image}
            alt={`Background ${index + 1}`}
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
