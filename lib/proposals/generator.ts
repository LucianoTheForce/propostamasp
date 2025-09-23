/**
 * Intelligent Proposal Generator
 * Automatically detects schema fields and generates structured MDX proposals
 */

import { Proposal, ProposalTemplate } from '@/lib/db/client';
import { langflow } from '@/lib/langflow/client';

// Database Schema Fields - Automatically detected from the Proposal interface
export const PROPOSAL_SCHEMA = {
  required: {
    slug: { type: 'string', description: 'URL-friendly identifier' },
    title: { type: 'string', description: 'Proposal title' },
    client: { type: 'string', description: 'Client name' }
  },
  optional: {
    status: { type: 'string', default: 'draft', options: ['draft', 'active', 'completed'] },
    stage: { type: 'string', default: 'draft', options: ['draft', 'review', 'sent', 'approved', 'signed'] },
    project_type: { type: 'string', default: 'Web Development' },
    amount_total: { type: 'number', default: 0 },
    currency: { type: 'string', default: 'BRL', options: ['BRL', 'USD', 'EUR'] },
    timeline: { type: 'string', default: '3 months' },
    content: { type: 'text', description: 'MDX content' },
    public_token: { type: 'string', description: 'Secret access token' },
    open_count: { type: 'number', default: 0 },
    archived: { type: 'boolean', default: false },
    last_edited_by: { type: 'string', default: 'Admin' }
  }
};

// Project complexity analyzer
export function analyzeProjectComplexity(requirements: string | string[], budget?: number): 'simple' | 'medium' | 'complex' {
  // Convert array to string if needed
  const reqString = Array.isArray(requirements) ? requirements.join(' ') : requirements;
  const wordCount = reqString.split(' ').length;
  const hasIntegrations = /integra|api|third-party|payment|auth/i.test(reqString);
  const hasAdvancedFeatures = /ai|machine learning|blockchain|real-time|3d|ar|vr/i.test(reqString);
  
  if (budget && budget > 100000) return 'complex';
  if (budget && budget < 20000) return 'simple';
  if (hasAdvancedFeatures) return 'complex';
  if (hasIntegrations || wordCount > 200) return 'medium';
  return 'simple';
}

// MDX Component Templates
export const MDX_COMPONENTS = {
  BudgetTable: (items: Array<{name: string, hours: number, rate: number}>) => {
    const rows = items.map(item => 
      `| ${item.name} | ${item.hours} | R$ ${item.rate}/hr | R$ ${(item.hours * item.rate).toLocaleString('pt-BR')} |`
    ).join('\n');
    
    const total = items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
    
    return `
<BudgetTable>

| Item | Hours | Rate | Total |
|------|-------|------|-------|
${rows}
| **Total** | **${items.reduce((sum, item) => sum + item.hours, 0)}** | | **R$ ${total.toLocaleString('pt-BR')}** |

</BudgetTable>`;
  },

  Timeline: (phases: Array<{name: string, duration: string, deliverables: string[]}>) => {
    const rows = phases.map(phase => 
      `| ${phase.name} | ${phase.duration} | ${phase.deliverables.join(', ')} |`
    ).join('\n');
    
    return `
<Timeline>

| Phase | Duration | Deliverables |
|-------|----------|--------------|
${rows}

</Timeline>`;
  },

  TeamSection: (members: Array<{role: string, name?: string, expertise: string[]}>) => {
    return `
<TeamSection>

## Team Composition

${members.map(member => `
### ${member.role}
${member.name ? `**${member.name}**` : ''}
- Expertise: ${member.expertise.join(', ')}
`).join('\n')}

</TeamSection>`;
  },

  TechStack: (technologies: {frontend?: string[], backend?: string[], database?: string[], infrastructure?: string[]}) => {
    return `
<TechStack>

## Technology Stack

${technologies.frontend ? `
### Frontend
- ${technologies.frontend.join('\n- ')}
` : ''}

${technologies.backend ? `
### Backend
- ${technologies.backend.join('\n- ')}
` : ''}

${technologies.database ? `
### Database
- ${technologies.database.join('\n- ')}
` : ''}

${technologies.infrastructure ? `
### Infrastructure
- ${technologies.infrastructure.join('\n- ')}
` : ''}

</TechStack>`;
  }
};

