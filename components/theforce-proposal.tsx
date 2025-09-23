"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"

export default function TheForceProposal() {
  const { language } = useLanguage()

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <div className="display-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
            The Force.cc
          </AdvancedTextAnimation>
        </div>
        <div className="heading-large font-sans mb-8">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up" delay={0.1}>
            Proposta Comercial – Conteúdos Imersivos
          </AdvancedTextAnimation>
        </div>
        <div className="caption text-white/60 space-y-2">
          <AdvancedTextAnimation tag="p" type="fade" delay={0.2}>
            Cliente: Festa MASP 2025
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.3}>
            Evento: Symbiotic Code
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.4}>
            Agência / Produtora: The Force.cc
          </AdvancedTextAnimation>
        </div>
      </div>

      {/* Video Mapping Section */}
      <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            Vídeo Mapping no Salão Principal
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <div className="caption text-white/60 mb-3">DESCRIÇÃO</div>
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            O salão principal será transformado em um organismo digital pulsante. As projeções mapeadas nas testeiras e escadas cruzadas irão revelar o fluxo de energia e o ciclo de matéria nos ecossistemas, traduzidos em linguagem visual contemporânea. Além disso, será inserido um layer adicional inspirado em composições geométricas, criando novas perspectivas e reconfigurando o espaço a cada mudança de cena. Redes inspiradas em micélios e padrões fractais se expandem como códigos auto-organizados, demonstrando a lógica que conecta o biológico ao digital. O público será envolvido por um sistema em constante troca, onde cada conexão gera novos caminhos e possibilidades.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <span className="caption text-white/60">DURAÇÃO DO CONTEÚDO</span>
            <p className="heading-small font-sans font-bold mt-1">4 minutos</p>
          </div>
          <div>
            <span className="caption text-white/60">INVESTIMENTO</span>
            <p className="heading-small font-sans font-bold mt-1">R$ 45.000,00</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="caption text-white/60 mb-3">DADOS TÉCNICOS</div>
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• 15 projetores a laser de 10.000 lumens com 15 lentes dedicadas</li>
            <li>• 1 servidor de mídia de 16 saídas com software de mapeamento Resolume</li>
          </ul>
        </div>
      </motion.div>

      {/* Dining Tables Projection */}
      <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            Projeção nas Mesas de Jantar
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <div className="caption text-white/60 mb-3">DESCRIÇÃO</div>
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            As 45 mesas de jantar se tornam superfícies vivas para narrativas visuais que exploram a circularidade da matéria e da energia. Sobre cada mesa, projeções mostrarão organismos digitais que se replicam como fungos, fluxos que lembram rios de dados e padrões que refletem a complexidade ecológica e algorítmica. Cada convidado vivencia de perto como sistemas vivos e digitais compartilham a mesma lógica de interdependência e ciclos contínuos.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <span className="caption text-white/60">DURAÇÃO DO CONTEÚDO</span>
            <p className="heading-small font-sans font-bold mt-1">2 minutos</p>
          </div>
          <div>
            <span className="caption text-white/60">INVESTIMENTO</span>
            <p className="heading-small font-sans font-bold mt-1">R$ 25.000,00</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="caption text-white/60 mb-3">DADOS TÉCNICOS</div>
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• 45 projetores a laser de 4.500 a 6.000 lumens</li>
            <li>• 15 servidores de mídia com software de mapeamento Watchout</li>
          </ul>
        </div>
      </motion.div>

      {/* Entrance Projection */}
      <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            Projeção Imersiva na Entrada e Escadas
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <div className="caption text-white/60 mb-3">DESCRIÇÃO</div>
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            O corredor de entrada e as escadas serão um portal para o universo da festa. As projeções em paredes, teto e degraus irão materializar fluxos de energia e trocas de matéria em constante movimento. Padrões ecológicos inspirados em redes miceliais e fractais criarão a sensação de atravessar um sistema vivo, evidenciando que tanto a ecologia quanto os sistemas digitais se baseiam em ciclos interdependentes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <span className="caption text-white/60">DURAÇÃO DO CONTEÚDO</span>
            <p className="heading-small font-sans font-bold mt-1">2 minutos</p>
          </div>
          <div>
            <span className="caption text-white/60">INVESTIMENTO</span>
            <p className="heading-small font-sans font-bold mt-1">R$ 25.000,00</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="caption text-white/60 mb-3">DADOS TÉCNICOS</div>
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• 10 projetores a laser de 4.000 lumens de curta distância</li>
            <li>• 4 projetores ultracurta distância</li>
            <li>• 5 servidores de mídia com software de mapeamento Watchout</li>
          </ul>
        </div>
      </motion.div>

      {/* Investment Summary */}
      <motion.div
        className="mb-12 p-8 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="display-small font-sans mb-8 text-center">
          <AdvancedTextAnimation tag="h3" type="word" letterSpacing="-0.03em">
            Resumo do Investimento
          </AdvancedTextAnimation>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="body-medium font-sans">Vídeo Mapping no Salão Principal</span>
            <span className="heading-small font-sans font-bold">R$ 45.000,00</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="body-medium font-sans">Projeção nas Mesas de Jantar</span>
            <span className="heading-small font-sans font-bold">R$ 25.000,00</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="body-medium font-sans">Projeção Imersiva na Entrada e Escadas</span>
            <span className="heading-small font-sans font-bold">R$ 25.000,00</span>
          </div>
          <div className="flex justify-between items-center pt-6">
            <span className="heading-medium font-sans font-bold">Total</span>
            <span className="display-small font-sans font-bold">R$ 95.000,00</span>
          </div>
        </div>
      </motion.div>

      {/* Differentials */}
      <motion.div
        className="p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            Diferenciais The Force
          </AdvancedTextAnimation>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
            <span className="body-medium text-white/80 font-sans">Symbiotic Code: uma proposta que une ecologia, sistemas complexos e código digital</span>
          </li>
          <li className="flex items-start">
            <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
            <span className="body-medium text-white/80 font-sans">Integração entre fluxo de energia e ciclo de matéria, traduzidos em experiências imersivas</span>
          </li>
          <li className="flex items-start">
            <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
            <span className="body-medium text-white/80 font-sans">Inserção de layers geométricos dinâmicos no salão principal, reconfigurando o espaço em tempo real</span>
          </li>
          <li className="flex items-start">
            <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
            <span className="body-medium text-white/80 font-sans">Narrativa contínua conectando entrada, jantar e salão como um único sistema vivo</span>
          </li>
          <li className="flex items-start">
            <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
            <span className="body-medium text-white/80 font-sans">Conteúdo autoral, sofisticado e inédito</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}