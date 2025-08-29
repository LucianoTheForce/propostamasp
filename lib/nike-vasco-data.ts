export interface ProjectionBudgetItem {
  desc: string;
  qty: number;
  days: number;
  unit_cost: number;
  line_total: number;
}

export interface ProjectionCategory {
  category: string;
  items: ProjectionBudgetItem[];
  category_total: number;
}

export interface ProjectionOption {
  option: string;
  currency: string;
  fee_rate: number;
  contingency_rate: number;
  categories: ProjectionCategory[];
  totals: {
    base_subtotal: number;
    fee_amount: number;
    subtotal_plus_fee: number;
    contingency_amount: number;
    grand_total: number;
  };
}

export const projectionBudgetData: ProjectionOption[] = [
  {
    option: "A — Premium (volumetria + lasers + cinema)",
    currency: "BRL",
    fee_rate: 0.12,
    contingency_rate: 0.1,
    categories: [
      {
        category: "Projeção & Mídia (50K lumens)",
        items: [
          {
            desc: "Projetor 50K lumens",
            qty: 4,
            days: 2,
            unit_cost: 45000.0,
            line_total: 360000.0
          },
          {
            desc: "Lentes & óptica",
            qty: 4,
            days: 2,
            unit_cost: 5000.0,
            line_total: 40000.0
          },
          {
            desc: "Media server high-end",
            qty: 2,
            days: 2,
            unit_cost: 25000.0,
            line_total: 100000.0
          }
        ],
        category_total: 500000.0
      },
      {
        category: "Volumetria & Atmosfera",
        items: [
          {
            desc: "Cortina de névoa / FogScreen",
            qty: 2,
            days: 2,
            unit_cost: 25000.0,
            line_total: 100000.0
          },
          {
            desc: "Haze + ventilação direcional",
            qty: 1,
            days: 2,
            unit_cost: 15000.0,
            line_total: 30000.0
          }
        ],
        category_total: 130000.0
      },
      {
        category: "Laser",
        items: [
          {
            desc: "Sistema de laser c/ operador",
            qty: 1,
            days: 2,
            unit_cost: 20000.0,
            line_total: 40000.0
          }
        ],
        category_total: 40000.0
      },
      {
        category: "Rigging & Energia",
        items: [
          {
            desc: "Rigging / estruturas / proteções de óptica",
            qty: 1,
            days: 1,
            unit_cost: 60000.0,
            line_total: 60000.0
          },
          {
            desc: "Energia (gerador dedicado + cabos)",
            qty: 1,
            days: 1,
            unit_cost: 60000.0,
            line_total: 60000.0
          }
        ],
        category_total: 120000.0
      },
      {
        category: "Equipe técnica (coordenação & mapping)",
        items: [
          {
            desc: "Coordenação técnica + operadores de mapping",
            qty: 1,
            days: 2,
            unit_cost: 65000.0,
            line_total: 130000.0
          }
        ],
        category_total: 130000.0
      },
      {
        category: "Captação (cinema) & Drone & BTS",
        items: [
          {
            desc: "Câmera cinema + lentes + grip",
            qty: 1,
            days: 2,
            unit_cost: 60000.0,
            line_total: 120000.0
          },
          {
            desc: "Drone homologado + piloto habilitado",
            qty: 1,
            days: 1,
            unit_cost: 30000.0,
            line_total: 30000.0
          },
          {
            desc: "BTS + Fotografia",
            qty: 1,
            days: 1,
            unit_cost: 30000.0,
            line_total: 30000.0
          }
        ],
        category_total: 180000.0
      },
      {
        category: "Conteúdo & Pós",
        items: [
          {
            desc: "Direção criativa + produção de conteúdo (água/partículas)",
            qty: 1,
            days: 1,
            unit_cost: 150000.0,
            line_total: 150000.0
          },
          {
            desc: "Edição, color grading e sound design",
            qty: 1,
            days: 1,
            unit_cost: 110000.0,
            line_total: 110000.0
          },
          {
            desc: "VFX / simulações adicionais",
            qty: 1,
            days: 1,
            unit_cost: 100000.0,
            line_total: 100000.0
          }
        ],
        category_total: 360000.0
      },
      {
        category: "Logística, Permissões & Seguros",
        items: [
          {
            desc: "Logística & viagens & hospedagem (RJ)",
            qty: 1,
            days: 1,
            unit_cost: 65000.0,
            line_total: 65000.0
          },
          {
            desc: "Permissões, licenças, segurança/brigada/ambulância",
            qty: 1,
            days: 1,
            unit_cost: 30000.0,
            line_total: 30000.0
          },
          {
            desc: "Seguros (equipamentos e RC)",
            qty: 1,
            days: 1,
            unit_cost: 14000.0,
            line_total: 14000.0
          }
        ],
        category_total: 109000.0
      }
    ],
    totals: {
      base_subtotal: 1569000.0,
      fee_amount: 188280.0,
      subtotal_plus_fee: 1757280.0,
      contingency_amount: 175728.0,
      grand_total: 1933008.0
    }
  },
  {
    option: "B — Híbrida (fachada + haze + laser)",
    currency: "BRL",
    fee_rate: 0.12,
    contingency_rate: 0.1,
    categories: [
      {
        category: "Projeção & Mídia (50K lumens)",
        items: [
          {
            desc: "Projetor 50K lumens",
            qty: 4,
            days: 2,
            unit_cost: 40000.0,
            line_total: 320000.0
          },
          {
            desc: "Lentes & óptica",
            qty: 4,
            days: 2,
            unit_cost: 4000.0,
            line_total: 32000.0
          },
          {
            desc: "Media server high-end",
            qty: 1,
            days: 2,
            unit_cost: 14000.0,
            line_total: 28000.0
          }
        ],
        category_total: 380000.0
      },
      {
        category: "Atmosfera (haze) & Ventilação",
        items: [
          {
            desc: "Haze de alta vazão",
            qty: 1,
            days: 2,
            unit_cost: 15000.0,
            line_total: 30000.0
          },
          {
            desc: "Ventiladores direcionais",
            qty: 1,
            days: 2,
            unit_cost: 10000.0,
            line_total: 20000.0
          },
          {
            desc: "Consumíveis / reserva",
            qty: 1,
            days: 1,
            unit_cost: 10000.0,
            line_total: 10000.0
          }
        ],
        category_total: 60000.0
      },
      {
        category: "Laser (uso pontual)",
        items: [
          {
            desc: "Sistema de laser c/ operador",
            qty: 1,
            days: 2,
            unit_cost: 15000.0,
            line_total: 30000.0
          }
        ],
        category_total: 30000.0
      },
      {
        category: "Rigging & Energia",
        items: [
          {
            desc: "Rigging / estruturas / proteções",
            qty: 1,
            days: 1,
            unit_cost: 45000.0,
            line_total: 45000.0
          },
          {
            desc: "Energia (gerador dedicado + cabos)",
            qty: 1,
            days: 1,
            unit_cost: 35000.0,
            line_total: 35000.0
          }
        ],
        category_total: 80000.0
      },
      {
        category: "Equipe técnica (coordenação & mapping)",
        items: [
          {
            desc: "Coordenação técnica + operadores de mapping",
            qty: 1,
            days: 2,
            unit_cost: 50000.0,
            line_total: 100000.0
          }
        ],
        category_total: 100000.0
      },
      {
        category: "Captação (cinema) & Drone & BTS",
        items: [
          {
            desc: "Câmera cinema + lentes + grip",
            qty: 1,
            days: 2,
            unit_cost: 40000.0,
            line_total: 80000.0
          },
          {
            desc: "Drone homologado + piloto",
            qty: 1,
            days: 1,
            unit_cost: 20000.0,
            line_total: 20000.0
          },
          {
            desc: "BTS + Fotografia",
            qty: 1,
            days: 1,
            unit_cost: 20000.0,
            line_total: 20000.0
          }
        ],
        category_total: 120000.0
      },
      {
        category: "Conteúdo & Pós",
        items: [
          {
            desc: "Direção criativa + produção de conteúdo",
            qty: 1,
            days: 1,
            unit_cost: 120000.0,
            line_total: 120000.0
          },
          {
            desc: "Edição, color grading e sound design",
            qty: 1,
            days: 1,
            unit_cost: 70000.0,
            line_total: 70000.0
          },
          {
            desc: "VFX / texturas de água (leve)",
            qty: 1,
            days: 1,
            unit_cost: 30000.0,
            line_total: 30000.0
          }
        ],
        category_total: 220000.0
      },
      {
        category: "Logística, Permissões & Seguros",
        items: [
          {
            desc: "Logística & viagens & hospedagem (RJ)",
            qty: 1,
            days: 1,
            unit_cost: 50000.0,
            line_total: 50000.0
          },
          {
            desc: "Permissões, licenças, segurança/brigada/ambulância",
            qty: 1,
            days: 1,
            unit_cost: 25000.0,
            line_total: 25000.0
          },
          {
            desc: "Seguros (equipamentos e RC)",
            qty: 1,
            days: 1,
            unit_cost: 8200.0,
            line_total: 8200.0
          }
        ],
        category_total: 83200.0
      }
    ],
    totals: {
      base_subtotal: 1073200.0,
      fee_amount: 128784.0,
      subtotal_plus_fee: 1201984.0,
      contingency_amount: 120198.4,
      grand_total: 1322182.4
    }
  },
  {
    option: "C — Essencial (fachada — enxuta)",
    currency: "BRL",
    fee_rate: 0.12,
    contingency_rate: 0.1,
    categories: [
      {
        category: "Projeção & Mídia (20K lumens)",
        items: [
          {
            desc: "Projetor 20K lumens",
            qty: 2,
            days: 2,
            unit_cost: 40000.0,
            line_total: 160000.0
          },
          {
            desc: "Lentes & óptica",
            qty: 2,
            days: 2,
            unit_cost: 4000.0,
            line_total: 16000.0
          },
          {
            desc: "Media server",
            qty: 1,
            days: 2,
            unit_cost: 12000.0,
            line_total: 24000.0
          }
        ],
        category_total: 200000.0
      },
      {
        category: "Atmosfera (haze) mínimo",
        items: [
          {
            desc: "Haze + ventilação (mínimo)",
            qty: 1,
            days: 2,
            unit_cost: 10000.0,
            line_total: 20000.0
          }
        ],
        category_total: 20000.0
      },
      {
        category: "Rigging & Energia",
        items: [
          {
            desc: "Rigging / estruturas",
            qty: 1,
            days: 1,
            unit_cost: 25000.0,
            line_total: 25000.0
          },
          {
            desc: "Energia (gerador + cabos)",
            qty: 1,
            days: 1,
            unit_cost: 20000.0,
            line_total: 20000.0
          }
        ],
        category_total: 45000.0
      },
      {
        category: "Equipe técnica (coordenação & mapping)",
        items: [
          {
            desc: "Coordenação + operadores",
            qty: 1,
            days: 2,
            unit_cost: 30000.0,
            line_total: 60000.0
          }
        ],
        category_total: 60000.0
      },
      {
        category: "Captação & Drone & BTS",
        items: [
          {
            desc: "Câmera de vídeo profissional",
            qty: 1,
            days: 1,
            unit_cost: 45000.0,
            line_total: 45000.0
          },
          {
            desc: "Drone homologado + piloto (1 passada)",
            qty: 1,
            days: 1,
            unit_cost: 15000.0,
            line_total: 15000.0
          },
          {
            desc: "BTS + Fotografia (essencial)",
            qty: 1,
            days: 1,
            unit_cost: 10000.0,
            line_total: 10000.0
          }
        ],
        category_total: 70000.0
      },
      {
        category: "Conteúdo & Pós",
        items: [
          {
            desc: "Direção criativa + conteúdo (enxuto)",
            qty: 1,
            days: 1,
            unit_cost: 70000.0,
            line_total: 70000.0
          },
          {
            desc: "Edição + color + sound (enxuto)",
            qty: 1,
            days: 1,
            unit_cost: 40000.0,
            line_total: 40000.0
          }
        ],
        category_total: 110000.0
      },
      {
        category: "Logística, Permissões & Seguros",
        items: [
          {
            desc: "Logística & viagens (enxuto)",
            qty: 1,
            days: 1,
            unit_cost: 14000.0,
            line_total: 14000.0
          },
          {
            desc: "Permissões & segurança (enxuto)",
            qty: 1,
            days: 1,
            unit_cost: 7000.0,
            line_total: 7000.0
          },
          {
            desc: "Seguros (equipamentos e RC)",
            qty: 1,
            days: 1,
            unit_cost: 2800.0,
            line_total: 2800.0
          }
        ],
        category_total: 23800.0
      }
    ],
    totals: {
      base_subtotal: 528800.0,
      fee_amount: 63456.0,
      subtotal_plus_fee: 592256.0,
      contingency_amount: 59225.6,
      grand_total: 651481.6
    }
  },
  {
    option: "D — VFX (filme 100% em pós)",
    currency: "BRL",
    fee_rate: 0.12,
    contingency_rate: 0.1,
    categories: [
      {
        category: "Conteúdo & VFX (filme 100% em pós)",
        items: [
          {
            desc: "Conceito, direção criativa e supervisão de VFX",
            qty: 1,
            days: 1,
            unit_cost: 30000.0,
            line_total: 30000.0
          },
          {
            desc: "Produção de VFX (simulações, comp, tracking)",
            qty: 1,
            days: 1,
            unit_cost: 115000.0,
            line_total: 115000.0
          },
          {
            desc: "Render farm / licenças / assets",
            qty: 1,
            days: 1,
            unit_cost: 20000.0,
            line_total: 20000.0
          }
        ],
        category_total: 165000.0
      },
      {
        category: "Pós-produção",
        items: [
          {
            desc: "Edição + conform + color grading",
            qty: 1,
            days: 1,
            unit_cost: 22000.0,
            line_total: 22000.0
          },
          {
            desc: "Sound design + mix",
            qty: 1,
            days: 1,
            unit_cost: 12000.0,
            line_total: 12000.0
          },
          {
            desc: "Locução (gravação + estúdio)",
            qty: 1,
            days: 1,
            unit_cost: 7500.0,
            line_total: 7500.0
          }
        ],
        category_total: 41500.0
      },
      {
        category: "Gestão & Produção",
        items: [
          {
            desc: "Produção executiva / PM",
            qty: 1,
            days: 1,
            unit_cost: 857.14,
            line_total: 857.14
          }
        ],
        category_total: 857.14
      }
    ],
    totals: {
      base_subtotal: 205357.14,
      fee_amount: 24642.86,
      subtotal_plus_fee: 230000.0,
      contingency_amount: 23000.0,
      grand_total: 253000.0
    }
  }
];

