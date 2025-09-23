import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Proposal ID is required', success: false },
        { status: 400 }
      );
    }

    // Update the proposal
    const proposal = await db.updateProposal(id, updates);

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found or update failed', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      proposal,
      success: true 
    });
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to update proposal', success: false },
      { status: 500 }
    );
  }
}