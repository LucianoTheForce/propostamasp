"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { AdvancedTextAnimation } from "@/components/advanced-text-animation"
import { ParallaxSection } from "@/components/parallax-section"
import { MagneticElement } from "@/components/magnetic-element"

export default function TimeWarpProposal() {
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
            Proposta — Direção Técnica e Criativa de Palco
          </AdvancedTextAnimation>
        </div>
        <div className="caption text-white/60 space-y-2">
          <AdvancedTextAnimation tag="p" type="fade" delay={0.2}>
            Projeto: Palco para Time Warp Brasil 2026
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.3}>
            Proponente: The Force.cc
          </AdvancedTextAnimation>
          <AdvancedTextAnimation tag="p" type="fade" delay={0.4}>
            Datas do evento: 1 e 2 de maio
          </AdvancedTextAnimation>
        </div>
      </div>

      {/* Concept & Creative Direction */}
      <MagneticElement strength={0.3}>
        <motion.div
          className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            1.1 Conceito & Direção Criativa
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <p className="body-medium text-white/80 font-sans leading-relaxed mb-4">
            Definição de linguagem visual do palco alinhada à identidade Time Warp (minimal/techno, linhas limpas, geometria e ritmo).
          </p>
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Propostas de materiais, volumetria e elementos de destaque (totens, frames, telas ou estruturas modulares)</li>
            <li>• Referências visuais (moodboard) e mapa de atmosferas por momento (warm-up / peak / closing)</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Technical Stage Project */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            1.2 Projeto de Palco (Técnico)
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Desenhos técnicos: planta baixa, vista frontal, vista lateral e indicação de áreas de circulação</li>
            <li>• Implantação no espaço com cotas e pontos críticos (backstage, house mix, passagens)</li>
            <li>• Compatibilização com telões/LEDs (se houver) e com o rider de som/iluminação</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Light & Video Integration */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            1.3 Integração Luz & Vídeo
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Compatibilização geral entre desenho de luz e diretrizes visuais do palco</li>
            <li>• Alinhamento com operação de luz/vídeo do evento</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Viability and Operation */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            1.4 Viabilidade e Operação
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            Lista de materiais e fornecedores indicados (sem contratação inclusa).
          </p>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Deliverables */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            2) Entregáveis
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Documento de conceito com moodboard, narrativa e diretrizes</li>
            <li>• Desenhos técnicos (PDF + DWG/DXF) — planta, vistas e implantação</li>
            <li>• Mapa de luz (PDF)</li>
            <li>• Guia de vídeo (PDF) com referências de conteúdo</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Team */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            3) Equipe
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Direção Criativa e Técnica (1)</li>
            <li>• Designer Técnico CAD (1)</li>
            <li>• Assistência de Produção/Viabilidade (1)</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Investment Summary */}
      <ParallaxSection speed={0.5}>
        <motion.div
        className="mb-12 p-8 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="display-small font-sans mb-8 text-center">
          <AdvancedTextAnimation tag="h3" type="word" letterSpacing="-0.03em">
            4) Valor e Condições Comerciais
          </AdvancedTextAnimation>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="body-medium font-sans">Valor total do projeto</span>
            <span className="heading-small font-sans font-bold">R$ 50.000,00</span>
          </div>
          <div className="pt-4 space-y-2">
            <p className="body-small text-white/70 font-sans">
              • Impostos inclusos
            </p>
            <p className="body-small text-white/70 font-sans">
              • Forma de pagamento: 50% na aprovação / 50% na entrega final
            </p>
            <p className="body-small text-white/70 font-sans">
              • Vigência da proposta: 7 dias a partir da data de envio
            </p>
          </div>
        </div>
        </motion.div>
      </ParallaxSection>

      {/* Premises and Not Included */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            5) Premissas e Itens Não Inclusos
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6 space-y-4">
          <div>
            <p className="body-small text-white/60 font-sans mb-2 font-bold">NÃO INCLUI:</p>
            <ul className="body-small text-white/70 font-sans space-y-2">
              <li>• Locações/compra de equipamentos, operação técnica em evento, estruturas, transporte, hospedagem, diárias de equipe ou taxas de venue</li>
              <li>• Produção física, materiais cenográficos, seguros, fretes, energia, geradores, rigging, P.E. ou ART</li>
            </ul>
          </div>
          <div>
            <p className="body-small text-white/60 font-sans mb-2 font-bold">CONSIDERA-SE:</p>
            <ul className="body-small text-white/70 font-sans space-y-2">
              <li>• A organização fornecerá plantas cotadas do local, restrições de carga e riders atualizados de luz/som/vídeo</li>
              <li>• Mudanças de escopo relevantes (layout do espaço, riders, prazos) podem implicar revisão de custo e cronograma</li>
            </ul>
          </div>
        </div>
        </motion.div>
      </MagneticElement>

      {/* Intellectual Property */}
      <MagneticElement strength={0.3}>
        <motion.div
        className="mb-12 p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="heading-medium font-sans mb-4">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            6) Propriedade Intelectual
          </AdvancedTextAnimation>
        </div>
        <div className="mb-6">
          <ul className="body-small text-white/70 font-sans space-y-2">
            <li>• Projetos e artes permanecem da The Force.cc até a quitação total</li>
            <li>• Após o pagamento, o cliente obtém licença de uso para o evento Time Warp Brasil 2026, não exclusiva e intransferível</li>
          </ul>
        </div>
        </motion.div>
      </MagneticElement>

      {/* The Force Manifesto */}
      <ParallaxSection speed={0.3}>
        <motion.div
        className="p-8 border border-white/10 hover:bg-white/5 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="heading-medium font-sans mb-6">
          <AdvancedTextAnimation tag="h3" type="slide" direction="up">
            The Force
          </AdvancedTextAnimation>
        </div>
        <div className="space-y-4">
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            Somos uma força criativa que transforma espaços em experiências. Nosso trabalho conecta narrativas visuais, design técnico e execução impecável para criar momentos que transcendem o ordinário.
          </p>
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            Combinamos rigor técnico com visão artística para entregar projetos que não apenas atendem expectativas, mas as expandem. Cada palco que desenhamos, cada luz que posicionamos, cada vídeo que criamos é parte de um sistema maior — uma experiência integrada que transforma o evento em memória.
          </p>
          <p className="body-medium text-white/80 font-sans leading-relaxed">
            Para Time Warp Brasil 2026, trazemos nossa expertise em criar ambientes que respiram com a música, que pulsam com a energia do público, que se tornam parte integral da experiência techno. Minimal, preciso, impactante.
          </p>
        </div>
        </motion.div>
      </ParallaxSection>
    </div>
  )
}