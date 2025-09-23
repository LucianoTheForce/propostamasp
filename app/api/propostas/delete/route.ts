import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Proposal ID is required', success: false },
        { status: 400 }
      );
    }

    const success = await db.deleteProposal(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete proposal', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Proposal deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    return NextResponse.json(
      { error: 'Failed to delete proposal', success: false },
      { status: 500 }
    );
  }
}