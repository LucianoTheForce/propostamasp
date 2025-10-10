"use client"

import TimeWarpProposal from "@/components/timewarp-proposal"
import { LanguageProvider } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { Grid } from "@/components/grid"
import { VideoBackground } from "@/components/video-background"
import { CursorEffect } from "@/components/cursor-effect"
import { motion } from "framer-motion"

export default function TimeWarpClient() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-black text-white font-mono">
        <div className="relative">
          {/* Background layers - matching home page */}
          <Grid />
          <VideoBackground videoId="275917960" delay={1} />
          
          {/* Custom cursor effect */}
          <CursorEffect />
          
          {/* Content container */}
          <div className="relative z-10">
            {/* Header with language toggle */}
            <div className="fixed top-8 right-8 z-50">
              <LanguageToggle />
            </div>

            {/* Main content */}
            <section className="relative min-h-screen overflow-hidden">
              <div className="absolute inset-0 z-0" />
              <div className="relative z-10 px-8 py-24">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <TimeWarpProposal />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-8 border-t border-white/10">
              <div className="container mx-auto text-center">
                <p className="text-sm text-white/50">
                  © 2025 The Force.cc — All rights reserved
                </p>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </LanguageProvider>
  )
}