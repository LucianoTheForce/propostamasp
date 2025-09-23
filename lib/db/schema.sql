-- Proposals table with content
CREATE TABLE IF NOT EXISTS proposals (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  stage VARCHAR(50) DEFAULT 'draft',
  project_type VARCHAR(100) DEFAULT 'Web Development',
  amount_total DECIMAL(12, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'BRL',
  timeline VARCHAR(100) DEFAULT '3 months',
  content TEXT,
  public_token VARCHAR(255) UNIQUE,
  open_count INTEGER DEFAULT 0,
  archived BOOLEAN DEFAULT FALSE,
  last_edited_by VARCHAR(100) DEFAULT 'Admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_proposals_slug ON proposals(slug);
CREATE INDEX IF NOT EXISTS idx_proposals_stage ON proposals(stage);
CREATE INDEX IF NOT EXISTS idx_proposals_archived ON proposals(archived);
CREATE INDEX IF NOT EXISTS idx_proposals_client ON proposals(client);

-- Proposal templates table
CREATE TABLE IF NOT EXISTS proposal_templates (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'web',
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for templates
CREATE INDEX IF NOT EXISTS idx_templates_slug ON proposal_templates(slug);
CREATE INDEX IF NOT EXISTS idx_templates_category ON proposal_templates(category);

-- Proposal views tracking table
CREATE TABLE IF NOT EXISTS proposal_views (
  id SERIAL PRIMARY KEY,
  proposal_id INTEGER REFERENCES proposals(id) ON DELETE CASCADE,
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_hash VARCHAR(64),
  user_agent TEXT
);

-- Create indexes for views
CREATE INDEX IF NOT EXISTS idx_views_proposal_id ON proposal_views(proposal_id);
CREATE INDEX IF NOT EXISTS idx_views_ts ON proposal_views(ts);
CREATE INDEX IF NOT EXISTS idx_views_ip_hash ON proposal_views(ip_hash);

-- Proposal links history table (for slug renames)
CREATE TABLE IF NOT EXISTS proposal_links_history (
  id SERIAL PRIMARY KEY,
  proposal_id INTEGER REFERENCES proposals(id) ON DELETE CASCADE,
  old_slug VARCHAR(255),
  new_slug VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for redirect lookups
CREATE INDEX IF NOT EXISTS idx_links_old_slug ON proposal_links_history(old_slug);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for proposals
CREATE OR REPLACE TRIGGER update_proposals_updated_at 
BEFORE UPDATE ON proposals 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically update updated_at for templates
CREATE OR REPLACE TRIGGER update_templates_updated_at 
BEFORE UPDATE ON proposal_templates 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Insert default template
INSERT INTO proposal_templates (slug, name, description, category, content) VALUES 
('theforce-base', 'TheForce - Base Template', 'Template padrão para propostas de desenvolvimento web', 'web', 
'# Executive Summary

This proposal outlines our approach to delivering a comprehensive web development solution that meets your business objectives and technical requirements.

## Scope of Work

### Phase 1: Discovery & Planning
- Requirements gathering and analysis
- Technical architecture design
- Project timeline development
- Stakeholder interviews

### Phase 2: Development
- Core functionality implementation
- Frontend development with modern frameworks
- Backend API development
- Database design and implementation
- Third-party integrations
- Testing and quality assurance

### Phase 3: Deployment & Support
- Production environment setup
- Deployment and configuration
- Performance optimization
- Training and documentation
- Post-launch support

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Discovery & Planning | 2 weeks | Requirements document, Technical specifications, Project plan |
| Development | 8 weeks | Working application, Test reports, Documentation |
| Deployment & Support | 1 week | Production deployment, Training materials |

**Total project duration: 11 weeks**

## Budget

### Development Costs

| Item | Hours | Rate | Total |
|------|-------|------|-------|
| Backend Development | 160 | R$ 350/hr | R$ 56,000 |
| Frontend Development | 120 | R$ 300/hr | R$ 36,000 |
| Database Design | 40 | R$ 300/hr | R$ 12,000 |
| Testing & QA | 80 | R$ 250/hr | R$ 20,000 |
| Project Management | 40 | R$ 250/hr | R$ 10,000 |
| **Subtotal** | **440** | | **R$ 134,000** |

### Additional Costs
- Infrastructure setup: R$ 5,000
- Third-party licenses: R$ 3,000
- Training & documentation: R$ 8,000
- **Subtotal**: R$ 16,000

**Grand Total: R$ 150,000**

## Terms and Conditions

### Payment Terms
- 30% upon project initiation
- 40% upon completion of development phase
- 30% upon final delivery and approval

### Project Assumptions
- Client will provide timely feedback and approvals
- Access to necessary systems and resources will be provided
- Changes to scope will be handled through change requests
- Regular communication channels will be maintained

### Warranty & Support
- 90-day warranty on delivered code
- Bug fixes included during warranty period
- Monthly maintenance packages available
- 24/7 critical issue support

### Intellectual Property
- All custom code developed will be owned by the client
- Third-party libraries remain under their respective licenses
- Documentation and training materials included

## Next Steps

1. Review and approve this proposal
2. Sign the service agreement
3. Schedule kick-off meeting
4. Begin discovery phase

---

*This proposal is valid for 30 days from the date of issue. We look forward to partnering with you on this exciting project.*')
ON CONFLICT (slug) DO NOTHING;