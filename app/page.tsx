"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Import components with error handling
import { Grid } from "@/components/grid"
import { VideoBackground } from "@/components/video-background"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"
import { ParallaxSection } from "@/components/parallax-section"
import { MagneticElement } from "@/components/magnetic-element"
import { CursorEffect } from "@/components/cursor-effect"
import { HoverScramble } from "@/components/hover-scramble"
import { Icon } from "@/components/icons"
import { DynamicText } from "@/components/dynamic-text"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { InteractiveLogoHero } from "@/components/interactive-logo-hero"
// Import MASP Budget component
import MaspBudget from "@/components/masp-budget"
// Import The Force Proposal component
import TheForceProposal from "@/components/theforce-proposal"



// Add ErrorBoundary component at the bottom of the file
class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  fallback: React.ReactNode
}> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.error("Error caught by boundary:", error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro")
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const sections = ["intro", "manifesto", "about", "enhanced", "tables", "deliverables", "budget", "pricing", "terms"]
  const containerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const enhancedRef = useRef<HTMLDivElement>(null)
  const tablesRef = useRef<HTMLDivElement>(null)
  const deliverablesRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const budgetRef = useRef<HTMLDivElement>(null)
  const termsRef = useRef<HTMLDivElement>(null)
  const [isBrowser, setIsBrowser] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setIsBrowser(true)

    // Set loaded to true after a short delay to ensure smooth animations
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500)

    // Show video background after delay
    const videoTimer = setTimeout(() => {
      setShowVideo(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(videoTimer)
    }
  }, [])

  // Modificar a função scrollToSection para usar data-scroll-to
  const scrollToSection = (section: string) => {
    if (!isBrowser) return

    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      // Usar scrollIntoView nativo do navegador para maior compatibilidade
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (!isBrowser) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isBrowser, sections])

  const content = (
    <div ref={containerRef} className="bg-black text-white font-mono">
      {/* Language Toggle */}
      <LanguageToggle />
      
      {/* Custom Cursor */}
      <CursorEffect />



      {/* Grid Background - Agora sem linhas */}
      <Grid />

      {/* Video Background (appears after delay) */}
      {showVideo && <VideoBackground videoId="275917960" delay={1} />}

      {/* Main Content */}
      <div>
        {/* Intro Section */}
        <section
          id="intro"
          ref={introRef}
          className="h-screen flex flex-col justify-center relative overflow-hidden bg-white text-black"
        >
          <div className="absolute inset-0 z-0">
            <InteractiveLogoHero className="w-full h-full" />
          </div>

          <AnimatePresence>
            {loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-10 right-10 z-10 text-black/80 text-sm tracking-widest intro-meta"
              >
                <div className="writing-vertical dark-text">{t('location')}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10 flex flex-col justify-between h-full py-12 pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="intro-meta max-w-md"></div>
            </div>

            <ParallaxSection speed={0.05} className="mt-auto">
              <div className="intro-title w-full">
                <div className="the-force-logo w-full overflow-visible">
                  <MagneticElement strength={20} className="w-full pointer-events-auto">
                    <div className="flex flex-col items-start">
                      <div
                        className="font-sans"
                        style={{
                          fontSize: "min(8vw, 8rem)",
                          lineHeight: "0.85",
                          letterSpacing: "-0.05em",
                          fontWeight: "900",
                          whiteSpace: "nowrap",
                          paddingLeft: "0.25rem",
                        }}
                      >
                        <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                          FESTA MASP 2025
                        </AdvancedTextAnimation>
                      </div>
                      <div
                        className="font-sans inline-flex items-start"
                        style={{
                          fontSize: "min(8vw, 8rem)",
                          lineHeight: "0.85",
                          letterSpacing: "-0.05em",
                          fontWeight: "900",
                          whiteSpace: "nowrap",
                          paddingLeft: "0.25rem",
                        }}
                      >
                        <AdvancedTextAnimation
                          type="letter"
                          staggerChildren={0.03}
                          letterSpacing="-0.03em"
                        >
                          SYMBIOTIC CODE
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                  </MagneticElement>
                </div>
              </div>
            </ParallaxSection>

            <div className="mt-8 max-w-xl intro-cta">
              <div className="h-1 w-24 bg-black/50 rounded-full mb-8"></div>
              <h3 className="heading-large font-sans text-pretty">
                <AdvancedTextAnimation type="reveal" delay={0.8} letterSpacing="-0.02em">
                  {language === 'pt' ? 'Conteúdos Imersivos para Experiências Transformadoras' : 'Immersive Content for Transformative Experiences'}
                </AdvancedTextAnimation>
              </h3>
            </div>
          </div>
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <ChevronDown className="h-6 w-6 text-black/50 animate-bounce" />
          </motion.div>
        </section>

        {/* Manifesto Section */}
        <section
          id="manifesto"
          ref={manifestoRef}
          className="min-h-[150vh] flex flex-col justify-start relative overflow-hidden bg-white text-black py-24"
        >
          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10"></div>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-6">
            {/* Header with contact info */}
            <div className="mb-16 caption">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div className="mb-4 md:mb-0">
                  <p className="font-sans">©THE FORCE creates immersive design + visual experiences</p>
                  <p className="font-sans mt-1">
                    for brands : Nike, Coca-Cola, Heineken, Budweiser, Itaú, Ambev, Santander, Stella Artois [...]
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <span className="font-sans">{t('phone')}</span>
                  <span className="font-sans">{t('email')}</span>
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-black text-[10px] mr-2">
                      BR
                    </span>
                    <span className="font-sans">{t('locationFull')}</span>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-black/20 mt-4"></div>
            </div>

            {/* Main dynamic text */}

            <div className="my-24 relative z-10">
              <h1 className="font-sans text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tight">
                <DynamicText
                  prefix="©THE FORCE creates "
                  phrases={[
                    "symbiotic digital experiences.",
                    "living code narratives.",
                    "ecological visual systems.",
                    "immersive organism environments.",
                    "self-organizing digital ecologies."
                  ]}
                  interval={5000}
                />
              </h1>
            </div>

            {/* Footer text */}

            <div className="mt-[40vh] mb-8 relative z-10">
              <p className="body-large font-sans max-w-3xl mb-4">
                THE FORCE é uma agência e produtora que combina arte e tecnologia para criar
                narrativas expandidas e experiências surpreendentes. Especializamos em soluções inovadoras
                de branding, experiências imersivas e desenvolvimento de conteúdo de ponta que transforma
                espaços em ecossistemas digitais vivos.
              </p>
              <p className="body-large font-sans max-w-3xl">
                Para a Festa MASP 2025 - Symbiotic Code, criamos uma narrativa visual que explora
                a simbiose entre sistemas ecológicos e código digital. Uma experiência onde fluxos de energia
                e ciclos de matéria se manifestam através de projeções imersivas que transformam o espaço
                em um organismo digital pulsante.
              </p>
            </div>

            <div className="flex justify-center mt-16 relative z-10">
              <ChevronDown
                className="h-6 w-6 text-black/50 animate-bounce cursor-pointer"
                onClick={() => scrollToSection("about")}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="flex items-center relative py-24 solid-bg-section" data-section>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            {/* Project Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32">
              <div className="md:col-span-4 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 border border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                  <div className="caption text-white/60">{language === 'pt' ? 'EVENTO' : 'EVENT'}</div>
                </div>
                <div className="mb-6">
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                      FESTA MASP
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.1} letterSpacing="-0.03em">
                      2025
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.2} letterSpacing="-0.03em">
                      SYMBIOTIC CODE
                    </AdvancedTextAnimation>
                  </h2>
                </div>
                <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="mb-8">
                  <h3 className="heading-medium font-sans mb-4 text-white">{language === 'pt' ? 'Conceito da Experiência' : 'Experience Concept'}</h3>
                  <p className="text-white/80 body-medium font-sans mb-6">
                    {language === 'pt'
                      ? 'Symbiotic Code explora a simbiose entre ecologia e sistemas digitais, transformando o MASP em um organismo digital vivo através de projeções imersivas que revelam fluxos de energia e ciclos de matéria.'
                      : 'Symbiotic Code explores the symbiosis between ecology and digital systems, transforming MASP into a living digital organism through immersive projections that reveal energy flows and matter cycles.'}
                  </p>
                  <ul className="space-y-3 text-white/80 body-medium font-sans">
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Video Mapping no Salão Principal - 4 minutos de narrativa visual' : 'Main Hall Video Mapping - 4 minutes of visual narrative'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Projeção nas 45 Mesas de Jantar - Superfícies vivas' : 'Projection on 45 Dining Tables - Living surfaces'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Projeção Imersiva na Entrada e Escadas - Portal sensorial' : 'Immersive Entrance and Stairs Projection - Sensory portal'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Redes miceliais e padrões fractais auto-organizados' : 'Mycelial networks and self-organizing fractal patterns'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Layers geométricos dinâmicos reconfigurando o espaço' : 'Dynamic geometric layers reconfiguring space'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 section-content">
              <MagneticElement className="p-6 hover-lift">
                <div className="caption text-white/60 mb-2">{language === 'pt' ? 'CLIENTE' : 'CLIENT'}</div>
                <div className="heading-medium font-sans">
                  <AdvancedTextAnimation delay={0.2} type="slide" direction="up">
                    FESTA MASP 2025
                  </AdvancedTextAnimation>
                </div>
              </MagneticElement>
              <MagneticElement className="p-6 hover-lift">
                <div className="caption text-white/60 mb-2">{language === 'pt' ? 'AGÊNCIA/PRODUTORA' : 'AGENCY/PRODUCER'}</div>
                <div className="heading-medium font-sans">
                  <AdvancedTextAnimation delay={0.6} type="slide" direction="up">
                    THE FORCE.CC
                  </AdvancedTextAnimation>
                </div>
                <div className="caption text-white/60 mt-1">{t('location')}</div>
              </MagneticElement>
            </div>
          </div>
        </section>


        {/* Technical Requirements Section */}
        <section
          id="tables"
          ref={tablesRef}
          className="flex items-center relative py-24 solid-bg-section"
          data-section
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Icon type="overview" className="text-white" />
                <div className="caption text-white/60 glitch-text">{t('technicalRequirementsLabel')}</div>
              </div>
              <div className="display-medium font-sans mb-6">
                <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
                  {t('productionSpecsTitle')}
                </AdvancedTextAnimation>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'PROJETORES' : 'PROJECTORS'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? '70 projetores laser de alta performance (4.000 a 10.000 lumens)' : '70 high-performance laser projectors (4,000 to 10,000 lumens)'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'SERVIDORES' : 'SERVERS'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? '20 servidores de mídia com software de mapeamento dedicado' : '20 media servers with dedicated mapping software'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'SOFTWARE' : 'SOFTWARE'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Resolume para salão principal, Watchout para áreas secundárias' : 'Resolume for main hall, Watchout for secondary areas'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'MAPEAMENTO' : 'MAPPING'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Calibração 3D precisa de todas as superfícies de projeção' : 'Precise 3D calibration of all projection surfaces'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'SINCRONIZAÇÃO' : 'SYNCHRONIZATION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Sistema de timecode para sincronização perfeita entre áreas' : 'Timecode system for perfect synchronization between areas'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'BACKUP' : 'BACKUP'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Sistema redundante com failover automático para garantir continuidade' : 'Redundant system with automatic failover to ensure continuity'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section
          id="deliverables"
          ref={deliverablesRef}
          className="flex items-center relative py-24 solid-bg-section"
          data-section
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <Icon type="deliverables" className="text-white" />
                  <div className="caption text-white/60 glitch-text">{t('deliverablesLabel')}</div>
                </div>
                <div className="display-medium font-sans mb-6">
                  <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
                    {language === 'pt' ? 'Entregáveis' : 'Deliverables'}
                  </AdvancedTextAnimation>
                </div>
                <div className="body-large text-white/80 font-sans text-pretty">
                  <AdvancedTextAnimation tag="p" type="slide" direction="up">
                    {language === 'pt' ? 'Experiências imersivas com conteúdos autorais' : 'Immersive experiences with original content'}
                  </AdvancedTextAnimation>
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 section-content">
                <MagneticElement className="p-6 group hover-lift border border-white/10">
                  <div className="caption text-white/60 mb-4">01</div>
                  <div className="heading-medium font-sans mb-2 group-hover:text-white transition-colors">
                    <AdvancedTextAnimation
                      tag="div"
                      delay={0.1}
                      fontWeight="bold"
                      type="slide"
                      direction="up"
                    >
                      {language === 'pt' ? 'Vídeo Mapping Salão Principal' : 'Main Hall Video Mapping'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.2} type="fade">
                      {language === 'pt' ? 'Transformação do salão em organismo digital pulsante com projeções nas testeiras e escadas' : 'Hall transformation into pulsating digital organism with projections on headers and stairs'}
                    </AdvancedTextAnimation>
                  </div>
                </MagneticElement>
                <MagneticElement className="p-6 group hover-lift border border-white/10">
                  <div className="caption text-white/60 mb-4">02</div>
                  <div className="heading-medium font-sans mb-2 group-hover:text-white transition-colors">
                    <AdvancedTextAnimation
                      tag="div"
                      delay={0.2}
                      fontWeight="bold"
                      type="slide"
                      direction="up"
                    >
                      {language === 'pt' ? 'Projeção nas Mesas de Jantar' : 'Dining Tables Projection'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                      {language === 'pt' ? '45 mesas se tornam superfícies vivas para narrativas visuais de organismos digitais' : '45 tables become living surfaces for visual narratives of digital organisms'}
                    </AdvancedTextAnimation>
                  </div>
                </MagneticElement>
                <MagneticElement className="p-6 group hover-lift border border-white/10">
                  <div className="caption text-white/60 mb-4">03</div>
                  <div className="heading-medium font-sans mb-2 group-hover:text-white transition-colors">
                    <AdvancedTextAnimation
                      tag="div"
                      delay={0.3}
                      fontWeight="bold"
                      type="slide"
                      direction="up"
                    >
                      {language === 'pt' ? 'Projeção Imersiva na Entrada' : 'Immersive Entrance Projection'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                      {language === 'pt' ? 'Corredor e escadas como portal para o universo simbiótico da festa' : 'Corridor and stairs as portal to the symbiotic universe of the party'}
                    </AdvancedTextAnimation>
                  </div>
                </MagneticElement>
                <MagneticElement className="p-6 group hover-lift border border-white/10">
                  <div className="caption text-white/60 mb-4">04</div>
                  <div className="heading-medium font-sans mb-2 group-hover:text-white transition-colors">
                    <AdvancedTextAnimation
                      tag="div"
                      delay={0.4}
                      fontWeight="bold"
                      type="slide"
                      direction="up"
                    >
                      {language === 'pt' ? 'Conteúdo Autoral' : 'Original Content'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                      {language === 'pt' ? 'Criação de narrativa visual exclusiva explorando simbiose entre ecologia e código digital' : 'Creation of exclusive visual narrative exploring symbiosis between ecology and digital code'}
                    </AdvancedTextAnimation>
                  </div>
                </MagneticElement>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Section */}
        <section
          id="budget"
          ref={budgetRef}
          className="flex items-center relative py-24 solid-bg-section"
          data-section
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Icon type="pricing" className="text-white" />
                <div className="caption text-white/60 glitch-text">{language === 'pt' ? 'INVESTIMENTO' : 'INVESTMENT'}</div>
              </div>
              <div className="display-medium font-sans mb-6">
                <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
                  {language === 'pt' ? 'Investimento Total' : 'Total Investment'}
                </AdvancedTextAnimation>
              </div>
              <div className="body-large text-white/80 font-sans text-pretty max-w-3xl">
                <AdvancedTextAnimation tag="p" type="slide" direction="up">
                  {language === 'pt' ? 'Conteúdos imersivos para transformar o MASP em um ecossistema digital vivo através de projeções mapeadas' : 'Immersive content to transform MASP into a living digital ecosystem through mapped projections'}
                </AdvancedTextAnimation>
              </div>
            </div>

            <TheForceProposal />
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          ref={pricingRef}
          className="flex items-center relative py-24 solid-bg-section"
          data-section
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="grid grid-cols-1 items-start">
              <div className="section-content">
                <div className="p-6 bg-white/5 rounded-lg">
                  <div className="heading-medium font-sans mb-4">
                    <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
                      {language === 'pt' ? 'Próximos Passos' : 'Next Steps'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/80 mb-6 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" type="fade">
                      {language === 'pt' ? 'Processo estruturado para execução das projeções imersivas' : 'Structured process for immersive projections execution'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">01</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.1} type="fade">
                          {language === 'pt' ? 'Aprovação do conceito criativo e narrativa visual' : 'Creative concept and visual narrative approval'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">02</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.2} type="fade">
                          {language === 'pt' ? 'Visita técnica e mapeamento dos espaços' : 'Technical visit and space mapping'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">03</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.3} type="fade">
                          {language === 'pt' ? 'Produção dos conteúdos e animações' : 'Content and animation production'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">04</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.4} type="fade">
                          {language === 'pt' ? 'Instalação técnica e configuração dos equipamentos' : 'Technical installation and equipment setup'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">05</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.5} type="fade">
                          {language === 'pt' ? 'Testes e operação durante o evento' : 'Testing and operation during the event'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                  </div>
                  <MagneticElement>
                    <button
                      onClick={() => scrollToSection("terms")}
                      className="button-2025 group uppercase tracking-widest text-xs"
                      data-cursor="pointer"
                    >
                      View Terms
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 inline-block" />
                    </button>
                  </MagneticElement>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section id="terms" ref={termsRef} className="flex items-center relative py-24 solid-bg-section" data-section>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <Icon type="terms" className="text-white" />
                  <div className="caption text-white/60 glitch-text">{t('termsLabel')}</div>
                </div>
                <div className="display-medium font-sans mb-6">
                  <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
                    {t('termsTitle')}
                  </AdvancedTextAnimation>
                </div>
                <div className="body-large text-white/80 font-sans text-pretty">
                  <AdvancedTextAnimation tag="p" type="slide" direction="up">
                    {t('termsDescription')}
                  </AdvancedTextAnimation>
                </div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="p-6 mb-12">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">01</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.1} type="fade">
                          {language === 'pt' ? 'Validade: 10 dias a partir da data de apresentação' : 'Validity: 10 days from presentation date'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">02</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.2} type="fade">
                          {language === 'pt' ? 'Pagamento: 50% na contratação • 30% início produção • 20% na entrega final' : 'Payment: 50% upon contracting • 30% production start • 20% upon final delivery'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">03</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                          {language === 'pt' ? 'Fase 1 — Pré-produção: mapeamento 3D dos espaços e desenvolvimento conceitual' : 'Phase 1 — Pre-production: 3D mapping of spaces and conceptual development'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">04</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                          {language === 'pt' ? 'Produção: 30 dias para criação dos conteúdos' : 'Production: 30 days for content creation'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">05</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                          {language === 'pt' ? 'Diferenciais: Conteúdo autoral exclusivo • Integração narrativa entre ambientes • Experiência imersiva completa' : 'Differentiators: Exclusive original content • Narrative integration between environments • Complete immersive experience'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <MagneticElement className="p-6 hover-lift">
                    <div className="heading-medium font-sans mb-4">
                      <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
                        Contact Information
                      </AdvancedTextAnimation>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="caption text-white/60 mb-1">Company</div>
                        <div className="body-large font-sans">
                          <AdvancedTextAnimation delay={0.2} fontWeight="bold" type="fade">
                            THE FORCE
                          </AdvancedTextAnimation>
                        </div>
                      </div>
                      <div>
                        <div className="caption text-white/60 mb-1">CNPJ</div>
                        <div className="body-medium font-mono number-accent">22.690.450/0001-96</div>
                      </div>
                      <div>
                        <div className="caption text-white/60 mb-1">Address</div>
                        <div className="body-large font-sans">
                          <AdvancedTextAnimation delay={0.3} fontWeight="bold" type="fade">
                            Alameda Eduardo Prado, 667 - Campos Elíseos
                          </AdvancedTextAnimation>
                        </div>
                        <div className="body-medium font-sans">São Paulo, SP - Brazil - 01218-012</div>
                      </div>
                      <div>
                        <div className="caption text-white/60 mb-1">Contact</div>
                        <div className="body-medium font-mono number-accent">+55 (11) 98624-3000</div>
                        <div className="body-medium font-sans">Instagram: @theforcex</div>
                      </div>
                    </div>
                  </MagneticElement>

                  <MagneticElement className="p-6 hover-lift">
                    <div className="heading-medium font-sans mb-4">
                      <AdvancedTextAnimation tag="h3" fontWeight="bold" type="slide" direction="up">
                        Approval
                      </AdvancedTextAnimation>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="caption text-white/60 mb-1">{language === 'pt' ? 'Localização' : 'Location'}</div>
                        <div className="body-medium font-mono number-accent">{language === 'pt' ? 'São Paulo, Brasil' : 'São Paulo, Brazil'}</div>
                      </div>
                      <div>
                        <div className="caption text-white/60 mb-1">Client</div>
                        <div className="body-large font-sans">
                          <AdvancedTextAnimation delay={0.4} fontWeight="bold" type="fade">
                            FESTA MASP 2025
                          </AdvancedTextAnimation>
                        </div>
                      </div>
                      <div>
                        <div className="caption text-white/60 mb-1">THE FORCE</div>
                        <div className="body-large font-sans">
                          <AdvancedTextAnimation delay={0.5} fontWeight="bold" type="fade">
                            LUCIANO FERRAREZI - CREATIVE DIRECTOR
                          </AdvancedTextAnimation>
                        </div>
                      </div>
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            const message = encodeURIComponent(language === 'pt' ? "Festa MASP 2025 Symbiotic Code - Proposta aprovada! Vamos começar!" : "MASP Party 2025 Symbiotic Code - Proposal approved! Let's get started!")
                            window.open(`https://wa.me/5511986243000?text=${message}`, '_blank')
                          }}
                          className="button-2025 w-full uppercase tracking-widest text-xs"
                          data-cursor="pointer"
                        >
                          {language === 'pt' ? 'ACEITAR PROPOSTA' : 'ACCEPT PROPOSAL'}
                        </button>
                      </div>
                    </div>
                  </MagneticElement>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black">
          <div className="container mx-auto px-6 sm:px-8 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  <div className="heading-large font-sans cursor-pointer whitespace-nowrap inline-flex items-start">
                    <AdvancedTextAnimation fontWeight="extrabold" type="letter" staggerChildren={0.03}>
                      THE FORCE
                    </AdvancedTextAnimation>
                    <span className="text-xs align-top relative" style={{ top: "0.5rem" }}>®</span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <Link
                  href="https://instagram.com/theforcex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors caption"
                  data-cursor="pointer"
                >
                  <HoverScramble text="Instagram" />
                </Link>
                <Link
                  href="https://theforce.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors caption"
                  data-cursor="pointer"
                >
                  <HoverScramble text="Website" />
                </Link>
                <Link
                  href="mailto:luciano@theforce.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors caption"
                  data-cursor="pointer"
                >
                  <HoverScramble text="Email" />
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-6 text-center text-white/60 caption">
              &copy; {new Date().getFullYear()}{" "}
              <a href="/" className="hover:text-white">
                The Force
              </a>{" "}
              |{" "}
              <a
                href="https://instagram.com/theforcex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @theforcex
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )

  return <div>{content}</div>
}
