import { NextResponse } from 'next/server';

export async function GET() {
  // Return a simple health check without requiring OpenAI
  return NextResponse.json({ 
    status: 'ok',
    message: 'AI features disabled for deployment',
    timestamp: new Date().toISOString()
  });
}