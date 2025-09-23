import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, stage } = body;

    if (!id || !stage) {
      return NextResponse.json(
        { error: 'Proposal ID and stage are required', success: false },
        { status: 400 }
      );
    }

    // Validate stage
    const validStages = ['draft', 'review', 'sent', 'approved', 'signed'];
    if (!validStages.includes(stage)) {
      return NextResponse.json(
        { error: 'Invalid stage', success: false },
        { status: 400 }
      );
    }

    // Update the proposal stage
    const proposal = await db.updateProposal(id, { stage });

    if (!proposal) {
      return NextResponse.json(
        { error: 'Failed to update proposal stage', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      proposal,
      success: true,
      message: `Proposal moved to ${stage} stage`
    });
  } catch (error) {
    console.error('Error updating proposal stage:', error);
    return NextResponse.json(
      { error: 'Failed to update proposal stage', success: false },
      { status: 500 }
    );
  }
}