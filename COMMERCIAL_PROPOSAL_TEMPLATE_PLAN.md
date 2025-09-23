# Commercial Proposal Template System for Bolt.DIY

## Overview
Transform the Swoosh Banana Nike proposal into a reusable template system within Bolt.DIY, allowing users to generate professional commercial proposals through natural language prompts.

## Core Concept
Users can say: "Create a commercial proposal for [Client] about [Service]" and Bolt.DIY will generate a complete proposal maintaining the exact design quality and structure of the Swoosh Banana example.

## Template Structure

### 1. **Hero Section**
- Interactive 3D logo (Three.js/React Three Fiber)
- Company branding (THE FORCE style)
- Animated title with letter-by-letter animation
- Parallax scrolling effects
- Custom cursor effects
- Magnetic hover interactions

### 2. **Manifesto/About Section**
- Dynamic rotating text (5+ variations)
- Company credentials
- Client list showcase
- Professional typography
- Grid-based layout

### 3. **Project Scope**
- Visual cards with icons
- Animated reveal on scroll
- Categorized services/deliverables
- Technical specifications
- Timeline visualization

### 4. **Budget Section**
- Interactive budget breakdown
- Visual charts/tables
- Payment terms
- Currency formatting
- Animated number counters

### 5. **Deliverables**
- Phased approach presentation
- Timeline with milestones
- Visual progress indicators
- Numbered sections with descriptions

### 6. **Terms & Conditions**
- Professional legal layout
- Structured information
- Contact details
- Approval mechanisms
- WhatsApp integration

## Design System

### Colors
- Primary: Black/White (high contrast)
- Accent: Customizable per client
- Backgrounds: Gradient overlays, blur effects
- Text: White on dark, black on light

### Typography
- Headers: Sans-serif, bold, large scale
- Body: Clean, readable, professional
- Animations: Letter spacing, fade-in, slide-up

### Animations
- Framer Motion for smooth transitions
- GSAP for scroll-triggered animations
- Three.js for 3D elements
- Custom cursor tracking
- Magnetic hover effects

## User Input Parameters

### Required:
- Client name
- Project/service type
- Budget amount
- Timeline

### Optional:
- Company details
- Team members
- Case studies
- Custom branding colors
- Language (EN/PT)
- Industry-specific content

## Implementation Approach

### Phase 1: Prompt Engineering
Create enhanced `proposal-prompts-enhanced.ts` with:
- Complete HTML/React structure
- All animation specifications
- Component definitions
- Styling instructions

### Phase 2: Template Components
Build reusable React components:
- `ProposalHero.tsx`
- `ProposalSection.tsx`
- `BudgetVisualizer.tsx`
- `DeliverableTimeline.tsx`
- `DynamicTextRotator.tsx`

### Phase 3: Data Structure
Define TypeScript interfaces:
- `ProposalConfig`
- `SectionContent`
- `BudgetBreakdown`
- `AnimationSettings`

### Phase 4: Integration
- Connect to Bolt.DIY chat interface
- Parse user prompts
- Generate complete proposals
- Maintain design consistency

## Example Prompts

### Software Development
"Create a commercial proposal for TechStartup Inc about mobile app development with a budget of $75,000 and 4-month timeline. Include user research, design, development, and testing phases."

### Marketing Campaign
"Generate a proposal for Fashion Brand X for social media marketing services, $30,000 budget, 6-month campaign with influencer partnerships and content creation."

### Consulting Services
"Build a business transformation proposal for Enterprise Corp, focusing on digital transformation, process optimization, and team training. Budget: $150,000, Timeline: 8 months."

## Success Criteria

1. **Visual Fidelity**: Matches Swoosh Banana quality
2. **Customization**: Easy to adapt for different clients
3. **Professional Output**: Ready for client presentation
4. **Animation Quality**: Smooth, sophisticated interactions
5. **Responsiveness**: Works on all devices
6. **Generation Speed**: Complete proposal in one response

## Technical Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js, React Three Fiber
- **Typography**: Custom fonts
- **Icons**: Lucide React
- **Language**: TypeScript

## File Structure

```
bolt-diy-temp/
├── app/lib/common/prompts/
│   ├── proposal-prompts-enhanced.ts    # Main prompt template
│   └── proposal-templates.ts           # Template variations
├── app/components/proposals/
│   ├── ProposalHero.tsx               # Hero section component
│   ├── ProposalSection.tsx            # Reusable section
│   ├── BudgetVisualizer.tsx           # Budget component
│   └── DeliverableTimeline.tsx        # Timeline component
└── app/lib/proposal-system/
    ├── types.ts                        # TypeScript interfaces
    ├── generator.ts                    # Proposal generator
    └── examples.ts                     # Example configurations
```

## Next Steps

1. Create enhanced prompt file with complete template
2. Build component library specification
3. Design data structure for customization
4. Create example prompts for testing
5. Document usage instructions
6. Test with various inputs
7. Refine based on output quality

## Customization Options

Users can customize:
- **Content**: All text, numbers, dates
- **Sections**: Add/remove as needed
- **Visuals**: Colors, logos, images
- **Language**: Multi-language support
- **Industry**: Specific terminology
- **Complexity**: Simple to comprehensive

While maintaining:
- Professional layout structure
- Animation quality
- Typography hierarchy
- Visual polish
- Brand consistency