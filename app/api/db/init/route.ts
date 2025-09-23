import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  console.warn('DATABASE_URL not configured');
  return 'postgresql://placeholder:placeholder@localhost/placeholder';
};

const sql = neon(getDatabaseUrl());

export async function GET() {
  try {
    // Create proposals table
    await sql`
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
        public_token VARCHAR(255),
        open_count INTEGER DEFAULT 0,
        archived BOOLEAN DEFAULT FALSE,
        last_edited_by VARCHAR(255) DEFAULT 'Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    
    // Create proposal_templates table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_templates (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(50) DEFAULT 'web',
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    
    // Create proposal_views table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_views (
        id SERIAL PRIMARY KEY,
        proposal_id INTEGER REFERENCES proposals(id) ON DELETE CASCADE,
        ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_hash VARCHAR(255),
        user_agent TEXT
      )`;
    
    // Create proposal_links_history table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_links_history (
        id SERIAL PRIMARY KEY,
        proposal_id INTEGER REFERENCES proposals(id) ON DELETE CASCADE,
        old_slug VARCHAR(255),
        new_slug VARCHAR(255),
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_proposals_slug ON proposals(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_proposals_client ON proposals(client)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_proposals_stage ON proposals(stage)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_proposals_archived ON proposals(archived)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_views_proposal_id ON proposal_views(proposal_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_links_old_slug ON proposal_links_history(old_slug)`;
    
    // Insert default template
    await sql`
      INSERT INTO proposal_templates (slug, name, description, category, content) 
      VALUES (
        'theforce-base',
        'THE FORCE Base Template',
        'Default proposal template for THE FORCE projects',
        'web',
        '# Proposal for {{CLIENT}}

## Executive Summary

We are pleased to present this proposal for {{CLIENT}}''s {{PROJECT_TYPE}} project.

## Scope of Work

{{SCOPE}}

## Timeline

The project will be completed in {{TIMELINE}}.

## Budget

Total investment: {{CURRENCY}} {{AMOUNT}}

## Next Steps

1. Review and approve this proposal
2. Sign the contract
3. Initial payment (50%)
4. Project kickoff

## Terms & Conditions

- Payment: 50% upfront, 50% on delivery
- Validity: 30 days from presentation date
- Additional revisions beyond scope will be charged separately

---

THE FORCE | Creating the Future
'
      ) ON CONFLICT (slug) DO NOTHING`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      tables: ['proposals', 'proposal_templates', 'proposal_views', 'proposal_links_history']
    });
    
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Database initialization failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}