# Langflow Integration Guide

## Overview

This guide covers the integration of Langflow with your Proposals System for AI-powered proposal generation, enhancement, and analysis.

## What is Langflow?

Langflow is a visual interface for building and deploying AI workflows using Large Language Models (LLMs). It provides:
- Visual workflow builder
- Multiple LLM support (OpenAI, Anthropic, Google, etc.)
- API endpoints for workflow execution
- Real-time streaming capabilities
- Custom component creation

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Next.js App    │────▶│ Langflow API │────▶│  LLM APIs   │
│  (Frontend)     │     │   (7860)     │     │  (OpenAI)   │
└─────────────────┘     └──────────────┘     └─────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐     ┌──────────────┐
│  Neon Database  │     │   Langflow   │
│   (Proposals)   │     │   Workflows  │
└─────────────────┘     └──────────────┘
```

## Installation

### 1. Install Langflow

#### Option A: Local Installation
```bash
# Install Langflow using pip
pip install langflow

# Or using pipx (recommended)
pipx install langflow

# Start Langflow
langflow run --host 0.0.0.0 --port 7860
```

#### Option B: Docker Installation
```bash
# Pull and run Langflow Docker image
docker run -d \
  --name langflow \
  -p 7860:7860 \
  -e LANGFLOW_DATABASE_URL=sqlite:////app/langflow.db \
  -v langflow_data:/app \
  langflow/langflow:latest
```

#### Option C: Cloud Deployment (Recommended for Production)
- Deploy on [Langflow Cloud](https://www.langflow.org/)
- Deploy on Railway: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/langflow)
- Deploy on Render: Use the Langflow Docker image

### 2. Configure Environment Variables

Add to your `.env.local`:
```env
# Langflow Configuration
LANGFLOW_BASE_URL=http://localhost:7860  # Or your cloud URL
LANGFLOW_API_KEY=your-api-key-here       # Optional for local
LANGFLOW_FLOW_ID=proposal-generator      # Your flow ID
```

### 3. Create Langflow Workflows

Access Langflow UI at `http://localhost:7860` and create these workflows:

#### Proposal Generator Flow
1. **Input Component**: Text input for requirements
2. **Prompt Template**: Format proposal structure
3. **LLM Component**: OpenAI GPT-4 or Claude
4. **Output Component**: Formatted markdown

Example Flow Configuration:
```json
{
  "nodes": [
    {
      "id": "input",
      "type": "TextInput",
      "data": {
        "variables": ["client", "project_type", "requirements"]
      }
    },
    {
      "id": "prompt",
      "type": "PromptTemplate",
      "data": {
        "template": "Generate a proposal for {client}..."
      }
    },
    {
      "id": "llm",
      "type": "OpenAI",
      "data": {
        "model": "gpt-4",
        "temperature": 0.7
      }
    },
    {
      "id": "output",
      "type": "TextOutput"
    }
  ]
}
```

## API Endpoints

### 1. Generate Proposal
```typescript
POST /api/ai/generate
{
  "client": "Company Name",
  "projectType": "Web Development",
  "requirements": "Build an e-commerce platform",
  "budget": 50000,
  "timeline": "3 months",
  "language": "pt",
  "autoSave": true
}
```

### 2. Enhance Content
```typescript
POST /api/ai/enhance
{
  "proposalId": 123,
  "instructions": "Make it more technical",
  "autoUpdate": true
}
```

### 3. Analyze Proposal
```typescript
POST /api/ai/analyze
{
  "proposalId": 123
}

// Response
{
  "score": 85,
  "suggestions": ["Add more details about timeline"],
  "strengths": ["Clear scope", "Good structure"],
  "weaknesses": ["Missing risk mitigation"]
}
```

### 4. Health Check
```typescript
GET /api/ai/health

// Response
{
  "connected": true,
  "flows": 5,
  "status": "healthy"
}
```

## Dashboard Features

### AI Generation Dialog
The dashboard includes an AI-powered proposal generator with:
- Template selection
- Requirements input
- Budget and timeline configuration
- Language selection (Portuguese/English)
- Auto-save option

### AI Enhancement
Each proposal can be enhanced with AI:
- Professional tone adjustment
- Technical details addition
- Content expansion/reduction
- Grammar and style improvements

### AI Analysis
Proposals are analyzed for:
- Completeness score (0-100)
- Improvement suggestions
- Strengths and weaknesses
- Competitive positioning

## Langflow Workflow Examples

### 1. Basic Proposal Generator
```python
# Langflow Custom Component
from langflow import CustomComponent
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

class ProposalGenerator(CustomComponent):
    def build(self, client: str, project_type: str, requirements: str):
        template = """
        Create a professional business proposal for:
        Client: {client}
        Project Type: {project_type}
        Requirements: {requirements}
        
        Include executive summary, scope, timeline, and budget.
        """
        
        prompt = PromptTemplate(
            template=template,
            input_variables=["client", "project_type", "requirements"]
        )
        
        llm = OpenAI(temperature=0.7)
        
        return llm(prompt.format(
            client=client,
            project_type=project_type,
            requirements=requirements
        ))
```

