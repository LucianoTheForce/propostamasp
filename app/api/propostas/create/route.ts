import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, client, templateSlug } = body;

    if (!title || !client) {
      return NextResponse.json(
        { error: 'Title and client are required', success: false },
        { status: 400 }
      );
    }

    // Generate slug from title
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Check if slug exists and make it unique
    let slug = baseSlug;
    let counter = 1;
    while (await db.getProposalBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Get template content if specified
    let content = '';
    if (templateSlug) {
      const template = await db.getTemplateBySlug(templateSlug);
      if (template) {
        content = template.content;
      }
    }

    // Create the proposal
    const proposal = await db.createProposal({
      slug,
      title,
      client,
      content,
      status: 'draft',
      stage: 'draft',
      project_type: 'Web Development',
      amount_total: 0,
      currency: 'BRL',
      timeline: '3 months',
      open_count: 0,
      archived: false,
      last_edited_by: 'Admin'
    });

    if (!proposal) {
      throw new Error('Failed to create proposal');
    }

    return NextResponse.json({ 
      proposal,
      success: true 
    });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to create proposal', success: false },
      { status: 500 }
    );
  }
}