import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function GET() {
  try {
    // Get all proposals for statistics
    const proposals = await db.getProposals(true); // Include archived
    
    // Calculate statistics
    const total = proposals.length;
    const by_stage: Record<string, number> = {
      draft: 0,
      review: 0,
      sent: 0,
      approved: 0,
      signed: 0,
    };
    
    let total_value = 0;
    let signed_value = 0;
    
    proposals.forEach((proposal) => {
      const stage = proposal.stage || 'draft';
      by_stage[stage] = (by_stage[stage] || 0) + 1;
      total_value += proposal.amount_total || 0;
      
      if (stage === 'signed') {
        signed_value += proposal.amount_total || 0;
      }
    });
    
    // Calculate conversion rate
    const conversion_rate = total > 0 
      ? ((by_stage.signed || 0) / total) * 100 
      : 0;
    
    return NextResponse.json({
      total,
      by_stage,
      total_value,
      signed_value,
      conversion_rate,
      active_deals: (by_stage.sent || 0) + (by_stage.review || 0),
      success: true
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    return NextResponse.json(
      { error: 'Failed to get statistics', success: false },
      { status: 500 }
    );
  }
}