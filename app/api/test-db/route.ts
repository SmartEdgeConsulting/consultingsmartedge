// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/database'; 
import { subscribers } from '@/lib/database/schema'; 

export async function GET() {
  try {
    // Try to query the database
    const result = await db.select().from(subscribers).limit(1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection working!',
      count: result.length 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}