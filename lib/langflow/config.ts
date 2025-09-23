/**
 * Langflow Configuration and Flow Definitions
 * Define your AI workflows and their configurations here
 */

export interface FlowDefinition {
  id: string;
  name: string;
  description: string;
  inputs: Record<string, any>;
  outputs: string[];
}

/**
 * Predefined Langflow flows for proposal generation
 */
export const LANGFLOW_FLOWS = {
  // Main proposal generation flow
  PROPOSAL_GENERATOR: {
    id: 'proposal-generator',
    name: 'Proposal Generator',
    description: 'Generates complete business proposals using AI',
    inputs: {
      client_name: { type: 'string', required: true },
      project_type: { type: 'string', required: true },
      requirements: { type: 'string', required: false },
      budget: { type: 'number', required: false },
      timeline: { type: 'string', required: false },
      language: { type: 'string', options: ['en', 'pt'], default: 'pt' }
    },
    outputs: ['proposal_content', 'executive_summary', 'budget_breakdown']
  },

  // Content enhancement flow
  CONTENT_ENHANCER: {
    id: 'content-enhancer',
    name: 'Content Enhancer',
    description: 'Enhances and improves existing proposal content',
    inputs: {
      content: { type: 'string', required: true },
      enhancement_type: { 
        type: 'string', 
        options: ['professional', 'technical', 'creative', 'concise'],
        default: 'professional'
      },
      target_length: { type: 'string', options: ['same', 'shorter', 'longer'], default: 'same' }
    },
    outputs: ['enhanced_content']
  },

  // Proposal analyzer flow
  PROPOSAL_ANALYZER: {
    id: 'proposal-analyzer',
    name: 'Proposal Analyzer',
    description: 'Analyzes proposals for quality and completeness',
    inputs: {
      content: { type: 'string', required: true },
      analysis_type: {
        type: 'string',
        options: ['full', 'quick', 'competitive'],
        default: 'full'
      }
    },
    outputs: ['score', 'suggestions', 'strengths', 'weaknesses', 'competitive_analysis']
  },

  // Budget calculator flow
  BUDGET_CALCULATOR: {
    id: 'budget-calculator',
    name: 'Budget Calculator',
    description: 'Calculates and optimizes project budgets',
    inputs: {
      project_type: { type: 'string', required: true },
      scope: { type: 'string', required: true },
      timeline: { type: 'string', required: true },
      team_size: { type: 'number', required: false },
      complexity: { type: 'string', options: ['low', 'medium', 'high'], default: 'medium' }
    },
    outputs: ['total_budget', 'breakdown', 'payment_schedule']
  },

  // Executive summary generator
  SUMMARY_GENERATOR: {
    id: 'summary-generator',
    name: 'Executive Summary Generator',
    description: 'Creates compelling executive summaries',
    inputs: {
      full_content: { type: 'string', required: true },
      max_length: { type: 'number', default: 500 },
      tone: { type: 'string', options: ['formal', 'friendly', 'technical'], default: 'formal' }
    },
    outputs: ['summary']
  }
};

/**
 * Prompt templates for different types of proposals
 */
