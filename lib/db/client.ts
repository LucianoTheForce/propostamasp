import { neon } from '@neondatabase/serverless';

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Return a placeholder for development
  console.warn('DATABASE_URL not configured - using placeholder');
  return 'postgresql://placeholder:placeholder@localhost/placeholder';
};

const sql = neon(getDatabaseUrl());

export interface Proposal {
  id?: number;
  slug: string;
  title: string;
  client: string;
  status?: string;
  stage?: 'draft' | 'review' | 'sent' | 'approved' | 'signed';
  project_type?: string;
  amount_total?: number;
  currency?: string;
  timeline?: string;
  content?: string;
  public_token?: string;
  open_count?: number;
  archived?: boolean;
  last_edited_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProposalTemplate {
  id?: number;
  slug: string;
  name: string;
  description?: string;
  category?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProposalView {
  id?: number;
  proposal_id: number;
  ts?: Date;
  ip_hash?: string;
  user_agent?: string;
}

export const db = {
  // Proposals CRUD
  async getProposals(includeArchived = false): Promise<Proposal[]> {
    try {
      const result = includeArchived
        ? await sql`SELECT * FROM proposals ORDER BY updated_at DESC`
        : await sql`SELECT * FROM proposals WHERE archived = false ORDER BY updated_at DESC`;
      return result as Proposal[];
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return [];
    }
  },

  async getProposalBySlug(slug: string): Promise<Proposal | null> {
    try {
      const result = await sql`SELECT * FROM proposals WHERE slug = ${slug}`;
      return result[0] as Proposal || null;
    } catch (error) {
      console.error('Error fetching proposal:', error);
      return null;
    }
  },

  async getProposalByToken(token: string): Promise<Proposal | null> {
    try {
      const result = await sql`SELECT * FROM proposals WHERE public_token = ${token}`;
      return result[0] as Proposal || null;
    } catch (error) {
      console.error('Error fetching proposal by token:', error);
      return null;
    }
  },

  async createProposal(proposal: Omit<Proposal, 'id' | 'created_at' | 'updated_at'>): Promise<Proposal | null> {
    try {
      const {
        slug, title, client, status = 'draft', stage = 'draft',
        project_type = 'Web Development', amount_total = 0,
        currency = 'BRL', timeline = '3 months', content = '',
        public_token = null, open_count = 0, archived = false,
        last_edited_by = 'Admin'
      } = proposal;

      const result = await sql`
        INSERT INTO proposals (
          slug, title, client, status, stage, project_type,
          amount_total, currency, timeline, content, public_token,
          open_count, archived, last_edited_by
        ) VALUES (${slug}, ${title}, ${client}, ${status}, ${stage}, ${project_type},
          ${amount_total}, ${currency}, ${timeline}, ${content}, ${public_token},
          ${open_count}, ${archived}, ${last_edited_by})
        RETURNING *`;
      return result[0] as Proposal;
    } catch (error) {
      console.error('Error creating proposal:', error);
      return null;
    }
  },

  async updateProposal(id: number, updates: Partial<Proposal>): Promise<Proposal | null> {
    try {
      // Build update fields dynamically
      const updateFields = Object.entries(updates)
        .filter(([key]) => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
        .map(([key, value], index) => ({ key, value, param: `$${index + 1}` }));

      if (updateFields.length === 0) return null;

      // Create parameterized query
      const setClause = updateFields.map(f => `${f.key} = ${f.param}`).join(', ');
      const query = `UPDATE proposals SET ${setClause} WHERE id = $${updateFields.length + 1} RETURNING *`;
      const values = [...updateFields.map(f => f.value), id];
      
      // Use sql.query for dynamic queries with parameters
      const result = await sql.query(query, values);
      return result.rows?.[0] as Proposal || null;
    } catch (error) {
      console.error('Error updating proposal:', error);
      return null;
    }
  },

  async deleteProposal(id: number): Promise<boolean> {
    try {
      await sql`DELETE FROM proposals WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error('Error deleting proposal:', error);
      return false;
    }
  },

  async archiveProposal(id: number, archived = true): Promise<boolean> {
    try {
      await sql`UPDATE proposals SET archived = ${archived} WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error('Error archiving proposal:', error);
      return false;
    }
  },

  // Templates CRUD
  async getTemplates(): Promise<ProposalTemplate[]> {
    try {
      const result = await sql`SELECT * FROM proposal_templates ORDER BY name`;
      return result as ProposalTemplate[];
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  },

  async getTemplateBySlug(slug: string): Promise<ProposalTemplate | null> {
    try {
      const result = await sql`SELECT * FROM proposal_templates WHERE slug = ${slug}`;
      return result[0] as ProposalTemplate || null;
    } catch (error) {
      console.error('Error fetching template:', error);
      return null;
    }
  },

  async createTemplate(template: Omit<ProposalTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ProposalTemplate | null> {
    try {
      const { slug, name, description = '', category = 'web', content } = template;
      const result = await sql`
        INSERT INTO proposal_templates (slug, name, description, category, content)
        VALUES (${slug}, ${name}, ${description}, ${category}, ${content})
        RETURNING *`;
      return result[0] as ProposalTemplate;
    } catch (error) {
      console.error('Error creating template:', error);
      return null;
    }
  },

  async updateTemplate(id: number, updates: Partial<ProposalTemplate>): Promise<ProposalTemplate | null> {
    try {
      // Build update fields dynamically
      const updateFields = Object.entries(updates)
        .filter(([key]) => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
        .map(([key, value], index) => ({ key, value, param: `$${index + 1}` }));

      if (updateFields.length === 0) return null;

      // Create parameterized query
      const setClause = updateFields.map(f => `${f.key} = ${f.param}`).join(', ');
      const query = `UPDATE proposal_templates SET ${setClause} WHERE id = $${updateFields.length + 1} RETURNING *`;
      const values = [...updateFields.map(f => f.value), id];
      
      // Use sql.query for dynamic queries with parameters
      const result = await sql.query(query, values);
      return result.rows?.[0] as ProposalTemplate || null;
    } catch (error) {
      console.error('Error updating template:', error);
      return null;
    }
  },

  async deleteTemplate(id: number): Promise<boolean> {
    try {
      await sql`DELETE FROM proposal_templates WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      return false;
    }
  },

  // View tracking
  async trackView(proposalId: number, ipHash: string, userAgent: string): Promise<boolean> {
    try {
      // Check if already viewed recently (30 min window)
      const recentView = await sql`
        SELECT id FROM proposal_views
        WHERE proposal_id = ${proposalId} AND ip_hash = ${ipHash}
        AND ts > NOW() - INTERVAL '30 minutes'`;

      if (recentView.length === 0) {
        // Record new view
        await sql`
          INSERT INTO proposal_views (proposal_id, ip_hash, user_agent)
          VALUES (${proposalId}, ${ipHash}, ${userAgent})`;

        // Increment view count
        await sql`
          UPDATE proposals SET open_count = open_count + 1
          WHERE id = ${proposalId}`;
      }

      return true;
    } catch (error) {
      console.error('Error tracking view:', error);
      return false;
    }
  },

  async getViewStats(proposalId: number): Promise<any> {
    try {
      const views = await sql`
        SELECT COUNT(*) as total_views,
        COUNT(DISTINCT ip_hash) as unique_views,
        MIN(ts) as first_view,
        MAX(ts) as last_view
        FROM proposal_views WHERE proposal_id = ${proposalId}`;
      return views[0];
    } catch (error) {
      console.error('Error getting view stats:', error);
      return null;
    }
  },

  // Utility functions
  async initDatabase(): Promise<boolean> {
    try {
      // Read and execute schema
      const fs = await import('fs/promises');
      const path = await import('path');
      const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');
      const schema = await fs.readFile(schemaPath, 'utf-8');
      
      // Execute schema statements using sql.query for raw SQL
      const statements = schema.split(';').filter(s => s.trim());
      for (const statement of statements) {
        if (statement.trim()) {
          await sql.query(statement);
        }
      }
      
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      return false;
    }
  },

  async checkConnection(): Promise<boolean> {
    try {
      await sql`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  },

  // Link history for slug changes
  async addLinkHistory(proposalId: number, oldSlug: string, newSlug: string): Promise<boolean> {
    try {
      await sql`
        INSERT INTO proposal_links_history (proposal_id, old_slug, new_slug)
        VALUES (${proposalId}, ${oldSlug}, ${newSlug})`;
      return true;
    } catch (error) {
      console.error('Error adding link history:', error);
      return false;
    }
  },

  async findRedirect(oldSlug: string): Promise<string | null> {
    try {
      const result = await sql`
        SELECT p.slug FROM proposal_links_history h
        JOIN proposals p ON h.proposal_id = p.id
        WHERE h.old_slug = ${oldSlug}
        ORDER BY h.changed_at DESC LIMIT 1`;
      return result[0]?.slug || null;
    } catch (error) {
      console.error('Error finding redirect:', error);
      return null;
    }
  }
};