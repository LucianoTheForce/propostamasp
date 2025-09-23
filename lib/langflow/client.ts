/**
 * Langflow Client for AI-powered proposal generation
 * Connects to Langflow API for workflow execution
 */

interface LangflowConfig {
  baseUrl: string;
  apiKey?: string;
  flowId: string;
}

interface LangflowResponse {
  output: any;
  session_id?: string;
  errors?: string[];
}

interface ProposalGenerationInput {
  client: string;
  projectType: string;
  requirements?: string;
  budget?: number;
  timeline?: string;
  template?: string;
  language?: 'en' | 'pt';
}

export class LangflowClient {
  private config: LangflowConfig;

  constructor(config: Partial<LangflowConfig> = {}) {
    this.config = {
      baseUrl: config.baseUrl || process.env.LANGFLOW_BASE_URL || 'http://localhost:7860',
      apiKey: config.apiKey || process.env.LANGFLOW_API_KEY,
      flowId: config.flowId || process.env.LANGFLOW_FLOW_ID || 'proposal-generator'
    };
  }

  /**
   * Execute a Langflow workflow
   */
  async runFlow(inputs: Record<string, any>, tweaks?: Record<string, any>): Promise<LangflowResponse> {
    try {
      const url = `${this.config.baseUrl}/api/v1/run/${this.config.flowId}`;
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs,
          tweaks: tweaks || {},
          stream: false
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Langflow API error: ${response.status} - ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error running Langflow:', error);
      throw error;
    }
  }

  /**
   * Generate a proposal using AI
   */
  async generateProposal(input: ProposalGenerationInput): Promise<string> {
    try {
      // Build the prompt for proposal generation
      const prompt = this.buildProposalPrompt(input);
      
      // Execute the flow with the prompt
      const response = await this.runFlow({
        input_text: prompt,
        client_name: input.client,
        project_type: input.projectType,
        budget: input.budget?.toString() || 'To be determined',
        timeline: input.timeline || '3 months',
      });

      // Extract the generated content
      if (response.output && response.output.message) {
        return response.output.message;
      } else if (response.output && typeof response.output === 'string') {
        return response.output;
      } else {
        throw new Error('Invalid response from Langflow');
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
      // Fallback to a basic template if AI generation fails
      return this.getFallbackProposal(input);
    }
  }

  /**
   * Enhance existing proposal content with AI
   */
  async enhanceProposal(content: string, instructions?: string): Promise<string> {
    try {
      const prompt = `
        Please enhance and improve the following proposal content.
        ${instructions ? `Instructions: ${instructions}` : ''}
        
        Current content:
        ${content}
        
        Please provide an enhanced version that is more professional, compelling, and comprehensive.
      `;

      const response = await this.runFlow({
        input_text: prompt,
        task: 'enhance',
        content: content
      });

      if (response.output && response.output.message) {
        return response.output.message;
      } else if (response.output && typeof response.output === 'string') {
        return response.output;
      } else {
        return content; // Return original if enhancement fails
      }
    } catch (error) {
      console.error('Error enhancing proposal:', error);
      return content; // Return original content on error
    }
  }

  /**
   * Analyze proposal for improvements
   */
  async analyzeProposal(content: string): Promise<{
    score: number;
    suggestions: string[];
    strengths: string[];
    weaknesses: string[];
  }> {
    try {
      const prompt = `
        Analyze the following business proposal and provide:
        1. A score from 0-100
        2. List of suggestions for improvement
        3. List of strengths
        4. List of weaknesses
        
        Proposal content:
        ${content}
        
        Format the response as JSON.
      `;

      const response = await this.runFlow({
        input_text: prompt,
        task: 'analyze',
        content: content
      });

      // Parse the response
      let analysis;
      if (typeof response.output === 'string') {
        try {
          analysis = JSON.parse(response.output);
        } catch {
          // If not JSON, create a basic analysis
          analysis = {
            score: 75,
            suggestions: ['Consider adding more specific deliverables', 'Include client testimonials'],
            strengths: ['Clear structure', 'Professional tone'],
            weaknesses: ['Could be more specific about timeline', 'Missing risk mitigation section']
          };
        }
      } else {
        analysis = response.output;
      }

      return analysis;
    } catch (error) {
      console.error('Error analyzing proposal:', error);
      // Return default analysis on error
      return {
        score: 70,
        suggestions: ['Review for completeness', 'Add more details'],
        strengths: ['Structure is clear'],
        weaknesses: ['Could be enhanced with AI']
      };
    }
  }

  /**
   * Build a comprehensive prompt for proposal generation
   */
  private buildProposalPrompt(input: ProposalGenerationInput): string {
    const lang = input.language === 'pt' ? 'Portuguese' : 'English';
    
    return `
      Generate a professional business proposal in ${lang} with the following details:
      
      Client: ${input.client}
      Project Type: ${input.projectType}
      ${input.requirements ? `Requirements: ${input.requirements}` : ''}
      ${input.budget ? `Budget: R$ ${input.budget.toLocaleString('pt-BR')}` : ''}
      ${input.timeline ? `Timeline: ${input.timeline}` : ''}
      ${input.template ? `Base it on this style: ${input.template}` : ''}
      
      The proposal should include:
      1. Executive Summary
      2. Project Scope and Objectives
      3. Methodology and Approach
      4. Timeline and Milestones
      5. Budget Breakdown
      6. Team and Resources
      7. Success Metrics
      8. Terms and Conditions
      9. Next Steps
      
      Make it professional, compelling, and tailored to the client's needs.
      Use markdown formatting for better structure.
    `;
  }

  /**
   * Fallback proposal template when AI is unavailable
   */
  private getFallbackProposal(input: ProposalGenerationInput): string {
    return `
# Proposal for ${input.client}

## Executive Summary

We are pleased to present this proposal for your ${input.projectType} project. Our team is committed to delivering exceptional results that align with your business objectives.

## Project Overview

**Client:** ${input.client}  
**Project Type:** ${input.projectType}  
**Timeline:** ${input.timeline || '3 months'}  
**Budget:** ${input.budget ? `R$ ${input.budget.toLocaleString('pt-BR')}` : 'To be determined'}

## Scope of Work

### Phase 1: Discovery & Planning
- Requirements gathering and analysis
- Technical architecture design
- Project timeline development

### Phase 2: Development
- Core functionality implementation
- Testing and quality assurance
- Regular progress updates

### Phase 3: Deployment & Support
- Production deployment
- Training and documentation
- Post-launch support

## Why Choose Us

- Proven track record of successful projects
- Expert team with deep technical knowledge
- Commitment to quality and timely delivery
- Transparent communication throughout the project

## Next Steps

1. Review and approve this proposal
2. Sign the service agreement
3. Schedule kick-off meeting
4. Begin project execution

We look forward to partnering with you on this exciting project.

---

*This proposal is valid for 30 days from the date of issue.*
    `;
  }

  /**
   * Check if Langflow is available
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/health`, {
        method: 'GET',
        headers: this.config.apiKey ? {
          'Authorization': `Bearer ${this.config.apiKey}`
        } : {},
      });
      
      return response.ok;
    } catch (error) {
      console.error('Langflow connection check failed:', error);
      return false;
    }
  }

  /**
   * Get available flows from Langflow
   */
  async getAvailableFlows(): Promise<any[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/flows`, {
        method: 'GET',
        headers: this.config.apiKey ? {
          'Authorization': `Bearer ${this.config.apiKey}`
        } : {},
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flows');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching flows:', error);
      return [];
    }
  }
}

// Export a default instance
export const langflow = new LangflowClient();