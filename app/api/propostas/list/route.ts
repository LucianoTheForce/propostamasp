import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeArchived = searchParams.get('includeArchived') === 'true';
    
    const proposals = await db.getProposals(includeArchived);
    
    return NextResponse.json({ 
      proposals,
      success: true 
    });
  } catch (error) {
    console.error('Error listing proposals:', error);
    return NextResponse.json(
      { error: 'Failed to list proposals', success: false },
      { status: 500 }
    );
  }
}