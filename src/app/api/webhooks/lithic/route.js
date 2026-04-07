import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/webhooks/lithic — Handle Lithic transaction webhooks
 * 
 * Lithic sends webhooks for:
 * - Authorization (pending transaction)
 * - Clearing (completed transaction)
 * - Void (cancelled authorization)
 * 
 * In production, verify webhook signature with HMAC.
 */
export async function POST(request) {
  try {
    // TODO: Verify HMAC signature in production
    // const signature = request.headers.get('x-lithic-hmac');
    
    const body = await request.json();
    const { event_type, payload } = body;

    const supabase = await createClient();

    switch (event_type) {
      case 'transaction.authorization': {
        const txn = payload;

        // Check if MCC is allowed (our spending controls)
        const { data: allowedCat } = await supabase
          .from('allowed_categories')
          .select('name, category')
          .eq('mcc_code', txn.merchant?.mcc || '')
          .eq('enabled', true)
          .single();

        // Find the card
        const { data: card } = await supabase
          .from('cards')
          .select('id, user_id, current_balance, credit_limit')
          .eq('lithic_card_token', txn.card_token)
          .single();

        if (!card) {
          return NextResponse.json({ result: 'DECLINE', reason: 'Card not found' });
        }

        // Check spending controls
        if (!allowedCat) {
          return NextResponse.json({ result: 'DECLINE', reason: 'Merchant category not allowed' });
        }

        // Check available credit
        const txnAmount = txn.amount / 100; // Lithic sends cents
        if (card.current_balance + txnAmount > card.credit_limit) {
          return NextResponse.json({ result: 'DECLINE', reason: 'Insufficient credit' });
        }

        // Record pending transaction
        await supabase.from('transactions').insert({
          card_id: card.id,
          user_id: card.user_id,
          lithic_transaction_token: txn.token,
          type: 'purchase',
          status: 'pending',
          amount: -txnAmount,
          merchant_name: txn.merchant?.descriptor || 'Unknown Merchant',
          merchant_category: allowedCat.category,
          mcc_code: txn.merchant?.mcc,
        });

        // Update card balance
        await supabase
          .from('cards')
          .update({ current_balance: card.current_balance + txnAmount })
          .eq('id', card.id);

        return NextResponse.json({ result: 'APPROVE' });
      }

      case 'transaction.clearing': {
        const txn = payload;

        // Update transaction status to completed
        await supabase
          .from('transactions')
          .update({ status: 'completed' })
          .eq('lithic_transaction_token', txn.token);

        return NextResponse.json({ result: 'OK' });
      }

      case 'transaction.void': {
        const txn = payload;

        // Reverse the transaction
        const { data: existingTxn } = await supabase
          .from('transactions')
          .select('amount, card_id')
          .eq('lithic_transaction_token', txn.token)
          .single();

        if (existingTxn) {
          // Restore balance
          const { data: card } = await supabase
            .from('cards')
            .select('current_balance')
            .eq('id', existingTxn.card_id)
            .single();

          if (card) {
            await supabase
              .from('cards')
              .update({
                current_balance: Math.max(0, card.current_balance + existingTxn.amount),
              })
              .eq('id', existingTxn.card_id);
          }

          await supabase
            .from('transactions')
            .update({ status: 'refunded' })
            .eq('lithic_transaction_token', txn.token);
        }

        return NextResponse.json({ result: 'OK' });
      }

      default:
        return NextResponse.json({ result: 'ignored', event_type });
    }
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
