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
// Import Banana Budget component
import BananaBudget from "@/components/banana-budget"



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
                          SWOOSH BANANA
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
                          PROJEÇÃO
                        </AdvancedTextAnimation>
                        <span className="text-xs align-top relative" style={{ top: "0.5rem", marginLeft: "-0.1em" }}>®</span>
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
                  {t('tagline')}
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
                    "immersive brand experiences.",
                    "cutting-edge visual identities.",
                    "revolutionary branded produce.",
                    "memorable event productions.",
                    "innovative spatial narratives."
                  ]}
                  interval={5000}
                />
              </h1>
            </div>

            {/* Footer text */}

            <div className="mt-[40vh] mb-8 relative z-10">
              <p className="body-large font-sans max-w-3xl mb-4">
                THE FORCE is an agency and production company that combines art and technology to create
                expanded narratives and surprising experiences. We specialize in innovative branding solutions,
                immersive experiences, and cutting-edge product development that transforms brands into
                unforgettable experiences.
              </p>
              <p className="body-large font-sans max-w-3xl">
                For the Swoosh Banana prototype, we're pioneering branded produce through natural growth.
                A revolutionary agricultural innovation that transforms ordinary bananas into Nike-branded
                fruits, creating a unique intersection of nature and brand identity through 3D molding technology.
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
                  <div className="caption text-white/60">{t('projectLabel')}</div>
                </div>
                <div className="mb-6">
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                      SWOOSH BANANA
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.1} letterSpacing="-0.03em">
                      PROTOTYPE
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.2} letterSpacing="-0.03em">
                      NIKE
                    </AdvancedTextAnimation>
                  </h2>
                </div>
                <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="mb-8">
                  <h3 className="heading-medium font-sans mb-4 text-white">{language === 'pt' ? 'Escopo do Projeto' : 'Project Scope'}</h3>
                  <ul className="space-y-3 text-white/80 body-medium font-sans">
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Design e produção de moldes 3D no formato Swoosh' : '3D Swoosh-shaped mold design and production'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? '100 moldes reutilizáveis em policarbonato transparente' : '100 reusable transparent polycarbonate molds'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Aplicação em bananas jovens (8-10cm) pós-floração' : 'Application on young bananas (8-10cm) post-flowering'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Monitoramento de cultivo por 12 semanas' : '12-week cultivation monitoring program'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Análise de escalabilidade e rendimento' : 'Scalability and yield analysis'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Creative Concept */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32">
              <div className="md:col-span-4 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 border border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                  <div className="caption text-white/60">{t('creativeLabel')}</div>
                </div>
                <div className="mb-6">
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                      NATURAL
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.1} letterSpacing="-0.03em">
                      BRANDING
                    </AdvancedTextAnimation>
                  </h2>
                </div>
                <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="mb-8">
                  <h3 className="heading-medium font-sans mb-4 text-white">
                    {language === 'pt' ? 'Conceito Visual' : 'Visual Concept'}
                  </h3>
                  <p className="text-white/80 mb-6 body-medium font-sans">
                    {t('visualConceptDescription')}
                  </p>
                  <ul className="space-y-3 text-white/80 body-medium font-sans">
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>
                        <strong className="text-white">{t('volumetricsLabel')}</strong> - {t('volumetricsDescription')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>
                        <strong className="text-white">{t('lightLaserLabel')}</strong> - {t('lightLaserDescription')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>
                        <strong className="text-white">{t('chromaticsLabel')}</strong> - {t('chromaticsDescription')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <Icon type="overview" className="text-white" />
                  <div className="caption text-white/60 glitch-text">{t('overviewLabel')}</div>
                </div>
                <div className="mb-6">
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                      NIKE
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.2} letterSpacing="-0.03em">
                      AGRÍCOLA
                    </AdvancedTextAnimation>
                  </h2>
                </div>
                <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="body-large text-white/80 font-sans mb-6 font-sans text-pretty">
                  <AdvancedTextAnimation tag="p" type="slide" direction="up">
                    {t('overviewDescription')}
                  </AdvancedTextAnimation>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start hover-lift">
                    <span className="text-white mr-3 mt-1">+</span>
                    <div className="body-medium text-white/70 font-sans">
                      <AdvancedTextAnimation tag="p" type="slide" direction="up">
                        {t('overviewFeature1')}
                      </AdvancedTextAnimation>
                    </div>
                  </div>
                  <div className="flex items-start hover-lift">
                    <span className="text-white mr-3 mt-1">+</span>
                    <div className="body-medium text-white/70 font-sans">
                      <AdvancedTextAnimation tag="p" type="slide" direction="up">
                        {t('overviewFeature2')}
                      </AdvancedTextAnimation>
                    </div>
                  </div>
                  <div className="flex items-start hover-lift">
                    <span className="text-white mr-3 mt-1">+</span>
                    <div className="body-medium text-white/70 font-sans">
                      <AdvancedTextAnimation tag="p" type="slide" direction="up">
                        {t('overviewFeature3')}
                      </AdvancedTextAnimation>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 section-content">
              <MagneticElement className="p-6 hover-lift">
                <div className="caption text-white/60 mb-2">{t('clientLabel')}</div>
                <div className="heading-medium font-sans">
                  <AdvancedTextAnimation delay={0.2} type="slide" direction="up">
                    NIKE BRASIL
                  </AdvancedTextAnimation>
                </div>
              </MagneticElement>
              <MagneticElement className="p-6 hover-lift">
                <div className="caption text-white/60 mb-2">{t('studioLabel')}</div>
                <div className="heading-medium font-sans">
                  <AdvancedTextAnimation delay={0.6} type="slide" direction="up">
                    {t('studioName')}
                  </AdvancedTextAnimation>
                </div>
                <div className="caption text-white/60 mt-1">{t('location')}</div>
              </MagneticElement>
            </div>
          </div>
        </section>

        {/* Creative Concept Section */}
        <section
          id="enhanced"
          ref={enhancedRef}
          className="flex items-center relative py-24 solid-bg-section"
          data-section
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-8 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
              <div className="md:col-span-12 section-title-2025-modern">
                <div className="flex items-center gap-3 mb-4">
                  <Icon type="overview" className="text-white" />
                  <div className="caption text-white/60 glitch-text">{t('projectLabel')}</div>
                </div>
                <div className="display-medium font-sans mb-6">
                  <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
                    {language === 'pt' ? 'MOLDAGEM NATURAL' : 'NATURAL MOLDING'}
                  </AdvancedTextAnimation>
                </div>
                <div className="body-large text-white/80 font-sans text-pretty max-w-4xl">
                  <AdvancedTextAnimation tag="p" type="slide" direction="up">
                    {t('containedTideDescription')}
                  </AdvancedTextAnimation>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="p-6 bg-white/5 rounded-lg">
                    <h4 className="font-bold mb-3">{t('imageSpecTitle')}</h4>
                    <p className="text-sm text-white/70">{t('imageSpecDescription')}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-lg">
                    <h4 className="font-bold mb-3">{t('cameraSpecTitle')}</h4>
                    <p className="text-sm text-white/70">{t('cameraSpecDescription')}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-lg">
                    <h4 className="font-bold mb-3">{t('soundSpecTitle')}</h4>
                    <p className="text-sm text-white/70">{t('soundSpecDescription')}</p>
                  </div>
                </div>
              </div>
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
                <h4 className="font-bold mb-3">{language === 'pt' ? 'MOLDE 3D' : '3D MOLD'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Molde em duas metades formato Swoosh com trava de segurança' : 'Two-piece Swoosh-shaped mold with safety lock'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'MATERIAL' : 'MATERIAL'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Policarbonato transparente, 2-3mm espessura, resistente UV' : 'Transparent polycarbonate, 2-3mm thickness, UV resistant'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'VENTILAÇÃO' : 'VENTILATION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Micro-furos para prevenir condensação e fungos' : 'Micro-holes to prevent condensation and fungi'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'PRODUÇÃO' : 'PRODUCTION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? '100 moldes reutilizáveis para múltiplos ciclos de cultivo' : '100 reusable molds for multiple cultivation cycles'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'APLICAÇÃO' : 'APPLICATION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Instalação em bananas jovens 8-10cm pós-floração' : 'Installation on young bananas 8-10cm post-flowering'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'MONITORAMENTO' : 'MONITORING'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Acompanhamento semanal por 12 semanas até colheita' : 'Weekly monitoring for 12 weeks until harvest'}</p>
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
                    {language === 'pt' ? 'Elementos completos do projeto de projeção em São Januário' : 'Complete projection project elements for São Januário'}
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
                      {language === 'pt' ? 'Design & Prototipagem' : 'Design & Prototyping'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.2} type="fade">
                      {language === 'pt' ? 'Design e desenvolvimento do molde 3D Swoosh com engenharia de precisão' : '3D Swoosh mold design and development with precision engineering'}
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
                      {language === 'pt' ? 'Produção dos Moldes' : 'Mold Production'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                      {language === 'pt' ? 'Fabricação de 100 moldes em policarbonato transparente resistente UV' : 'Manufacturing of 100 UV-resistant transparent polycarbonate molds'}
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
                      {language === 'pt' ? 'Teste Piloto' : 'Pilot Test'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                      {language === 'pt' ? 'Aplicação em campo e monitoramento de cultivo por 12 semanas' : 'Field application and 12-week cultivation monitoring'}
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
                      {language === 'pt' ? 'Análise de Resultados' : 'Results Analysis'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                      {language === 'pt' ? 'Relatório de escalabilidade, rendimento e viabilidade comercial' : 'Scalability, yield, and commercial viability report'}
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
                  {language === 'pt' ? 'Desenvolvimento completo do molde 3D Swoosh e teste piloto com 100 unidades para validação de viabilidade' : 'Complete 3D Swoosh mold development and pilot test with 100 units for feasibility validation'}
                </AdvancedTextAnimation>
              </div>
            </div>

            <BananaBudget />
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
                      {language === 'pt' ? 'Processo estruturado para execução do protótipo Banana Swoosh' : 'Structured process for Banana Swoosh prototype execution'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">01</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.1} type="fade">
                          {language === 'pt' ? 'Aprovação do design 3D do molde Swoosh e especificações técnicas' : '3D Swoosh mold design approval and technical specifications'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">02</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.2} type="fade">
                          {language === 'pt' ? 'Seleção de parceiro agrícola e plantação adequada' : 'Agricultural partner and suitable plantation selection'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">03</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.3} type="fade">
                          {language === 'pt' ? 'Produção dos 100 moldes em policarbonato' : 'Production of 100 polycarbonate molds'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">04</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.4} type="fade">
                          {language === 'pt' ? 'Instalação em campo e início do monitoramento' : 'Field installation and monitoring start'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">05</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.5} type="fade">
                          {language === 'pt' ? 'Colheita e análise de resultados' : 'Harvest and results analysis'}
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
                          {language === 'pt' ? 'Pagamento: 40% na contratação • 40% antes da montagem • 20% na entrega dos masters' : 'Payment: 40% upon contracting • 40% before setup • 20% upon masters delivery'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">03</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                          {language === 'pt' ? 'Fase 1 — Pesquisa & R&D (remunerada): etapa independente abatível do total se aprovado' : 'Phase 1 — Research & R&D (paid): independent stage deductible from total if approved'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">04</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                          {language === 'pt' ? 'Tributos/Retenções: não inclusos no orçamento' : 'Taxes/Withholdings: not included in budget'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">05</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                          {language === 'pt' ? 'Exclusões: PR/assessoria; cachês/cessões de imagem de terceiros; logística de público; taxas municipais extraordinárias' : 'Exclusions: PR/consulting; third-party image fees; public logistics; extraordinary municipal fees'}
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
                            NIKE BRASIL
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
                            const message = encodeURIComponent(language === 'pt' ? "Swoosh Banana Nike - Proposta aprovada! Vamos começar!" : "Swoosh Banana Nike - Proposal approved! Let's get started!")
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
