import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateCardState } from '@/lib/services/lithic';

/**
 * POST /api/cards/lock — Lock or unlock a card
 */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId, action } = await request.json();

    if (!['lock', 'unlock'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action — use "lock" or "unlock"' }, { status: 400 });
    }

    // Get the card and verify ownership
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .eq('user_id', user.id)
      .single();

    if (cardError || !card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    const newState = action === 'lock' ? 'PAUSED' : 'OPEN';
    const newStatus = action === 'lock' ? 'locked' : 'active';

    // Update Lithic card state
    if (card.lithic_card_token) {
      await updateCardState(card.lithic_card_token, newState);
    }

    // Update local database
    await supabase
      .from('cards')
      .update({ status: newStatus })
      .eq('id', cardId);

    return NextResponse.json({
      success: true,
      status: newStatus,
    });
  } catch (err) {
    console.error('Card lock error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
