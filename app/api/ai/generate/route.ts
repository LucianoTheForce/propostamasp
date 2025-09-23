import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    message: "AI generation functionality is currently disabled",
    success: false
  }, { status: 503 })
}

export async function GET() {
  return NextResponse.json({
    message: "AI generation functionality is currently disabled",
    success: false
  }, { status: 503 })
}