// Section Generators based on complexity
export const SECTION_GENERATORS = {
  simple: {
    sections: ['summary', 'scope', 'timeline', 'budget', 'terms'],
    generate: (data: ProposalData) => {
      return `
# ${data.title}

## Executive Summary

We are pleased to present this proposal for ${data.client}'s ${data.project_type} project. Our streamlined approach ensures efficient delivery within ${data.timeline}.

## Scope of Work

${data.requirements || 'To be defined based on client requirements'}

### Key Deliverables
- Fully functional ${data.project_type.toLowerCase()}
- Documentation and training
- Post-launch support

## Timeline

${MDX_COMPONENTS.Timeline([
  { name: 'Development', duration: data.timeline, deliverables: ['Complete solution', 'Testing'] },
  { name: 'Deployment', duration: '1 week', deliverables: ['Go-live', 'Training'] }
])}

## Budget

**Total Investment: ${data.currency} ${data.amount_total.toLocaleString('pt-BR')}**

Payment terms:
- 50% upon project initiation
- 50% upon completion

## Terms and Conditions

- Project timeline: ${data.timeline}
- Warranty: 30 days
- Support: Included for first month

---

*This proposal is valid for 30 days from ${new Date().toLocaleDateString('pt-BR')}*
`;
    }
  },

  medium: {
    sections: ['summary', 'objectives', 'scope', 'methodology', 'timeline', 'budget', 'team', 'terms'],
    generate: (data: ProposalData) => {
      return `
# ${data.title}

## Executive Summary

${data.client} requires a comprehensive ${data.project_type} solution. This proposal outlines our approach to delivering a robust, scalable system within ${data.timeline} and a budget of ${data.currency} ${data.amount_total.toLocaleString('pt-BR')}.

## Project Objectives

### Primary Goals
- Deliver a complete ${data.project_type} solution
- Ensure scalability and performance
- Provide comprehensive documentation and training

### Success Metrics
- System performance benchmarks
- User satisfaction scores
- Business KPI improvements

## Scope of Work

### Phase 1: Discovery & Planning (2 weeks)
- Requirements analysis
- Technical architecture design
- Project planning and resource allocation

### Phase 2: Development (${data.timeline})
${data.requirements ? `
Based on your requirements:
${data.requirements}
` : ''}

Core deliverables:
- Frontend development
- Backend API development
- Database design and implementation
- Third-party integrations
- Testing and QA

### Phase 3: Deployment & Optimization (2 weeks)
- Production deployment
- Performance optimization
- User training
- Documentation

## Methodology

We follow an Agile development approach with:
- 2-week sprints
- Regular client demos
- Continuous integration/deployment
- Comprehensive testing at each stage

## Timeline

${MDX_COMPONENTS.Timeline([
  { name: 'Discovery', duration: '2 weeks', deliverables: ['Requirements', 'Architecture', 'Project plan'] },
  { name: 'Sprint 1-2', duration: '4 weeks', deliverables: ['Core functionality', 'Basic UI'] },
  { name: 'Sprint 3-4', duration: '4 weeks', deliverables: ['Advanced features', 'Integrations'] },
  { name: 'Sprint 5-6', duration: '4 weeks', deliverables: ['Polish', 'Testing', 'Documentation'] },
  { name: 'Deployment', duration: '2 weeks', deliverables: ['Go-live', 'Training', 'Handover'] }
])}

## Investment Breakdown

${MDX_COMPONENTS.BudgetTable([
  { name: 'Discovery & Planning', hours: 80, rate: 250 },
  { name: 'Frontend Development', hours: 240, rate: 300 },
  { name: 'Backend Development', hours: 320, rate: 350 },
  { name: 'Testing & QA', hours: 120, rate: 200 },
  { name: 'Project Management', hours: 80, rate: 250 }
])}

### Payment Schedule
- 30% upon contract signing
- 30% at project midpoint
- 30% upon completion
- 10% after 30-day warranty period

## Team

${MDX_COMPONENTS.TeamSection([
  { role: 'Project Manager', expertise: ['Agile', 'Scrum', 'Risk Management'] },
  { role: 'Senior Full-Stack Developer', expertise: ['React', 'Node.js', 'PostgreSQL'] },
  { role: 'Frontend Developer', expertise: ['React', 'TypeScript', 'Tailwind CSS'] },
  { role: 'Backend Developer', expertise: ['Node.js', 'REST APIs', 'Microservices'] },
  { role: 'QA Engineer', expertise: ['Automated Testing', 'Performance Testing'] }
])}

## Terms and Conditions

### Warranty & Support
- 60-day warranty on all delivered code
- Bug fixes included during warranty period
- Monthly maintenance packages available

### Intellectual Property
- All custom code transfers to ${data.client} upon final payment
- Third-party licenses remain with respective owners

### Project Assumptions
- Timely feedback and approvals from client
- Access to necessary systems and resources
- Stable requirements after discovery phase

---

*Proposal prepared for ${data.client} on ${new Date().toLocaleDateString('pt-BR')}*
*Valid for 30 days*
`;
    }
  },

  complex: {
    sections: ['summary', 'background', 'objectives', 'scope', 'architecture', 'methodology', 'phases', 'budget', 'team', 'risks', 'terms'],
    generate: (data: ProposalData) => {
      return `
# ${data.title}

## Executive Summary

${data.client} is embarking on a transformative ${data.project_type} initiative. This comprehensive proposal outlines our strategy to deliver an enterprise-grade solution over ${data.timeline}, with a total investment of ${data.currency} ${data.amount_total.toLocaleString('pt-BR')}.

## Background & Context

### Current State Analysis
Understanding ${data.client}'s current technological landscape and business objectives is crucial for project success.

### Market Opportunity
The ${data.project_type} market is evolving rapidly, presenting opportunities for competitive advantage through innovation.

## Strategic Objectives

### Business Goals
1. Digital transformation and modernization
2. Improved operational efficiency
3. Enhanced customer experience
4. Scalability for future growth

### Technical Objectives
1. Cloud-native architecture
2. Microservices-based design
3. API-first approach
4. Real-time data processing
5. Advanced security implementation

## Comprehensive Scope

### Discovery Phase (4 weeks)
- Stakeholder interviews and workshops
- Current state assessment
- Gap analysis
- Technical architecture design
- Risk assessment
- Detailed project planning

### Development Phase (${data.timeline})

${data.requirements ? `
#### Requirements Implementation
${data.requirements}
` : ''}

#### Core Platform Development
- Microservices architecture implementation
- API gateway and service mesh
- Event-driven architecture
- Container orchestration (Kubernetes)

#### Frontend Applications
- Progressive Web Application (PWA)
- Native mobile applications (iOS/Android)
- Admin dashboard
- Analytics portal

#### Backend Services
- Core business logic services
- Authentication & authorization service
- Notification service
- Reporting service
- Integration services

#### Data Platform
- Data lake implementation
- Real-time streaming pipeline
- Analytics and BI integration
- Machine learning pipeline

### Integration Phase (4 weeks)
- Third-party system integrations
- Legacy system migration
- Data migration and validation
- Performance optimization

### Testing & Quality Assurance (6 weeks)
- Unit and integration testing
- Performance testing
- Security testing
- User acceptance testing
- Load testing

### Deployment & Go-Live (3 weeks)
- Production environment setup
- Phased rollout strategy
- User training programs
- Documentation delivery

## Technical Architecture

${MDX_COMPONENTS.TechStack({
  frontend: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  backend: ['Node.js', 'Express/Fastify', 'GraphQL', 'gRPC', 'Message Queue (RabbitMQ/Kafka)'],
  database: ['PostgreSQL', 'Redis', 'Elasticsearch', 'MongoDB'],
  infrastructure: ['AWS/Azure/GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions']
})}

### Security Architecture
- Zero-trust security model
- End-to-end encryption
- OAuth 2.0 / OIDC implementation
- API rate limiting and DDoS protection
- Regular security audits

## Agile Methodology

### Development Approach
- Scaled Agile Framework (SAFe)
- 2-week sprints
- Program Increments (PIs) every 10 weeks
- Continuous Integration/Continuous Deployment
- Test-Driven Development (TDD)

### Communication Framework
- Daily stand-ups
- Sprint reviews and retrospectives
- Weekly steering committee meetings
- Monthly executive briefings

## Detailed Timeline

${MDX_COMPONENTS.Timeline([
  { name: 'Discovery', duration: '4 weeks', deliverables: ['Requirements', 'Architecture', 'Risk Assessment'] },
  { name: 'Foundation', duration: '8 weeks', deliverables: ['Core Infrastructure', 'CI/CD Pipeline', 'Base Services'] },
  { name: 'Core Development', duration: '16 weeks', deliverables: ['Business Logic', 'APIs', 'Frontend Apps'] },
  { name: 'Advanced Features', duration: '12 weeks', deliverables: ['ML Integration', 'Analytics', 'Optimizations'] },
  { name: 'Integration', duration: '4 weeks', deliverables: ['System Integration', 'Data Migration'] },
  { name: 'Testing', duration: '6 weeks', deliverables: ['Complete Testing Suite', 'Performance Reports'] },
  { name: 'Deployment', duration: '3 weeks', deliverables: ['Production Launch', 'Training', 'Documentation'] }
])}

## Investment Details

### Development Costs

${MDX_COMPONENTS.BudgetTable([
  { name: 'Discovery & Architecture', hours: 320, rate: 350 },
  { name: 'Frontend Development', hours: 960, rate: 300 },
  { name: 'Backend Development', hours: 1280, rate: 350 },
  { name: 'DevOps & Infrastructure', hours: 640, rate: 400 },
  { name: 'Data Engineering', hours: 480, rate: 350 },
  { name: 'Testing & QA', hours: 640, rate: 250 },
  { name: 'Project Management', hours: 480, rate: 300 },
  { name: 'Technical Documentation', hours: 160, rate: 200 }
])}

### Additional Investments
- Cloud infrastructure (first year): R$ 120,000
- Third-party licenses: R$ 80,000
- Security audit: R$ 30,000
- Training programs: R$ 40,000

### Payment Milestones
1. 20% - Contract signing
2. 15% - Discovery completion
3. 20% - Foundation phase completion
4. 20% - Core development completion
5. 15% - Testing completion
6. 10% - 30 days post go-live

## Team Composition

${MDX_COMPONENTS.TeamSection([
  { role: 'Program Director', name: 'Senior Executive', expertise: ['Strategic Planning', 'Stakeholder Management'] },
  { role: 'Technical Architect', expertise: ['Cloud Architecture', 'Microservices', 'Security'] },
  { role: 'Project Manager (2)', expertise: ['SAFe', 'Risk Management', 'Agile'] },
  { role: 'Tech Lead', expertise: ['Full-Stack', 'Team Leadership', 'Code Review'] },
  { role: 'Senior Developers (6)', expertise: ['React', 'Node.js', 'Python', 'DevOps'] },
  { role: 'Data Engineers (2)', expertise: ['ETL', 'Big Data', 'ML Pipeline'] },
  { role: 'QA Lead', expertise: ['Test Automation', 'Performance Testing'] },
  { role: 'DevOps Engineers (2)', expertise: ['Kubernetes', 'CI/CD', 'Monitoring'] },
  { role: 'Security Specialist', expertise: ['Application Security', 'Compliance'] }
])}

## Risk Management

### Identified Risks & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| Scope Creep | Medium | High | Clear change management process |
| Technical Complexity | High | Medium | Proof of concepts, incremental delivery |
| Integration Challenges | Medium | Medium | Early integration testing |
| Resource Availability | Low | High | Resource buffer, backup team |
| Security Vulnerabilities | Low | Very High | Regular audits, security-first design |

### Contingency Planning
- 15% time buffer built into timeline
- 10% budget reserve for unforeseen challenges
- Escalation procedures defined
- Regular risk review meetings

## Terms and Conditions

### Service Level Agreement (SLA)
- 99.9% uptime guarantee post-launch
- 4-hour response time for critical issues
- 24-hour response for non-critical issues

### Warranty & Support
- 90-day comprehensive warranty
- Bug fixes included during warranty
- 24/7 support for first 30 days post-launch
- Ongoing maintenance packages available

### Intellectual Property
- All custom code and documentation transfers to ${data.client}
- Third-party licenses documented and transferred
- Source code repository access provided

### Legal Terms
- Governed by Brazilian law
- Dispute resolution through arbitration
- Confidentiality agreement in place
- Force majeure clauses included

### Success Criteria
- All defined functional requirements met
- Performance benchmarks achieved
- Security audit passed
- User acceptance testing completed
- Knowledge transfer completed

---

*This comprehensive proposal has been prepared exclusively for ${data.client}*
*Date: ${new Date().toLocaleDateString('pt-BR')}*
*Validity: 45 days*
*Confidential and Proprietary*
`;
    }
  }
};

