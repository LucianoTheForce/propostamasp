"use client"

import React from "react"
import { AdvancedTextAnimation } from "./advanced-text-animation"
import { MagneticElement } from "./magnetic-element"
import { useLanguage } from "@/contexts/language-context"

export default function MaspBudget() {
  const { language } = useLanguage()
  
  const budgetItems = [
    {
      id: 1,
      title: language === 'pt' ? 'Vídeo Mapping no Salão Principal' : 'Main Hall Video Mapping',
      description: language === 'pt' 
        ? 'O salão principal será transformado em um organismo digital pulsante. As projeções mapeadas nas testeiras e escadas cruzadas irão revelar o fluxo de energia e o ciclo de matéria nos ecossistemas, traduzidos em linguagem visual contemporânea. Além disso, será inserido um layer adicional inspirado em composições geométricas, criando novas perspectivas e reconfigurando o espaço a cada mudança de cena. Redes inspiradas em micélios e padrões fractais se expandem como códigos auto-organizados, demonstrando a lógica que conecta o biológico ao digital. O público será envolvido por um sistema em constante troca, onde cada conexão gera novos caminhos e possibilidades.'
        : 'The main hall will be transformed into a pulsating digital organism. Mapped projections on headers and crossed stairs will reveal energy flow and matter cycles in ecosystems, translated into contemporary visual language. Additionally, an extra layer inspired by geometric compositions will be inserted, creating new perspectives and reconfiguring space with each scene change. Networks inspired by mycelia and fractal patterns expand as self-organized codes, demonstrating the logic that connects biological to digital. The audience will be surrounded by a system in constant exchange, where each connection generates new paths and possibilities.',
      duration: language === 'pt' ? 'Duração do conteúdo: 4 minutos' : 'Content duration: 4 minutes',
      technicalData: language === 'pt'
        ? ['15 projetores a laser de 10.000 lumens com 15 lentes dedicadas', '1 servidor de mídia de 16 saídas com software de mapeamento Resolume']
        : ['15 laser projectors at 10,000 lumens with 15 dedicated lenses', '1 media server with 16 outputs and Resolume mapping software'],
      value: 45000
    },
    {
      id: 2,
      title: language === 'pt' ? 'Projeção nas Mesas de Jantar' : 'Dining Tables Projection',
      description: language === 'pt'
        ? 'As 45 mesas de jantar se tornam superfícies vivas para narrativas visuais que exploram a circularidade da matéria e da energia. Sobre cada mesa, projeções mostrarão organismos digitais que se replicam como fungos, fluxos que lembram rios de dados e padrões que refletem a complexidade ecológica e algorítmica. Cada convidado vivencia de perto como sistemas vivos e digitais compartilham a mesma lógica de interdependência e ciclos contínuos.'
        : 'The 45 dining tables become living surfaces for visual narratives exploring the circularity of matter and energy. On each table, projections will show digital organisms replicating like fungi, flows resembling data rivers, and patterns reflecting ecological and algorithmic complexity. Each guest experiences up close how living and digital systems share the same logic of interdependence and continuous cycles.',
      duration: language === 'pt' ? 'Duração do conteúdo: 2 minutos' : 'Content duration: 2 minutes',
      technicalData: language === 'pt'
        ? ['45 projetores a laser de 4.500 a 6.000 lumens', '15 servidores de mídia com software de mapeamento Watchout']
        : ['45 laser projectors from 4,500 to 6,000 lumens', '15 media servers with Watchout mapping software'],
      value: 25000
    },
    {
      id: 3,
      title: language === 'pt' ? 'Projeção Imersiva na Entrada e Escadas' : 'Immersive Entrance and Stairs Projection',
      description: language === 'pt'
        ? 'O corredor de entrada e as escadas serão um portal para o universo da festa. As projeções em paredes, teto e degraus irão materializar fluxos de energia e trocas de matéria em constante movimento. Padrões ecológicos inspirados em redes miceliais e fractais criarão a sensação de atravessar um sistema vivo, evidenciando que tanto a ecologia quanto os sistemas digitais se baseiam em ciclos interdependentes.'
        : 'The entrance corridor and stairs will be a portal to the party universe. Projections on walls, ceiling, and steps will materialize energy flows and matter exchanges in constant movement. Ecological patterns inspired by mycelial networks and fractals will create the sensation of crossing a living system, highlighting that both ecology and digital systems are based on interdependent cycles.',
      duration: language === 'pt' ? 'Duração do conteúdo: 2 minutos' : 'Content duration: 2 minutes',
      technicalData: language === 'pt'
        ? ['10 projetores a laser de 4.000 lumens de curta distância', '4 projetores ultracurta distância', '5 servidores de mídia com software de mapeamento Watchout']
        : ['10 laser projectors at 4,000 lumens short throw', '4 ultra-short throw projectors', '5 media servers with Watchout mapping software'],
      value: 25000
    }
  ]

  const total = budgetItems.reduce((sum, item) => sum + item.value, 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="w-full">
      <div className="space-y-12 mb-12">
        {budgetItems.map((item, index) => (
          <MagneticElement key={item.id} className="border border-white/20 p-8 hover:bg-white/5 transition-all duration-300">
            <div className="flex flex-col gap-6">
              {/* Title Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white/60 font-mono text-sm">0{item.id}</span>
                  <h3 className="font-sans font-bold text-xl">
                    <AdvancedTextAnimation delay={index * 0.1} type="slide" direction="up">
                      {item.title}
                    </AdvancedTextAnimation>
                  </h3>
                </div>
                <div className="text-2xl font-sans font-bold">
                  <AdvancedTextAnimation delay={index * 0.1 + 0.3} type="fade">
                    {formatCurrency(item.value)}
                  </AdvancedTextAnimation>
                </div>
              </div>

              {/* Description Section */}
              <div className="text-white/80 text-sm leading-relaxed">
                <AdvancedTextAnimation delay={index * 0.1 + 0.1} type="fade">
                  <h4 className="font-sans font-semibold mb-2 text-white">{language === 'pt' ? 'Descrição' : 'Description'}</h4>
                  {item.description}
                </AdvancedTextAnimation>
              </div>

              {/* Duration */}
              <div className="text-white/70 text-sm">
                <AdvancedTextAnimation delay={index * 0.1 + 0.2} type="fade">
                  {item.duration}
                </AdvancedTextAnimation>
              </div>

              {/* Technical Data Section */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-sans font-semibold mb-3 text-white text-sm">
                  <AdvancedTextAnimation delay={index * 0.1 + 0.25} type="fade">
                    {language === 'pt' ? 'Dados Técnicos' : 'Technical Data'}
                  </AdvancedTextAnimation>
                </h4>
                <div className="space-y-2">
                  {item.technicalData.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-start gap-2">
                      <span className="text-white/40 mt-1">•</span>
                      <p className="text-white/60 text-xs font-mono">
                        <AdvancedTextAnimation delay={index * 0.1 + 0.3 + techIndex * 0.05} type="fade">
                          {tech}
                        </AdvancedTextAnimation>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MagneticElement>
        ))}
      </div>

      {/* Summary Section */}
      <div className="border-t border-white/20 pt-8">
        <div className="mb-8">
          <h3 className="text-xl font-sans font-bold mb-4 text-white">
            <AdvancedTextAnimation type="slide" direction="up">
              {language === 'pt' ? 'Resumo do Investimento' : 'Investment Summary'}
            </AdvancedTextAnimation>
          </h3>
          <div className="space-y-2">
            {budgetItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center text-white/80 text-sm">
                <span>
                  <AdvancedTextAnimation delay={index * 0.05} type="fade">
                    {item.title}:
                  </AdvancedTextAnimation>
                </span>
                <span className="font-mono">
                  <AdvancedTextAnimation delay={index * 0.05 + 0.1} type="fade">
                    {formatCurrency(item.value)}
                  </AdvancedTextAnimation>
                </span>
              </div>
            ))}
          </div>
        </div>

        <MagneticElement className="p-8 border border-white/20 bg-black">
          <div className="text-center">
            <h3 className="text-lg font-sans font-bold mb-3 text-white/80 uppercase tracking-widest">
              <AdvancedTextAnimation type="slide" direction="up">
                {language === 'pt' ? 'INVESTIMENTO TOTAL' : 'TOTAL INVESTMENT'}
              </AdvancedTextAnimation>
            </h3>
            <div className="text-5xl font-sans font-bold text-white mb-3">
              <AdvancedTextAnimation delay={0.2} type="slide" direction="up">
                {formatCurrency(total)}
              </AdvancedTextAnimation>
            </div>
            <p className="text-white/60 text-sm font-sans">
              <AdvancedTextAnimation delay={0.3} type="fade">
                {language === 'pt'
                  ? 'Experiência completa de projeções imersivas para Festa MASP 2025'
                  : 'Complete immersive projection experience for MASP Party 2025'}
              </AdvancedTextAnimation>
            </p>
          </div>
        </MagneticElement>
      </div>

      {/* Differentials Section */}
      <div className="mt-12 p-6 border border-white/20">
        <h4 className="font-sans font-bold text-lg mb-4 text-white">
          <AdvancedTextAnimation type="slide" direction="up">
            {language === 'pt' ? 'Diferenciais The Force' : 'The Force Differentials'}
          </AdvancedTextAnimation>
        </h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-white/40 mt-1">•</span>
            <AdvancedTextAnimation delay={0.1} type="fade">
              {language === 'pt' 
                ? 'Symbiotic Code: uma proposta que une ecologia, sistemas complexos e código digital'
                : 'Symbiotic Code: a proposal that unites ecology, complex systems and digital code'}
            </AdvancedTextAnimation>
          </li>
          <li className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-white/40 mt-1">•</span>
            <AdvancedTextAnimation delay={0.2} type="fade">
              {language === 'pt'
                ? 'Integração entre fluxo de energia e ciclo de matéria, traduzidos em experiências imersivas'
                : 'Integration between energy flow and matter cycle, translated into immersive experiences'}
            </AdvancedTextAnimation>
          </li>
          <li className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-white/40 mt-1">•</span>
            <AdvancedTextAnimation delay={0.3} type="fade">
              {language === 'pt'
                ? 'Inserção de layers geométricos dinâmicos no salão principal, reconfigurando o espaço em tempo real'
                : 'Insertion of dynamic geometric layers in the main hall, reconfiguring space in real time'}
            </AdvancedTextAnimation>
          </li>
          <li className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-white/40 mt-1">•</span>
            <AdvancedTextAnimation delay={0.4} type="fade">
              {language === 'pt'
                ? 'Narrativa contínua conectando entrada, jantar e salão como um único sistema vivo'
                : 'Continuous narrative connecting entrance, dinner and hall as a single living system'}
            </AdvancedTextAnimation>
          </li>
          <li className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-white/40 mt-1">•</span>
            <AdvancedTextAnimation delay={0.5} type="fade">
              {language === 'pt'
                ? 'Conteúdo autoral, sofisticado e inédito, mantendo o mesmo valor comercial da proposta original'
                : 'Original, sophisticated and unprecedented content, maintaining the same commercial value as the original proposal'}
            </AdvancedTextAnimation>
          </li>
        </ul>
      </div>

      {/* Stats Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 border border-white/10">
          <div className="text-white/60 text-xs mb-1">{language === 'pt' ? 'CONTEÚDO' : 'CONTENT'}</div>
          <div className="font-bold text-sm">{language === 'pt' ? '8 MINUTOS' : '8 MINUTES'}</div>
        </div>
        <div className="p-4 border border-white/10">
          <div className="text-white/60 text-xs mb-1">{language === 'pt' ? 'EQUIPAMENTOS' : 'EQUIPMENT'}</div>
          <div className="font-bold text-sm">{language === 'pt' ? '70 PROJETORES' : '70 PROJECTORS'}</div>
        </div>
        <div className="p-4 border border-white/10">
          <div className="text-white/60 text-xs mb-1">{language === 'pt' ? 'COBERTURA' : 'COVERAGE'}</div>
          <div className="font-bold text-sm">{language === 'pt' ? '3 AMBIENTES' : '3 ENVIRONMENTS'}</div>
        </div>
      </div>
    </div>
  )
}