import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, slug: newSlug } = body;

    if (!id || !newSlug) {
      return NextResponse.json(
        { error: 'Proposal ID and new slug are required', success: false },
        { status: 400 }
      );
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(newSlug)) {
      return NextResponse.json(
        { error: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only', success: false },
        { status: 400 }
      );
    }

    // Check if new slug already exists
    const existing = await db.getProposalBySlug(newSlug);
    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: 'Slug already exists', success: false },
        { status: 409 }
      );
    }

    // Get current proposal
    const proposals = await db.getProposals(true);
    const currentProposal = proposals.find(p => p.id === id);
    
    if (!currentProposal) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      );
    }

    // Add to link history if slug is changing
    if (currentProposal.slug !== newSlug) {
      await db.addLinkHistory(id, currentProposal.slug, newSlug);
    }

    // Update the proposal with new slug
    const proposal = await db.updateProposal(id, { slug: newSlug });

    if (!proposal) {
      return NextResponse.json(
        { error: 'Failed to rename proposal', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      proposal,
      success: true,
      message: 'Proposal renamed successfully'
    });
  } catch (error) {
    console.error('Error renaming proposal:', error);
    return NextResponse.json(
      { error: 'Failed to rename proposal', success: false },
      { status: 500 }
    );
  }
}