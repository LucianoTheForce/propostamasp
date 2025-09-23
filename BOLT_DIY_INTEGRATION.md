# Bolt.DIY Integration for AI Proposal Generator

## Overview

This project integrates the actual Bolt.DIY codebase from StackBlitz Labs to create an AI-powered proposal generation system. Instead of just being inspired by Bolt.DIY, we're using its actual components and architecture.

## What's Been Integrated

### From Bolt.DIY Repository
- **Chat System**: Full chat implementation with AI capabilities
- **Workbench**: Split-screen editor and preview system
- **WebContainer**: For live preview and code execution
- **Stores**: Nanostores-based state management
- **File System**: Virtual file system for proposal management

### Our Additions
- **Proposal Generation**: Natural language to proposal conversion
- **Database Integration**: Neon PostgreSQL for persistence
- **OpenAI Integration**: GPT-3.5 for intelligent generation
- **Export Features**: PDF export and markdown copy

## Architecture

```
/app
  /propostas-ai         # Bolt.DIY-powered AI interface
    page.tsx           # Main chat interface (from Bolt.DIY)
  /api
    /ai
      /chat            # OpenAI integration endpoint
    /propostas         # Database operations

/lib
  /stores              # Bolt.DIY stores
    chat.ts           # Chat state management
    files.ts          # File system management
    workbench.ts      # Workbench state (to be added)
  /proposals
    generator.ts      # Intelligent proposal generator

/bolt-diy-temp        # Cloned Bolt.DIY repository
  /app                # Original Bolt.DIY source
    /components       # UI components we're using
    /lib             # Libraries and utilities
```

## How It Works

1. **User Input**: Natural language description in chat interface
2. **AI Processing**: OpenAI extracts project details
3. **Proposal Generation**: Creates MDX content with components
4. **Live Preview**: Renders in Bolt.DIY's preview panel
5. **Export Options**: Save to database, export PDF, copy markdown

## Using the Actual Bolt.DIY Code

Instead of recreating Bolt.DIY features, we're using:
- `bolt-diy-temp/app/components/chat/Chat.client.tsx` - Chat interface
- `bolt-diy-temp/app/components/workbench/Workbench.client.tsx` - Workbench
- `bolt-diy-temp/app/lib/stores/workbench.ts` - State management
- `bolt-diy-temp/app/lib/webcontainer/index.ts` - WebContainer setup

## Features from Bolt.DIY

### Chat Features
- Streaming responses
- Message history
- API key management
- Model selection
- File attachments

### Workbench Features
- Code editor with syntax highlighting
- Live preview
- File tree navigation
- Diff view
- Terminal integration

### WebContainer Features
- Live code execution
- Hot module replacement
- Package installation
- Server processes

## Proposal-Specific Features

### Intelligent Generation
- Automatic complexity detection
- Budget estimation
- Timeline calculation
- Requirements extraction
- Technology stack selection

### Database Integration
- Save proposals to Neon
- Track views and analytics
- Template management
- Version history

## Usage

### Starting the System
```bash
npm run dev
```

### Access Points
- AI Interface: `http://localhost:3000/propostas-ai`
- Admin Dashboard: `http://localhost:3000/admin/propostas`
- Public Proposals: `http://localhost:3000/propostas/[slug]`

### Environment Variables
```env
OPENAI_API_KEY=your-key
NEON_DATABASE_URL=your-neon-url
```

## Next Steps

### Full Bolt.DIY Integration
1. **WebContainer Setup**: Enable live preview with code execution
2. **Editor Integration**: Use Bolt.DIY's CodeMirror editor
3. **File System**: Connect proposal files to WebContainer
4. **Terminal**: Add command execution for proposal tasks

### Proposal Enhancements
1. **Templates**: Use Bolt.DIY's template system
2. **Collaboration**: Multi-user editing
3. **Version Control**: Git integration
4. **Deployment**: Deploy proposals as websites

## Key Differences from Original Bolt.DIY

| Feature | Bolt.DIY | Our Integration |
|---------|----------|-----------------|
| Purpose | Code generation | Proposal generation |
| Output | Web applications | Business proposals |
| Storage | WebContainer | Neon + WebContainer |
| AI Focus | Code completion | Project analysis |

## Testing

### Test Natural Language Input
```
"Create an e-commerce platform for TechStore Inc with 
payment gateway, inventory management, and customer accounts. 
Budget around $50,000, timeline 3 months."
```

### Expected Output
- Structured proposal with all sections
- Automatic budget breakdown
- Timeline with milestones
- Technology recommendations
- Team composition

## Troubleshooting

### Common Issues
1. **WebContainer not loading**: Check COOP/COEP headers
2. **AI not responding**: Verify OpenAI API key
3. **Database errors**: Check Neon connection string
4. **Preview not updating**: Clear browser cache

## Contributing

To add more Bolt.DIY features:
1. Check `bolt-diy-temp/` for available components
2. Import and adapt to proposal context
3. Maintain Bolt.DIY's architecture patterns
4. Test with proposal-specific use cases

## License

This integration uses:
- Bolt.DIY (MIT License)
- Next.js (MIT License)
- OpenAI API (Commercial)
- Neon Database (Commercial)