export const PROPOSAL_TEMPLATES = {
  WEB_DEVELOPMENT: {
    name: 'Web Development',
    prompt: `Create a comprehensive web development proposal including:
    - Modern tech stack recommendations
    - Responsive design approach
    - Performance optimization strategies
    - Security best practices
    - Deployment and hosting options`,
    sections: [
      'Technical Architecture',
      'Frontend Development',
      'Backend Development',
      'Database Design',
      'API Integration',
      'Testing Strategy',
      'Deployment Plan'
    ]
  },

  MOBILE_APP: {
    name: 'Mobile App Development',
    prompt: `Create a mobile app development proposal including:
    - Platform strategy (iOS/Android/Cross-platform)
    - User experience design
    - App store optimization
    - Push notifications and engagement
    - Analytics and monitoring`,
    sections: [
      'Platform Strategy',
      'UI/UX Design',
      'Core Features',
      'Backend Services',
      'Third-party Integrations',
      'App Store Submission',
      'Post-launch Support'
    ]
  },

  AI_INTEGRATION: {
    name: 'AI/ML Integration',
    prompt: `Create an AI integration proposal including:
    - AI/ML model selection
    - Data pipeline architecture
    - Training and fine-tuning approach
    - Performance metrics
    - Ethical considerations`,
    sections: [
      'AI Strategy',
      'Data Requirements',
      'Model Architecture',
      'Training Pipeline',
      'Integration Plan',
      'Performance Monitoring',
      'Scaling Strategy'
    ]
  },

  CONSULTING: {
    name: 'Technical Consulting',
    prompt: `Create a technical consulting proposal including:
    - Current state assessment
    - Gap analysis
    - Recommendations and roadmap
    - Implementation support
    - Knowledge transfer`,
    sections: [
      'Assessment Methodology',
      'Current State Analysis',
      'Improvement Opportunities',
      'Implementation Roadmap',
      'Success Metrics',
      'Ongoing Support'
    ]
  },

  ECOMMERCE: {
    name: 'E-commerce Platform',
    prompt: `Create an e-commerce platform proposal including:
    - Platform selection and customization
    - Payment gateway integration
    - Inventory management
    - Order fulfillment
    - Marketing tools integration`,
    sections: [
      'Platform Architecture',
      'Product Catalog',
      'Shopping Cart & Checkout',
      'Payment Processing',
      'Order Management',
      'Customer Portal',
      'Analytics & Reporting'
    ]
  }
};

/**
 * AI Model configurations for different tasks
 */
export const AI_MODELS = {
  // For general proposal generation
  PROPOSAL_MODEL: {
    temperature: 0.7,
    max_tokens: 4000,
    top_p: 0.9,
    frequency_penalty: 0.3,
    presence_penalty: 0.3
  },

  // For technical content
  TECHNICAL_MODEL: {
    temperature: 0.5,
    max_tokens: 3000,
    top_p: 0.85,
    frequency_penalty: 0.2,
    presence_penalty: 0.2
  },

  // For creative content
  CREATIVE_MODEL: {
    temperature: 0.9,
    max_tokens: 3500,
    top_p: 0.95,
    frequency_penalty: 0.5,
    presence_penalty: 0.5
  },

  // For analysis tasks
  ANALYSIS_MODEL: {
    temperature: 0.3,
    max_tokens: 2000,
    top_p: 0.8,
    frequency_penalty: 0.1,
    presence_penalty: 0.1
  }
};

/**
 * Langflow connection settings
 */
export const LANGFLOW_SETTINGS = {
  // Default Langflow instance (can be local or cloud)
  DEFAULT_BASE_URL: process.env.LANGFLOW_BASE_URL || 'http://localhost:7860',
  
  // Timeout settings
  REQUEST_TIMEOUT: 30000, // 30 seconds
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache settings
  ENABLE_CACHE: true,
  CACHE_TTL: 3600, // 1 hour
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  
  // Streaming options
  ENABLE_STREAMING: false,
  
  // Debug mode
  DEBUG: process.env.NODE_ENV === 'development'
};

/**
 * Get the appropriate prompt template based on project type
 */
export function getPromptTemplate(projectType: string): any {
  const normalizedType = projectType.toLowerCase().replace(/\s+/g, '_');
  
  // Try to find exact match
  for (const [key, template] of Object.entries(PROPOSAL_TEMPLATES)) {
    if (key.toLowerCase() === normalizedType || 
        template.name.toLowerCase() === projectType.toLowerCase()) {
      return template;
    }
  }
  
  // Default to web development if no match
  return PROPOSAL_TEMPLATES.WEB_DEVELOPMENT;
}

/**
 * Get AI model configuration based on task type
 */
export function getModelConfig(taskType: 'proposal' | 'technical' | 'creative' | 'analysis') {
  switch (taskType) {
    case 'technical':
      return AI_MODELS.TECHNICAL_MODEL;
    case 'creative':
      return AI_MODELS.CREATIVE_MODEL;
    case 'analysis':
      return AI_MODELS.ANALYSIS_MODEL;
    case 'proposal':
    default:
      return AI_MODELS.PROPOSAL_MODEL;
  }
}