// Main project data structure
export const nikeVascoData = {
  title: "PROPOSTA — THE FORCE",
  subtitle: "NIKE × Vasco — Projeção em São Januário (RJ)",
  client: "AKQA / Nike",
  date: "Hoje",
  concept: {
    title: "CONCEITO CRIATIVO — A MARÉ CONTIDA",
    tagline: "IR CONTRA A MARÉ NOS FAZ GIGANTES.",
    description: "Esculpimos a maré com luz, atmosfera e ritmo — energia que avança até o paredão do estádio e é contida. A fachada permanece protagonista. O filme é simples, direto e poderoso, com estética underground/analógica e voice over de torcedor em tom de \"marinheiro\".",
    vision: {
      image: "pretos densos, azul-petróleo e brancos \"espuma\"; grão fino e alto contraste; mar sugerido (refrações, placas, partículas discretas), nunca literal.",
      camera: "macro da ótica → rasante no relevo → hero simétrico; movimento cirúrgico; cortes mecânicos; 24 fps e um único plano a 48 fps no ápice. Drone baixo e lento (passada controlada) para hero de geografia/escala.",
      sound: "cama sub-harmônica inspirada no mar (não literal), percussão seca, silêncio antes do reveal; VO grave, poucas palavras, pausas que respiram."
    }
  },
  deliverables: [
    "Projeção em São Januário (RJ)",
    "Filme de lançamento (45\") + cortes 15\" e 6\" (16:9, 9:16, 1:1)",
    "Fotografia (hero + stills)",
    "Behind the Scenes (30–60\")"
  ],
  technical: {
    projection: "projetores de 50K lumens (com redundância), media servers high-end, mapeamento avançado de arquitetura.",
    volumetry: "FogScreen/névoa/water-mist com ventilação direcional (controle de vento).",
    laser: "desenho de feixes por DMX/timecode (uso pontual para o impacto).",
    energy: "gerador dedicado; estruturas/proteções para óptica e bloqueio de flare/umidade.",
    capture: "direção/DP; ARRI/RED; primes 35/50/85; gimbal/steadicam pontuais; drone homologado com piloto habilitado.",
    post: "edição, color grading, sound design e master."
  },
  timeline: {
    night0: "Montagem & Testes: instalação de projetores/laser/volumetria; alinhamento; ajustes de mapeamento; checagem de segurança.",
    night1: "Filmagem: rodagem da projeção + voo controlado de drone + B-roll; backup de mídia.",
    post: "Pós (7 dias) → Masters (45\" + 15\" + 6\", formatos 16:9 / 9:16 / 1:1)."
  },
  payment: {
    validity: "10 dias",
    terms: "40% na contratação (início + R&D) • 40% antes da montagem • 20% na entrega dos masters",
    phase1: "Fase 1 — Pesquisa & R&D (remunerada): etapa independente abatível do total se aprovado",
    taxes: "Tributos/Retenções: não inclusos",
    exclusions: "PR/assessoria; cachês/cessões de imagem de terceiros; logística de público; taxas municipais extraordinárias"
  },
  nextSteps: [
    "Escolha do caminho técnico (A/B/C/D) e ajustes de escopo",
    "Aprovação do roteiro/VO, frames-chave e trajeto/altura de voo do drone",
    "Fechamento de fornecedores e permissões (incluindo protocolos de drone no RJ)",
    "Testes controlados e filmagem",
    "Pós e entrega dos masters"
  ],
  options: projectionBudgetData
};