// Main Proposal Generator Class
export class ProposalGenerator {
  private schemaFields: typeof PROPOSAL_SCHEMA;
  
  constructor() {
    this.schemaFields = PROPOSAL_SCHEMA;
  }

  /**
   * Generate a complete proposal with all required fields
   */
  async generateProposal(input: ProposalGeneratorInput): Promise<GeneratedProposal> {
    // Validate required fields
    this.validateRequiredFields(input);
    
    // Convert requirements array to string if needed
    const requirementsStr = Array.isArray(input.requirements)
      ? input.requirements.join('\n')
      : (input.requirements || '');
    
    // Determine complexity
    const complexity = input.complexity || analyzeProjectComplexity(
      requirementsStr,
      input.budget
    );
    
    // Auto-fill missing optional fields with defaults
    const data: ProposalData = {
      slug: this.generateSlug(input.client, input.projectType),
      title: input.title || `${input.projectType} Proposal for ${input.client}`,
      client: input.client,
      status: input.status || 'draft',
      stage: input.stage || 'draft',
      project_type: input.projectType,
      amount_total: input.budget || this.estimateBudget(complexity),
      currency: input.currency || 'BRL',
      timeline: input.timeline || this.estimateTimeline(complexity),
      requirements: requirementsStr,
      complexity
    };
    
    // Generate content based on complexity
    const generator = SECTION_GENERATORS[complexity];
    let content = generator.generate(data);
    
    // If AI is enabled, enhance the content
    if (input.useAI) {
      try {
        content = await langflow.enhanceProposal(content, 
          `Make it more specific for ${input.client} and ${input.projectType}`
        );
      } catch (error) {
        console.log('AI enhancement failed, using generated content');
      }
    }
    
    return {
      ...data,
      content,
      sections: generator.sections,
      metadata: {
        generatedAt: new Date(),
        complexity,
        wordCount: content.split(' ').length,
        estimatedReadTime: Math.ceil(content.split(' ').length / 200) + ' min'
      }
    };
  }

