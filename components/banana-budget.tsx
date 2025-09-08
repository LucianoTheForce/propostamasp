'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { bananaSwooshBudget } from '@/lib/banana-swoosh-data'

export default function BananaBudget() {
  const { language } = useLanguage()
  const isEnglish = language === 'en'

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold text-white">
            {isEnglish ? 'Investment' : 'Investimento'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {isEnglish 
              ? bananaSwooshBudget.description
              : 'Desenvolvimento de um molde 3D exclusivo no formato Swoosh para testar a viabilidade de crescimento de bananas dentro de moldes rígidos, avaliando estética, rendimento e aplicabilidade em futuras ativações.'}
          </p>
        </div>

        {/* Technical Analysis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            {isEnglish ? 'Technical Analysis' : 'Análise Técnica'}
          </h3>
          <ul className="space-y-3">
            {(isEnglish ? bananaSwooshBudget.technicalAnalysis.points : [
              'Encontrar plantação em estágio exato: bananas jovens com 8-10cm de comprimento (2-3 semanas pós-floração)',
              'Fruto precisa permanecer 6-10 semanas dentro do molde para adquirir formato final',
              'Nem todos os frutos serão aproveitáveis – medir taxa de sucesso faz parte do estudo'
            ]).map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">•</span>
                <span className="text-white/70">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Prototype Development */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20"
          >
            <h4 className="text-xl font-bold text-white mb-4">
              {isEnglish ? '3D Design' : 'Design 3D'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {(isEnglish ? bananaSwooshBudget.prototypeDevelopment.design.items : [
                'Criação do molde no formato Swoosh em duas metades com trava',
                'Material: Policarbonato transparente (espessura 4mm)',
                'Resistente a sol, chuva e pressão do crescimento',
                'Micro-furos de ventilação para evitar condensação e fungos'
              ]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-white mr-2 mt-1">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Production */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20"
          >
            <h4 className="text-xl font-bold text-white mb-4">
              {isEnglish ? 'Initial Production' : 'Produção Inicial'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {(isEnglish ? bananaSwooshBudget.prototypeDevelopment.production.items : [
                'Fabricação de 100 peças (moldes reutilizáveis)',
                'Cada peça pode ser aplicada em múltiplos frutos ao longo de diferentes ciclos de cultivo'
              ]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-white mr-2 mt-1">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Field Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-500/20"
          >
            <h4 className="text-xl font-bold text-white mb-4">
              {isEnglish ? 'Field Application' : 'Aplicação em Campo'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {(isEnglish ? bananaSwooshBudget.prototypeDevelopment.fieldApplication.items : [
                'Instalação dos moldes nos frutos jovens no estágio correto',
                'Monitoramento semanal para ajustes, higiene e controle de perdas',
                'Retirada do molde 7-10 dias antes da colheita para finalização da casca'
              ]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-white mr-2 mt-1">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {isEnglish ? 'Next Steps' : 'Próximos Passos'}
          </h3>
          <p className="text-gray-300 mb-6">
            {isEnglish 
              ? bananaSwooshBudget.nextSteps.description
              : 'Para garantir a confiabilidade do processo, propomos a execução de um teste piloto com os 100 moldes produzidos. Essa fase permitirá:'}
          </p>
          <ul className="space-y-3 mb-6">
            {(isEnglish ? bananaSwooshBudget.nextSteps.items : [
              'Avaliar a estética dos frutos moldados (qualidade visual e consistência do formato)',
              'Medir o rendimento real, pois nem todos os frutos se adaptam ao molde',
              'Validar a escalabilidade com dados concretos sobre perdas, tempo de cultivo e manutenção em campo'
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-white mr-3">✓</span>
                <span className="text-white/70">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-300 italic">
            {isEnglish 
              ? bananaSwooshBudget.nextSteps.conclusion
              : 'Com esse piloto, teremos bananas moldadas no formato Swoosh disponíveis a partir de dezembro, garantindo exclusividade e inovação para futuras ativações.'}
          </p>
        </motion.div>

        {/* Total Investment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1"
        >
          <div className="bg-gray-900 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              {isEnglish ? 'Total Investment' : 'Investimento Total'}
            </h3>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
              {formatCurrency(bananaSwooshBudget.investment.total)}
            </div>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {isEnglish 
                ? bananaSwooshBudget.investment.description
                : 'Valor total para desenvolvimento do molde, produção de 100 peças e monitoramento do teste piloto'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              {(isEnglish ? bananaSwooshBudget.investment.includes : [
                'Design e prototipagem do molde 3D Swoosh',
                'Produção de 100 moldes em policarbonato',
                'Instalação em campo e treinamento',
                'Programa de monitoramento e ajustes por 12 semanas',
                'Controle de qualidade e medição de rendimento',
                'Relatório final com dados de escalabilidade'
              ]).map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-white mr-2 mt-1">✓</span>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}