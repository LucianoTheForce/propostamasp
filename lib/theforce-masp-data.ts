export interface ProjectionBudgetItem {
  desc: string;
  qty: number;
  days?: number;
  unit_cost: number;
  line_total: number;
}

export interface ProjectionCategory {
  category: string;
  duration?: string;
  description: string;
  items: ProjectionBudgetItem[];
  category_total: number;
  technical_data?: string[];
}

export interface ProjectionOption {
  option: string;
  currency: string;
  categories: ProjectionCategory[];
  totals: {
    grand_total: number;
  };
  differentials?: string[];
}

export const theForceProposalData: ProjectionOption = {
  option: "The Force.cc — Conteúdos Imersivos",
  currency: "BRL",
  categories: [
    {
      category: "Vídeo Mapping no Salão Principal",
      duration: "4 minutos",
      description: "O salão principal será transformado em um organismo digital pulsante. As projeções mapeadas nas testeiras e escadas cruzadas irão revelar o fluxo de energia e o ciclo de matéria nos ecossistemas, traduzidos em linguagem visual contemporânea. Além disso, será inserido um layer adicional inspirado em composições geométricas, criando novas perspectivas e reconfigurando o espaço a cada mudança de cena. Redes inspiradas em micélios e padrões fractais se expandem como códigos auto-organizados, demonstrando a lógica que conecta o biológico ao digital. O público será envolvido por um sistema em constante troca, onde cada conexão gera novos caminhos e possibilidades.",
      items: [
        {
          desc: "Desenvolvimento de conteúdo visual",
          qty: 1,
          unit_cost: 45000.0,
          line_total: 45000.0
        }
      ],
      category_total: 45000.0,
      technical_data: [
        "15 projetores a laser de 10.000 lumens com 15 lentes dedicadas",
        "1 servidor de mídia de 16 saídas com software de mapeamento Resolume"
      ]
    },
    {
      category: "Projeção nas Mesas de Jantar",
      duration: "2 minutos",
      description: "As 45 mesas de jantar se tornam superfícies vivas para narrativas visuais que exploram a circularidade da matéria e da energia. Sobre cada mesa, projeções mostrarão organismos digitais que se replicam como fungos, fluxos que lembram rios de dados e padrões que refletem a complexidade ecológica e algorítmica. Cada convidado vivencia de perto como sistemas vivos e digitais compartilham a mesma lógica de interdependência e ciclos contínuos.",
      items: [
        {
          desc: "Desenvolvimento de conteúdo para mesas",
          qty: 1,
          unit_cost: 25000.0,
          line_total: 25000.0
        }
      ],
      category_total: 25000.0,
      technical_data: [
        "45 projetores a laser de 4.500 a 6.000 lumens",
        "15 servidores de mídia com software de mapeamento Watchout"
      ]
    },
    {
      category: "Projeção Imersiva na Entrada e Escadas",
      duration: "2 minutos",
      description: "O corredor de entrada e as escadas serão um portal para o universo da festa. As projeções em paredes, teto e degraus irão materializar fluxos de energia e trocas de matéria em constante movimento. Padrões ecológicos inspirados em redes miceliais e fractais criarão a sensação de atravessar um sistema vivo, evidenciando que tanto a ecologia quanto os sistemas digitais se baseiam em ciclos interdependentes.",
      items: [
        {
          desc: "Desenvolvimento de conteúdo imersivo",
          qty: 1,
          unit_cost: 25000.0,
          line_total: 25000.0
        }
      ],
      category_total: 25000.0,
      technical_data: [
        "10 projetores a laser de 4.000 lumens de curta distância",
        "4 projetores ultracurta distância",
        "5 servidores de mídia com software de mapeamento Watchout"
      ]
    }
  ],
  totals: {
    grand_total: 95000.0
  },
  differentials: [
    "Symbiotic Code: uma proposta que une ecologia, sistemas complexos e código digital",
    "Integração entre fluxo de energia e ciclo de matéria, traduzidos em experiências imersivas",
    "Inserção de layers geométricos dinâmicos no salão principal, reconfigurando o espaço em tempo real",
    "Narrativa contínua conectando entrada, jantar e salão como um único sistema vivo",
    "Conteúdo autoral, sofisticado e inédito, mantendo o mesmo valor comercial da proposta original"
  ]
};

export const maspEventData = {
  title: "PROPOSTA COMERCIAL — THE FORCE.CC",
  subtitle: "Conteúdos Imersivos",
  client: "Festa MASP 2025",
  event: "Symbiotic Code",
  agency: "The Force.cc",
  date: "2025",
  concept: {
    title: "CONCEITO CRIATIVO — SYMBIOTIC CODE",
    tagline: "A CONEXÃO ENTRE O BIOLÓGICO E O DIGITAL",
    description: "Uma experiência imersiva que explora a simbiose entre ecologia e sistemas digitais, revelando como ambos compartilham a mesma lógica de interdependência, ciclos contínuos e auto-organização. Através de projeções mapeadas, transformamos o espaço do MASP em um organismo vivo e pulsante.",
    themes: {
      biological: "Micélios, fractais, fluxos orgânicos e padrões naturais",
      digital: "Códigos auto-organizados, redes de dados, algoritmos generativos",
      fusion: "A interseção onde natureza e tecnologia se encontram e se complementam"
    }
  },
  technical_approach: {
    mapping: "Projeção mapeada de alta precisão em múltiplas superfícies",
    content: "Conteúdo generativo e responsivo ao espaço arquitetônico",
    integration: "Sistema sincronizado entre salão principal, mesas e entrada",
    technology: "Servidores de mídia com Resolume e Watchout para controle total"
  },
  deliverables: [
    "Vídeo Mapping no Salão Principal (4 minutos)",
    "Projeção nas 45 Mesas de Jantar (2 minutos)",
    "Projeção Imersiva na Entrada e Escadas (2 minutos)",
    "Sistema integrado e sincronizado entre todos os ambientes"
  ],
  investment: {
    validity: "15 dias",
    payment_terms: "50% na contratação • 30% na montagem • 20% após o evento",
    includes: [
      "Desenvolvimento de todo conteúdo visual",
      "Coordenação técnica do projeto",
      "Supervisão artística",
      "Acompanhamento durante o evento"
    ],
    excludes: [
      "Equipamentos de projeção (já especificados)",
      "Estrutura física e rigging",
      "Energia elétrica e geradores",
      "Equipe técnica de operação dos equipamentos"
    ]
  },
  timeline: {
    week1: "Conceito e desenvolvimento inicial do conteúdo",
    week2: "Produção e animação dos elementos visuais",
    week3: "Testes e ajustes finais do conteúdo",
    event_day: "Supervisão e acompanhamento durante o evento"
  },
  team: {
    creative_direction: "Direção criativa e conceitual",
    visual_development: "Desenvolvimento visual e motion design",
    technical_production: "Produção técnica e mapeamento",
    coordination: "Coordenação geral do projeto"
  }
};