  /**
   * Validate that all required fields are present
   */
  private validateRequiredFields(input: ProposalGeneratorInput): void {
    const missing = [];
    
    if (!input.client) missing.push('client');
    if (!input.projectType) missing.push('projectType');
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }

  /**
   * Generate a URL-friendly slug
   */
  private generateSlug(client: string, projectType: string): string {
    const base = `${client}-${projectType}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `${base}-${Date.now()}`;
  }

  /**
   * Estimate budget based on complexity
   */
  private estimateBudget(complexity: 'simple' | 'medium' | 'complex'): number {
    const budgets = {
      simple: 15000,
      medium: 75000,
      complex: 350000
    };
    return budgets[complexity];
  }

  /**
   * Estimate timeline based on complexity
   */
  private estimateTimeline(complexity: 'simple' | 'medium' | 'complex'): string {
    const timelines = {
      simple: '4 weeks',
      medium: '3 months',
      complex: '6-9 months'
    };
    return timelines[complexity];
  }

  /**
   * Get all schema fields for reference
   */
  getSchemaFields(): typeof PROPOSAL_SCHEMA {
    return this.schemaFields;
  }

  /**
   * Generate proposal from template
   */
  async generateFromTemplate(
    template: ProposalTemplate,
    overrides: Partial<ProposalGeneratorInput>
  ): Promise<GeneratedProposal> {
    // Parse template to extract default values
    const templateData = this.parseTemplate(template.content);
    
    // Merge with overrides
    const input: ProposalGeneratorInput = {
      client: overrides.client || templateData.client || 'Client Name',
      projectType: overrides.projectType || templateData.projectType || 'Web Development',
      title: overrides.title || template.name,
      requirements: overrides.requirements || templateData.requirements,
      budget: overrides.budget || templateData.budget,
      timeline: overrides.timeline || templateData.timeline,
      complexity: overrides.complexity || templateData.complexity,
      useAI: overrides.useAI || false
    };
    
    return this.generateProposal(input);
  }

  /**
   * Parse template content to extract metadata
   */
  private parseTemplate(content: string): Partial<ProposalGeneratorInput> {
    const data: Partial<ProposalGeneratorInput> = {};
    
    // Extract budget from content
    const budgetMatch = content.match(/R\$\s*([\d,]+)/);
    if (budgetMatch) {
      data.budget = parseInt(budgetMatch[1].replace(/,/g, ''));
    }
    
    // Extract timeline
    const timelineMatch = content.match(/(\d+\s*(?:weeks?|months?))/i);
    if (timelineMatch) {
      data.timeline = timelineMatch[1];
    }
    
    // Determine complexity from content length and structure
    const sectionCount = (content.match(/^##/gm) || []).length;
    if (sectionCount > 10) {
      data.complexity = 'complex';
    } else if (sectionCount > 5) {
      data.complexity = 'medium';
    } else {
      data.complexity = 'simple';
    }
    
    return data;
  }
}

// Type definitions
export interface ProposalGeneratorInput {
  // Required fields
  client: string;
  projectType: string;
  
  // Optional fields
  title?: string;
  requirements?: string | string[];  // Can be string or array of strings
  budget?: number;
  timeline?: string;
  currency?: string;
  status?: string;
  stage?: 'draft' | 'review' | 'sent' | 'approved' | 'signed';
  complexity?: 'simple' | 'medium' | 'complex';
  useAI?: boolean;
}

export interface ProposalData extends ProposalGeneratorInput {
  slug: string;
  title: string;
  amount_total: number;
  currency: string;
  timeline: string;
  complexity: 'simple' | 'medium' | 'complex';
}

export interface GeneratedProposal extends ProposalData {
  content: string;
  sections: string[];
  metadata: {
    generatedAt: Date;
    complexity: string;
    wordCount: number;
    estimatedReadTime: string;
  };
}

// Export singleton instance
export const proposalGenerator = new ProposalGenerator();