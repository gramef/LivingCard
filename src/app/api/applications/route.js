import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateRiskScore, determineCreditLimit } from '@/lib/services/credit-score';

/**
 * POST /api/applications — Submit a new credit application
 * GET  /api/applications — List all applications (admin)
 */

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Calculate risk score
    const riskScore = calculateRiskScore({
      monthlyIncome: parseFloat(body.monthlyIncome) || 0,
      employmentStatus: body.employmentStatus,
      employmentDuration: body.employmentDuration,
      province: body.province,
    });

    // Determine credit limit
    const creditLimit = determineCreditLimit(riskScore, parseFloat(body.monthlyIncome) || 0);

    // Insert application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        first_name: body.firstName,
        last_name: body.lastName,
        date_of_birth: body.dateOfBirth || null,
        phone: body.phone,
        address: body.address,
        city: body.city,
        province: body.province,
        postal_code: body.postalCode,
        sin_last4: body.sinLast4,
        employment_status: body.employmentStatus,
        employer: body.employer,
        job_title: body.jobTitle,
        employment_duration: body.employmentDuration,
        monthly_income: parseFloat(body.monthlyIncome) || 0,
        income_source: body.incomeSource,
        pay_frequency: body.payFrequency,
        bank_name: body.bankName,
        risk_score: riskScore,
        approved_limit: creditLimit,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Application insert error:', error);
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }

    // Update profile with onboarding data
    await supabase
      .from('profiles')
      .update({
        first_name: body.firstName,
        last_name: body.lastName,
        phone: body.phone,
        date_of_birth: body.dateOfBirth || null,
        address: body.address,
        city: body.city,
        province: body.province,
        postal_code: body.postalCode,
        sin_last4: body.sinLast4,
        onboarding_completed: true,
      })
      .eq('id', user.id);

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        status: application.status,
        riskScore,
        creditLimit,
      },
    });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query;
    if (profile?.role === 'admin') {
      query = supabase.from('applications').select('*').order('created_at', { ascending: false });
    } else {
      query = supabase.from('applications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }

    return NextResponse.json({ applications: data });
  } catch (err) {
    console.error('Applications fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
