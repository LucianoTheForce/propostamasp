"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Check, X, Eye, EyeOff } from "lucide-react"
import { nikeVascoData, ProjectionOption } from "@/lib/nike-vasco-data"
import { useLanguage } from "@/contexts/language-context"

export function ProjectionBudget() {
  const [selectedOption, setSelectedOption] = useState<string>("A — Premium (volumetria + lasers + cinema)")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'detailed' | 'summary'>('summary')
  const { language } = useLanguage()

  const currentOption = nikeVascoData.options.find(opt => opt.option === selectedOption)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getOptionSummary = (option: string) => {
    if (language === 'en') {
      switch (option) {
        case "A — Premium (volumetria + lasers + cinema)":
          return "Complete experience with volumetrics, lasers and professional cinematographic capture"
        case "B — Híbrida (fachada + haze + laser)":
          return "Facade projection with haze atmosphere and targeted laser"
        case "C — Essencial (fachada — enxuta)":
          return "Essential facade projection with optimized structure"
        case "D — VFX (filme 100% em pós)":
          return "100% post-production with VFX, no live projection"
        default:
          return ""
      }
    } else {
      switch (option) {
        case "A — Premium (volumetria + lasers + cinema)":
          return "Experiência completa com volumetria, lasers e captação cinematográfica profissional"
        case "B — Híbrida (fachada + haze + laser)":
          return "Projeção na fachada com atmosfera de haze e laser pontual"
        case "C — Essencial (fachada — enxuta)":
          return "Projeção essencial na fachada com estrutura otimizada"
        case "D — VFX (filme 100% em pós)":
          return "Produção 100% em pós-produção com VFX, sem projeção ao vivo"
        default:
          return ""
      }
    }
  }

  const getOptionDetails = (option: string) => {
    if (language === 'en') {
      switch (option) {
        case "A — Premium (volumetria + lasers + cinema)":
          return [
            "• 50K lumens projectors with redundancy",
            "• FogScreen system for volumetrics",
            "• DMX/timecode mapped lasers",
            "• Complete cinema crew (director, DP, gaffer)",
            "• ARRI/RED capture with primes",
            "• Certified cinematographic drone",
            "• Premium post-production with color grading"
          ]
        case "B — Híbrida (fachada + haze + laser)":
          return [
            "• 40K lumens projectors",
            "• Controlled atmospheric haze",
            "• Targeted laser for key moments",
            "• Reduced capture crew",
            "• Basic cinema camera",
            "• Standard post-production"
          ]
        case "C — Essencial (fachada — enxuta)":
          return [
            "• 20K lumens projectors",
            "• Optimized structure",
            "• No laser equipment",
            "• Minimal operational crew",
            "• Basic video capture",
            "• Standard editing"
          ]
        case "D — VFX (filme 100% em pós)":
          return [
            "• No projection equipment",
            "• Stadium reference capture",
            "• Complete VFX in post-production",
            "• Digital projection simulation",
            "• 4K rendering",
            "• Film delivery only"
          ]
        default:
          return []
      }
    } else {
      switch (option) {
        case "A — Premium (volumetria + lasers + cinema)":
          return [
            "• Projetores 50K lumens com redundância",
            "• Sistema FogScreen para volumetria",
            "• Lasers mapeados DMX/timecode",
            "• Equipe cinema completa (diretor, DP, gaffer)",
            "• Captação ARRI/RED com primes",
            "• Drone cinematográfico homologado",
            "• Pós-produção premium com color grading"
          ]
        case "B — Híbrida (fachada + haze + laser)":
          return [
            "• Projetores 40K lumens",
            "• Haze atmosférico controlado",
            "• Laser pontual para momentos-chave",
            "• Equipe reduzida de captação",
            "• Câmera cinema básica",
            "• Pós-produção standard"
          ]
        case "C — Essencial (fachada — enxuta)":
          return [
            "• Projetores 20K lumens",
            "• Estrutura otimizada",
            "• Sem equipamento laser",
            "• Equipe mínima operacional",
            "• Captação de vídeo básica",
            "• Edição standard"
          ]
        case "D — VFX (filme 100% em pós)":
          return [
            "• Sem equipamento de projeção",
            "• Captação de referências do estádio",
            "• VFX completo em pós-produção",
            "• Simulação digital da projeção",
            "• Renderização 4K",
            "• Entrega apenas do filme finalizado"
          ]
        default:
          return []
      }
    }
  }

  const getOptionColor = (option: string) => {
    if (option.includes("Premium")) return "border-blue-400 bg-blue-400/10"
    if (option.includes("Híbrida")) return "border-cyan-400 bg-cyan-400/10"
    if (option.includes("Essencial")) return "border-white bg-white/10"
    if (option.includes("VFX")) return "border-purple-400 bg-purple-400/10"
    return "border-white/20 bg-white/5"
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Option Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {nikeVascoData.options.map((option) => (
          <motion.div
            key={option.option}
            onClick={() => setSelectedOption(option.option)}
            className={`cursor-pointer p-4 border rounded-lg transition-all ${
              selectedOption === option.option
                ? getOptionColor(option.option) + " border-2"
                : "border-white/20 bg-white/5 hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xs text-white/60 mb-2">
              {option.option.split(" — ")[0]}
            </div>
            <div className="text-sm font-bold mb-2">
              {option.option.split(" — ")[1]}
            </div>
            <div className="text-lg font-bold mb-2">
              R$ {option.totals.grand_total.toLocaleString('pt-BR')}
            </div>
            <div className="text-xs text-white/60">
              {getOptionSummary(option.option)}
            </div>
            {selectedOption === option.option && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-black" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white/5 rounded-lg">
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode('summary')}
            className={`px-4 py-2 rounded transition ${
              viewMode === 'summary'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'pt' ? 'Resumo' : 'Summary'}
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 rounded transition ${
              viewMode === 'detailed'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'pt' ? 'Detalhado' : 'Detailed'}
          </button>
        </div>
      </div>

      {/* Budget Display */}
      <AnimatePresence mode="wait">
        {currentOption && (
          <motion.div
            key={selectedOption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border border-white/20 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className={`p-6 ${getOptionColor(selectedOption)}`}>
              <h3 className="text-2xl font-bold mb-2">{currentOption.option}</h3>
              <div className="text-2xl font-bold mb-3">
                R$ {currentOption.totals.grand_total.toLocaleString('pt-BR')}
              </div>
              <p className="text-white/80 mb-4">{getOptionSummary(selectedOption)}</p>
              <div className="text-sm text-white/70 space-y-1">
                {getOptionDetails(selectedOption).map((detail, idx) => (
                  <div key={idx}>{detail}</div>
                ))}
              </div>
            </div>

            {viewMode === 'summary' ? (
              /* Summary View */
              <div className="p-6">
                {/* Categories Summary - Now shows only category names without values */}
                <div className="space-y-3 mb-6">
                  {currentOption.categories.map((category, idx) => (
                    <div
                      key={idx}
                      className="py-3 border-b border-white/10 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        <span className="text-white/80">{category.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals - Now showing the total investment value */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      {language === 'pt' ? 'Investimento Total' : 'Total Investment'}
                    </span>
                    <span className="text-xl font-bold">
                      R$ {currentOption.totals.grand_total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Detailed View */
              <div className="p-6">
                {currentOption.categories.map((category, categoryIdx) => (
                  <div key={categoryIdx} className="mb-6 last:mb-0">
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="w-full flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">{category.category}</span>
                        <span className="text-sm text-white/60">
                          ({category.items.length} {category.items.length === 1 ? (language === 'pt' ? 'item' : 'item') : (language === 'pt' ? 'itens' : 'items')})
                        </span>
                      </div>
                      <div className="flex items-center">
                        {expandedCategories.includes(category.category) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedCategories.includes(category.category) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 p-4 bg-black/20 rounded-lg">
                            <div className="space-y-2">
                              {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                  <div className="flex-1">
                                    <span className="text-sm text-white/80">{item.desc}</span>
                                    <span className="text-xs text-white/50 ml-2">
                                      ({item.qty} {item.qty === 1 ? (language === 'pt' ? 'un' : 'unit') : (language === 'pt' ? 'un' : 'units')} × {item.days} {item.days === 1 ? (language === 'pt' ? 'dia' : 'day') : (language === 'pt' ? 'dias' : 'days')})
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Total Investment in detailed view */}
                <div className="pt-4 mt-6 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      {language === 'pt' ? 'Investimento Total' : 'Total Investment'}
                    </span>
                    <span className="text-xl font-bold">
                      R$ {currentOption.totals.grand_total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option Comparison */}
      <div className="mt-8 p-6 bg-white/5 rounded-lg">
        <h4 className="text-lg font-bold mb-4">{language === 'pt' ? 'Comparação de Opções' : 'Options Comparison'}</h4>
        <div className="space-y-2">
          {nikeVascoData.options.map((option) => {
            const percentage = (option.totals.grand_total / nikeVascoData.options[0].totals.grand_total) * 100
            return (
              <div key={option.option} className="flex items-center gap-4">
                <div className="w-24 text-xs text-white/60">{option.option.split(" — ")[0]}</div>
                <div className="flex-1 h-8 bg-white/10 rounded overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${getOptionColor(option.option).split(' ')[0]} bg-opacity-50`}
                  />
                </div>
                <div className="w-32 text-right text-sm font-bold">
                  R$ {option.totals.grand_total.toLocaleString('pt-BR')}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Notes */}
      {selectedOption.includes("VFX") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-purple-400/10 border border-purple-400/30 rounded-lg"
        >
          <p className="text-sm text-purple-200">
            <strong>{language === 'pt' ? 'Nota:' : 'Note:'}</strong> {language === 'pt' ? 'A Opção D (VFX) não inclui projeção ao vivo no estádio. Entrega apenas o filme finalizado em pós-produção com efeitos visuais.' : 'Option D (VFX) does not include live projection at the stadium. Delivers only the finished film in post-production with visual effects.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}