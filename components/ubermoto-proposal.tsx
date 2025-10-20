"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"
import { ParallaxSection } from "@/components/parallax-section"
import { MagneticElement } from "@/components/magnetic-element"

export default function UberMotoProposal() {
  const { language } = useLanguage()

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <div className="display-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h2" type="word" letterSpacing="-0.03em">
            PROPOSTA COMERCIAL — THE FORCE
          </AdvancedTextAnimation>
        </div>
        <div className="heading-large font-sans mb-8">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up" delay={0.1}>
            Uber Moto IA – "Se essa música fosse minha"
          </AdvancedTextAnimation>
        </div>
        <div className="caption text-white/60 space-y-2">
          <AdvancedTextAnimation tag="p" type="fade" delay={0.2}>
            Cliente: Wieden + Kennedy / Uber Moto
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.3}>
            Data: Outubro de 2025
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.4}>
            Versão: v1.3
          </AdvancedTextAnimation>
        </div>
      </div>

      {/* Visão Geral */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="heading-medium font-sans mb-4">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              1. Visão Geral do Projeto
            </AdvancedTextAnimation>
          </div>
          <div className="mb-6">
            <p className="body-medium text-white/80 font-sans leading-relaxed mb-4">
              Inspirada pela ideia-guia apresentada pela W+K, a The Force propõe o desenvolvimento técnico-criativo da experiência digital "Se essa música fosse minha", em que cada viagem de Uber Moto se transforma em uma faixa musical única, gerada com inteligência artificial e interpretada por Xamã.
            </p>
            <p className="body-medium text-white/80 font-sans leading-relaxed">
              A meta é transformar um simples resumo de corrida — frio e numérico — em um objeto emocional e interativo que fortalece a relação entre marca e usuário.
            </p>
          </div>
        </motion.div>
      </MagneticElement>

      {/* Objetivos */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="heading-medium font-sans mb-4">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              2. Objetivos
            </AdvancedTextAnimation>
          </div>
          <div className="mb-6">
            <ul className="body-small text-white/70 font-sans space-y-3">
              <li className="flex items-start">
                <span className="text-white/40 mr-3">•</span>
                <span>Tornar tangível o conceito de IA + emoção + mobilidade</span>
              </li>
              <li className="flex items-start">
                <span className="text-white/40 mr-3">•</span>
                <span>Criar uma experiência personalizada e compartilhável</span>
              </li>
              <li className="flex items-start">
                <span className="text-white/40 mr-3">•</span>
                <span>Reforçar a identidade de Uber Moto como plataforma inovadora</span>
              </li>
              <li className="flex items-start">
                <span className="text-white/40 mr-3">•</span>
                <span>Gerar PR orgânico e relevância cultural: "Uber Moto transforma viagens em músicas"</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </MagneticElement>

      {/* Escopo - Desenvolvimento Criativo */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="heading-medium font-sans mb-4">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              3. Escopo de Entrega
            </AdvancedTextAnimation>
          </div>
          <div className="space-y-8">
            {/* A. Desenvolvimento Criativo */}
            <div>
              <div className="caption text-white/60 mb-3 font-bold">A. DESENVOLVIMENTO CRIATIVO</div>
              <ul className="body-small text-white/70 font-sans space-y-2">
                <li>• Design da experiência e definição da jornada do usuário</li>
                <li>• Roteiro sonoro baseado em parâmetros reais (origem, destino, tempo, clima, região etc.)</li>
                <li>• Direção de arte e identidade visual integradas à campanha</li>
              </ul>
            </div>

            {/* B. Engenharia IA */}
            <div>
              <div className="caption text-white/60 mb-3 font-bold">B. ENGENHARIA IA E TECNOLOGIA</div>
              <ul className="body-small text-white/70 font-sans space-y-2">
                <li>• Desenvolvimento de um sistema criativo de geração musical, capaz de traduzir dados de corrida em trilhas sonoras exclusivas</li>
                <li>• Criação de lógica proprietária que interpreta variáveis reais (trajeto, duração, ritmo urbano, condições ambientais) e as converte em nuances musicais e narrativas sonoras únicas</li>
                <li>• Construção de um fluxo automatizado de geração, personalização e entrega das faixas — garantindo escalabilidade e consistência artística em cada experiência</li>
              </ul>
            </div>

            {/* C. Implementação */}
            <div>
              <div className="caption text-white/60 mb-3 font-bold">C. IMPLEMENTAÇÃO E LANÇAMENTO</div>
              <ul className="body-small text-white/70 font-sans space-y-2">
                <li>• Testes piloto com viagens reais</li>
                <li>• Desenvolvimento do ambiente digital de acesso à experiência</li>
                <li>• Acompanhamento técnico e criativo no lançamento oficial</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </MagneticElement>

      {/* Investimento */}
      <ParallaxSection speed={0.5}>
        <motion.div
          className="mb-12 p-8 border border-white/20 bg-white/[0.02]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="display-small font-sans mb-8 text-center">
            <AdvancedTextAnimation tag="h3" type="word" letterSpacing="-0.03em">
              4. Investimento
            </AdvancedTextAnimation>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <span className="body-medium font-sans">Valor global</span>
              <span className="display-small font-sans font-bold">R$ 425.000,00</span>
            </div>
            <div className="space-y-3">
              <p className="body-small text-white/70 font-sans">
                • Inclui concepção criativa, desenvolvimento completo e gestão executiva do projeto
              </p>
              <p className="body-small text-white/70 font-sans">
                • Além do custo de desenvolvimento, haverá um custo único por geração a ser definido após o término do desenvolvimento — esse valor incluirá despesas de servidores, APIs e infraestrutura necessárias para a operação da experiência
              </p>
            </div>
          </div>
        </motion.div>
      </ParallaxSection>

      {/* Diferenciais */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="heading-medium font-sans mb-6">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              5. Diferenciais The Force
            </AdvancedTextAnimation>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
              <span className="body-medium text-white/80 font-sans">Pioneirismo em experiências interativas que unem arte, tecnologia e emoção</span>
            </li>
            <li className="flex items-start">
              <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
              <span className="body-medium text-white/80 font-sans">Equipe multidisciplinar com domínio de IA, design e narrativa sensorial</span>
            </li>
            <li className="flex items-start">
              <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
              <span className="body-medium text-white/80 font-sans">Infraestrutura própria para prototipagem e testes imersivos</span>
            </li>
            <li className="flex items-start">
              <span className="caption text-white/60 mt-1 flex-shrink-0 font-mono mr-4">+</span>
              <span className="body-medium text-white/80 font-sans">Histórico de ativações culturais e tecnológicas com alto impacto de mídia espontânea</span>
            </li>
          </ul>
        </motion.div>
      </MagneticElement>

      {/* Próximos Passos */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="heading-medium font-sans mb-4">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              6. Próximos Passos
            </AdvancedTextAnimation>
          </div>
          <div className="mb-6">
            <ol className="body-small text-white/70 font-sans space-y-2">
              <li className="flex items-start">
                <span className="text-white/40 mr-3">1.</span>
                <span>Aprovação do escopo e investimento</span>
              </li>
              <li className="flex items-start">
                <span className="text-white/40 mr-3">2.</span>
                <span>Assinatura de contrato</span>
              </li>
              <li className="flex items-start">
                <span className="text-white/40 mr-3">3.</span>
                <span>Início do desenvolvimento criativo e técnico</span>
              </li>
            </ol>
          </div>
        </motion.div>
      </MagneticElement>

      {/* Contato */}
      <ParallaxSection speed={0.3}>
        <motion.div
          className="p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="heading-medium font-sans mb-6">
            <AdvancedTextAnimation tag="h3" type="slide" direction="up">
              Contato
            </AdvancedTextAnimation>
          </div>
          <div className="space-y-4">
            <p className="body-medium text-white/80 font-sans">
              <span className="text-white/60">Luciano Ferrarezi</span> — Diretor Criativo Executivo
            </p>
            <p className="body-medium text-white/80 font-sans">
              📧 <a href="mailto:luciano@theforce.cc" className="hover:text-white transition">luciano@theforce.cc</a>
            </p>
            <p className="body-medium text-white/80 font-sans">
              🌐 <a href="https://theforce.cc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">theforce.cc</a>
            </p>
          </div>
        </motion.div>
      </ParallaxSection>
    </div>
  )
}