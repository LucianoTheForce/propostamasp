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
                          ULTRAGAZ
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
                  {language === 'pt' ? 'Evolução dos Mascotes' : 'Mascots Evolution'}
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
                    "proprietary character platforms.",
                    "intelligent mascot systems.",
                    "scalable creative tools.",
                    "premium digital experiences.",
                    "branded character evolution."
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
                de branding, plataformas proprietárias e desenvolvimento de ferramentas criativas que transformam
                a gestão de personagens em experiências memoráveis.
              </p>
              <p className="body-large font-sans max-w-3xl">
                Para a Ultragaz, em parceria com a Rastro, desenvolvemos uma plataforma proprietária completa
                para criação, customização e gestão dos mascotes Ultrinho e Ully. Uma solução premium que combina
                refinamento visual, interface intuitiva e tecnologia escalável para a nova era de comunicação da marca.
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
                  <div className="caption text-white/60">{language === 'pt' ? 'PROJETO' : 'PROJECT'}</div>
                </div>
                <div className="mb-6">
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} letterSpacing="-0.03em">
                      EVOLUÇÃO
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.1} letterSpacing="-0.03em">
                      MASCOTES
                    </AdvancedTextAnimation>
                  </h2>
                  <h2 className="font-sans text-2xl md:text-3xl leading-tight tracking-tight font-bold">
                    <AdvancedTextAnimation type="letter" staggerChildren={0.03} delay={0.2} letterSpacing="-0.03em">
                      ULTRAGAZ
                    </AdvancedTextAnimation>
                  </h2>
                </div>
                <div className="h-1 w-16 bg-white/50 rounded-full"></div>
              </div>

              <div className="md:col-span-8 section-content">
                <div className="mb-8">
                  <h3 className="heading-medium font-sans mb-4 text-white">{language === 'pt' ? 'Contexto & Proposta' : 'Context & Proposal'}</h3>
                  <p className="text-white/80 body-medium font-sans mb-6">
                    {language === 'pt'
                      ? 'A Ultragaz entra em uma nova era de comunicação com a evolução dos mascotes Ultrinho e Ully. Em parceria com a agência Rastro, The Force desenvolve uma plataforma proprietária completa para criação, customização e gestão dos personagens.'
                      : 'Ultragaz enters a new era of communication with the evolution of mascots Ultrinho and Ully. In partnership with Rastro agency, The Force develops a complete proprietary platform for character creation, customization and management.'}
                  </p>
                  <ul className="space-y-3 text-white/80 body-medium font-sans">
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Refinamento visual e integração completa dos personagens' : 'Visual refinement and complete character integration'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Interface proprietária premium com modo escuro sofisticado' : 'Premium proprietary interface with sophisticated dark mode'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Biblioteca de variações e histórico visual' : 'Variation library and visual history'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Documentação completa e treinamento' : 'Complete documentation and training'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-3 mt-1">+</span>
                      <span>{language === 'pt' ? 'Suporte inicial de 2 meses' : '2-month initial support'}</span>
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
                    ULTRAGAZ
                  </AdvancedTextAnimation>
                </div>
                <div className="caption text-white/60 mt-1">{language === 'pt' ? 'Evolução dos Mascotes' : 'Mascots Evolution'}</div>
              </MagneticElement>
              <MagneticElement className="p-6 hover-lift">
                <div className="caption text-white/60 mb-2">{language === 'pt' ? 'PLATAFORMA & DESENVOLVIMENTO' : 'PLATFORM & DEVELOPMENT'}</div>
                <div className="heading-medium font-sans">
                  <AdvancedTextAnimation delay={0.6} type="slide" direction="up">
                    THE FORCE + RASTRO
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
                <h4 className="font-bold mb-3">{language === 'pt' ? 'VISUAL SOFISTICADO' : 'SOPHISTICATED VISUAL'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Dark mode premium com tipografia refinada e navegação lateral intuitiva' : 'Premium dark mode with refined typography and intuitive side navigation'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'INTERAÇÃO FLUIDA' : 'FLUID INTERACTION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Controle instantâneo de poses e expressões com feedback visual em tempo real' : 'Instant pose and expression control with real-time visual feedback'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'PERFORMANCE ESTÁVEL' : 'STABLE PERFORMANCE'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Arquitetura escalável para gestão eficiente dos personagens' : 'Scalable architecture for efficient character management'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'BIBLIOTECA COMPLETA' : 'COMPLETE LIBRARY'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Sistema de variações e histórico visual para controle criativo total' : 'Variation system and visual history for total creative control'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'DOCUMENTAÇÃO' : 'DOCUMENTATION'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Treinamento completo e documentação técnica para autonomia da equipe' : 'Complete training and technical documentation for team autonomy'}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <h4 className="font-bold mb-3">{language === 'pt' ? 'DESIGN PREMIUM' : 'PREMIUM DESIGN'}</h4>
                <p className="text-sm text-white/70">{language === 'pt' ? 'Produto refinado que reflete a excelência da marca Ultragaz' : 'Refined product that reflects Ultragaz brand excellence'}</p>
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
                      {language === 'pt' ? 'Plataforma Proprietária' : 'Proprietary Platform'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.2} type="fade">
                      {language === 'pt' ? 'Interface completa para criação, customização e gestão dos mascotes Ultrinho e Ully' : 'Complete interface for Ultrinho and Ully mascots creation, customization and management'}
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
                      {language === 'pt' ? 'Refinamento Visual' : 'Visual Refinement'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                      {language === 'pt' ? 'Evolução e integração completa dos personagens com a identidade Ultragaz' : 'Complete character evolution and integration with Ultragaz identity'}
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
                      {language === 'pt' ? 'Treinamento & Suporte' : 'Training & Support'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                      {language === 'pt' ? 'Documentação completa e suporte inicial de 2 meses para autonomia total' : 'Complete documentation and 2-month initial support for total autonomy'}
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
                      {language === 'pt' ? 'Arquitetura Escalável' : 'Scalable Architecture'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="body-medium text-white/70 font-sans text-pretty">
                    <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                      {language === 'pt' ? 'Sistema robusto preparado para crescimento e evolução contínua' : 'Robust system prepared for continuous growth and evolution'}
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
                  {language === 'pt' ? 'Plataforma proprietária completa para evolução dos mascotes Ultragaz' : 'Complete proprietary platform for Ultragaz mascots evolution'}
                </AdvancedTextAnimation>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="w-full max-w-6xl mx-auto">
              <motion.div
                className="mb-12 p-8 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="body-medium font-sans">{language === 'pt' ? 'Valor total do projeto' : 'Total project value'}</span>
                    <span className="heading-small font-sans font-bold">R$ 520.000,00</span>
                  </div>
                  <div className="pt-4 space-y-2">
                    <p className="body-small text-white/70 font-sans">
                      • {language === 'pt' ? 'Impostos inclusos' : 'Taxes included'}
                    </p>
                    <p className="body-small text-white/70 font-sans">
                      • {language === 'pt' ? 'Forma de pagamento: 50% na aprovação / 50% na entrega final' : 'Payment terms: 50% upon approval / 50% upon final delivery'}
                    </p>
                    <p className="body-small text-white/70 font-sans">
                      • {language === 'pt' ? 'Vigência da proposta: 30 dias a partir da data de envio' : 'Proposal validity: 30 days from send date'}
                    </p>
                    <p className="body-small text-white/70 font-sans">
                      • {language === 'pt' ? 'Prazo: 45 dias a partir da aprovação da ARP' : 'Timeline: 45 days from ARP approval'}
                    </p>
                    <p className="body-small text-white/70 font-sans">
                      • {language === 'pt' ? 'Plus: Custos operacionais mensais baseados em volume de uso' : 'Plus: Monthly operational costs based on usage volume'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
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
                      {language === 'pt' ? 'Escopo da plataforma proprietária de mascotes' : 'Proprietary mascot platform scope'}
                    </AdvancedTextAnimation>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">01</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.1} type="fade">
                          {language === 'pt' ? 'Plataforma web completa para criação e gestão de mascotes' : 'Complete web platform for mascot creation and management'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">02</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.2} type="fade">
                          {language === 'pt' ? 'Interface premium com dark mode e navegação intuitiva' : 'Premium interface with dark mode and intuitive navigation'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">03</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.3} type="fade">
                          {language === 'pt' ? 'Sistema de variações e biblioteca de expressões/poses' : 'Variation system and expression/pose library'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">04</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.4} type="fade">
                          {language === 'pt' ? 'Documentação técnica e treinamento completo da equipe' : 'Technical documentation and complete team training'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">05</div>
                      <div className="body-medium text-white/80 font-sans">
                        <AdvancedTextAnimation delay={0.5} type="fade">
                          {language === 'pt' ? 'Suporte inicial de 2 meses e arquitetura escalável' : '2-month initial support and scalable architecture'}
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
                          {language === 'pt' ? 'Validade: 30 dias a partir da data de envio' : 'Validity: 30 days from send date'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">02</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.2} type="fade">
                          {language === 'pt' ? 'Pagamento: 50% na aprovação • 50% na entrega final' : 'Payment: 50% upon approval • 50% upon final delivery'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">03</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.3} type="fade">
                          {language === 'pt' ? 'Prazo de Entrega: 45 dias corridos a partir da aprovação da ARP' : 'Delivery Timeline: 45 calendar days from ARP approval'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">04</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.4} type="fade">
                          {language === 'pt' ? 'Plus: Custos operacionais mensais definidos conforme volume de uso da plataforma' : 'Plus: Monthly operational costs defined according to platform usage volume'}
                        </AdvancedTextAnimation>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover-lift">
                      <div className="caption text-white/60 mt-1 flex-shrink-0 font-mono">05</div>
                      <div className="body-medium text-white/80 font-sans text-pretty">
                        <AdvancedTextAnimation tag="p" delay={0.5} type="fade">
                          {language === 'pt' ? 'Propriedade Intelectual: Plataforma permanece da The Force.cc, licença de uso para Ultragaz' : 'Intellectual Property: Platform remains with The Force.cc, usage license for Ultragaz'}
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
                        <div className="caption text-white/60 mb-1">{language === 'pt' ? 'Projeto' : 'Project'}</div>
                        <div className="body-large font-sans">
                          <AdvancedTextAnimation delay={0.4} fontWeight="bold" type="fade">
                            {language === 'pt' ? 'ULTRAGAZ - EVOLUÇÃO DOS MASCOTES' : 'ULTRAGAZ - MASCOTS EVOLUTION'}
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
                            const message = encodeURIComponent(language === 'pt' ? "Ultragaz Mascotes - Proposta aprovada! Vamos começar!" : "Ultragaz Mascots - Proposal approved! Let's get started!")
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
