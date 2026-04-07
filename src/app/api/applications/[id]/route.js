import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCard, setSpendingControls } from '@/lib/services/lithic';

/**
 * PATCH /api/applications/[id] — Approve or decline an application (admin)
 */
export async function PATCH(request, { params }) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, declineReason, notes } = body;

    if (!['approve', 'decline'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Get the application
    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (action === 'approve') {
      // 1. Issue Lithic virtual card
      const card = await createCard({
        userId: application.user_id,
        creditLimit: application.approved_limit || 500,
      });

      // 2. Set spending controls (restrict to essential MCCs)
      const { data: allowedCats } = await supabase
        .from('allowed_categories')
        .select('mcc_code')
        .eq('enabled', true);

      if (card.token && !card.token.startsWith('tok_mock')) {
        const mccs = allowedCats?.map((c) => c.mcc_code) || [];
        await setSpendingControls(card.token, mccs);
      }

      // 3. Save card to database
      await supabase.from('cards').insert({
        user_id: application.user_id,
        application_id: application.id,
        lithic_card_token: card.token,
        last_four: card.lastFour,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        status: 'active',
        credit_limit: application.approved_limit || 500,
        apr: application.approved_apr || 22.99,
      });

      // 4. Create initial credit score record
      await supabase.from('credit_scores').insert({
        user_id: application.user_id,
        score: 600, // Starting score for new users
        previous_score: null,
        payment_history_pct: 100,
        utilization_ratio: 0,
        account_age_months: 0,
        on_time_payments: 0,
        missed_payments: 0,
        period_start: new Date().toISOString().split('T')[0],
        period_end: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      });

      // 5. Update application status
      await supabase
        .from('applications')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          notes,
        })
        .eq('id', id);

      return NextResponse.json({
        success: true,
        status: 'approved',
        card: { lastFour: card.lastFour, expMonth: card.expMonth, expYear: card.expYear },
        creditLimit: application.approved_limit || 500,
      });
    }

    if (action === 'decline') {
      await supabase
        .from('applications')
        .update({
          status: 'declined',
          decline_reason: declineReason,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          notes,
        })
        .eq('id', id);

      return NextResponse.json({ success: true, status: 'declined' });
    }
  } catch (err) {
    console.error('Application review error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
