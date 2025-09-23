import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, archived } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Proposal ID is required', success: false },
        { status: 400 }
      );
    }

    const success = await db.archiveProposal(id, archived);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to archive proposal', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: archived ? 'Proposal archived' : 'Proposal unarchived'
    });
  } catch (error) {
    console.error('Error archiving proposal:', error);
    return NextResponse.json(
      { error: 'Failed to archive proposal', success: false },
      { status: 500 }
    );
  }
}