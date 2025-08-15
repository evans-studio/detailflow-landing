import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (lazily)
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables. Please add SUPABASE_URL and SUPABASE_SERVICE_KEY to your environment.');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Get Supabase client and insert
    const supabase = getSupabaseClient();
    console.log('Attempting to insert email:', cleanEmail);
    
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: cleanEmail,
          source: 'landing_page',
          metadata: {
            user_agent: request.headers.get('user-agent'),
            referrer: request.headers.get('referer'),
            ip: request.headers.get('x-forwarded-for'),
            timestamp: new Date().toISOString()
          }
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate email (unique constraint violation)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on our waitlist! We\'ll notify you when we launch.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Waitlist signup successful:', cleanEmail);

    // Get current waitlist count for position estimation
    let position = 150; // fallback
    try {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      position = count || 150;
    } catch (countError) {
      console.log('Could not get waitlist count:', countError);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist!',
        email: cleanEmail,
        position: position
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting waitlist count:', error);
      return NextResponse.json(
        { error: 'Failed to get waitlist count' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        count: count || 0,
        message: `${count || 0} people on the waitlist`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist count API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}