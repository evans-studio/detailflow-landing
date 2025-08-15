import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    console.log('Testing Supabase connection...');
    console.log('SUPABASE_URL exists:', !!supabaseUrl);
    console.log('SUPABASE_SERVICE_KEY exists:', !!supabaseServiceKey);

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { 
          error: 'Missing Supabase environment variables',
          hasUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseServiceKey
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Test connection by checking the waitlist table
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Supabase connection successful!',
        waitlistCount: count || 0,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}