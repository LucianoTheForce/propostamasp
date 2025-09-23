import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Proposal slug is required', success: false },
        { status: 400 }
      );
    }

    // Get the original proposal
    const original = await db.getProposalBySlug(slug);
    
    if (!original) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      );
    }

    // Generate new slug
    const baseSlug = `${original.slug}-copy`;
    let newSlug = baseSlug;
    let counter = 1;
    while (await db.getProposalBySlug(newSlug)) {
      newSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create duplicate
    const duplicate = await db.createProposal({
      slug: newSlug,
      title: `${original.title} (Copy)`,
      client: original.client,
      status: 'draft',
      stage: 'draft',
      project_type: original.project_type || 'Web Development',
      amount_total: original.amount_total || 0,
      currency: original.currency || 'BRL',
      timeline: original.timeline || '3 months',
      content: original.content || '',
      open_count: 0,
      archived: false,
      last_edited_by: 'Admin'
    });

    if (!duplicate) {
      throw new Error('Failed to duplicate proposal');
    }

    return NextResponse.json({ 
      proposal: duplicate,
      success: true 
    });
  } catch (error) {
    console.error('Error duplicating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to duplicate proposal', success: false },
      { status: 500 }
    );
  }
}