### 2. Content Enhancer
```python
class ContentEnhancer(CustomComponent):
    def build(self, content: str, style: str = "professional"):
        styles = {
            "professional": "formal and business-oriented",
            "technical": "detailed and technology-focused",
            "creative": "engaging and innovative"
        }
        
        prompt = f"""
        Enhance the following content to be more {styles.get(style, 'professional')}:
        
        {content}
        
        Maintain the core message while improving clarity and impact.
        """
        
        llm = OpenAI(temperature=0.5)
        return llm(prompt)
```

## Testing

### 1. Test Langflow Connection
```bash
curl http://localhost:7860/health
```

### 2. Test API Integration
```bash
# Check health
curl http://localhost:3000/api/ai/health

# Generate proposal
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "client": "Test Company",
    "projectType": "Web Development",
    "requirements": "Build a landing page"
  }'
```

### 3. Test from Dashboard
1. Navigate to `/admin/propostas`
2. Click "Generate with AI" button
3. Fill in the form
4. Review generated content
5. Save or modify as needed

## Production Deployment

### 1. Langflow Cloud Setup
```bash
# Deploy to Langflow Cloud
langflow deploy --name "proposal-generator"

# Get API endpoint
langflow endpoints list
```

### 2. Update Environment Variables
```env
LANGFLOW_BASE_URL=https://api.langflow.org/your-instance
LANGFLOW_API_KEY=your-production-api-key
LANGFLOW_FLOW_ID=prod-proposal-generator
```

### 3. Security Considerations
- Use API keys for authentication
- Implement rate limiting
- Add request validation
- Monitor usage and costs
- Use HTTPS for all connections

## Cost Optimization

### 1. Caching Strategy
- Cache generated proposals for similar requests
- Store enhanced content for reuse
- Cache analysis results for 24 hours

### 2. Model Selection
- Use GPT-3.5 for drafts
- Use GPT-4 for final versions
- Use embeddings for similarity matching

### 3. Batch Processing
- Group similar requests
- Process during off-peak hours
- Use queue system for large volumes

## Troubleshooting

### Common Issues

#### 1. Langflow Connection Failed
```typescript
// Check if Langflow is running
const checkConnection = async () => {
  try {
    const response = await fetch('http://localhost:7860/health');
    return response.ok;
  } catch (error) {
    console.error('Langflow not accessible');
    return false;
  }
};
```

#### 2. Slow Generation
- Reduce max_tokens in model config
- Use streaming for real-time feedback
- Implement timeout handling

#### 3. Poor Quality Output
- Adjust temperature (0.7-0.9 for creative, 0.3-0.5 for factual)
- Improve prompt templates
- Add examples to prompts

## Monitoring

### 1. Track Usage
```sql
-- Create usage tracking table
CREATE TABLE ai_usage (
  id SERIAL PRIMARY KEY,
  endpoint VARCHAR(50),
  tokens_used INTEGER,
  cost DECIMAL(10, 4),
  response_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Dashboard Metrics
- Total AI generations per day
- Average response time
- Success/failure rate
- Cost per proposal

## Advanced Features

### 1. Multi-language Support
```typescript
const generateMultilingual = async (input: any) => {
  const languages = ['en', 'pt', 'es'];
  const results = await Promise.all(
    languages.map(lang => 
      langflow.generateProposal({ ...input, language: lang })
    )
  );
  return results;
};
```

### 2. Template Learning
```typescript
const learnFromApproved = async () => {
  // Get approved proposals
  const approved = await db.getProposals()
    .filter(p => p.stage === 'signed');
  
  // Extract patterns
  const patterns = extractPatterns(approved);
  
  // Update templates
  await updateTemplates(patterns);
};
```

### 3. Competitive Analysis
```typescript
const analyzeCompetitive = async (proposal: string) => {
  const analysis = await langflow.runFlow({
    input_text: proposal,
    task: 'competitive_analysis',
    compare_with: 'industry_standards'
  });
  
  return {
    positioning: analysis.positioning,
    differentiators: analysis.differentiators,
    pricing_analysis: analysis.pricing
  };
};
```

## Resources

- [Langflow Documentation](https://docs.langflow.org/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [LangChain Documentation](https://docs.langchain.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## Support

For issues or questions:
1. Check Langflow logs: `langflow logs`
2. Review API responses in browser DevTools
3. Check Next.js console for errors
4. Verify environment variables are set

## License

This integration is part of your Proposals System and follows the same license terms.