/**
 * Lithic Card Issuing Service
 * Handles virtual card creation, management, and transaction controls.
 * Docs: https://docs.lithic.com
 */

const LITHIC_API_URL = process.env.LITHIC_API_URL || 'https://sandbox.lithic.com/v1';
const LITHIC_API_KEY = process.env.LITHIC_API_KEY;

async function lithicRequest(endpoint, options = {}) {
  if (!LITHIC_API_KEY) {
    console.warn('[Lithic] API key not configured — using mock responses');
    return mockLithicResponse(endpoint, options);
  }

  const response = await fetch(`${LITHIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `api-key ${LITHIC_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Lithic API error: ${response.status} — ${error.message || 'Unknown error'}`);
  }

  return response.json();
}

/**
 * Create a virtual card for an approved applicant
 */
export async function createCard({ userId, creditLimit = 500, type = 'VIRTUAL' }) {
  const data = await lithicRequest('/cards', {
    method: 'POST',
    body: JSON.stringify({
      type,
      memo: `LivingCard - User ${userId}`,
      spend_limit: Math.round(creditLimit * 100), // Lithic uses cents
      spend_limit_duration: 'MONTHLY',
      state: 'OPEN',
      product_id: process.env.LITHIC_PRODUCT_ID,
    }),
  });

  return {
    token: data.token,
    lastFour: data.last_four,
    expMonth: data.exp_month,
    expYear: data.exp_year,
    pan: data.pan,
    cvv: data.cvv,
    state: data.state,
  };
}

/**
 * Lock/Unlock a card
 */
export async function updateCardState(cardToken, state) {
  return lithicRequest(`/cards/${cardToken}`, {
    method: 'PATCH',
    body: JSON.stringify({ state }), // 'OPEN', 'PAUSED', 'CLOSED'
  });
}

/**
 * Get card details
 */
export async function getCard(cardToken) {
  return lithicRequest(`/cards/${cardToken}`);
}

/**
 * Set spending controls (MCC restrictions)
 */
export async function setSpendingControls(cardToken, allowedMCCs) {
  return lithicRequest(`/auth_rules`, {
    method: 'POST',
    body: JSON.stringify({
      card_tokens: [cardToken],
      allowed_mcc: allowedMCCs,
      type: 'CARD_LEVEL',
    }),
  });
}

/**
 * List transactions for a card
 */
export async function listTransactions(cardToken, { page = 1, pageSize = 25 } = {}) {
  return lithicRequest(`/transactions?card_token=${cardToken}&page=${page}&page_size=${pageSize}`);
}

// ===== MOCK RESPONSES (when Lithic API key not set) =====
function mockLithicResponse(endpoint, options) {
  const method = options.method || 'GET';

  if (endpoint === '/cards' && method === 'POST') {
    const lastFour = String(Math.floor(1000 + Math.random() * 9000));
    return {
      token: `tok_mock_${Date.now()}`,
      last_four: lastFour,
      exp_month: 9,
      exp_year: 2028,
      pan: `4000000000${lastFour}`,
      cvv: String(Math.floor(100 + Math.random() * 900)),
      state: 'OPEN',
      type: 'VIRTUAL',
    };
  }

  if (endpoint.startsWith('/cards/') && method === 'PATCH') {
    const body = JSON.parse(options.body);
    return { state: body.state, token: endpoint.split('/')[2] };
  }

  if (endpoint.startsWith('/cards/') && method === 'GET') {
    return {
      token: endpoint.split('/')[2],
      last_four: '4821',
      state: 'OPEN',
      spend_limit: 50000,
    };
  }

  if (endpoint === '/auth_rules' && method === 'POST') {
    return { token: `rule_mock_${Date.now()}`, state: 'ACTIVE' };
  }

  if (endpoint.startsWith('/transactions')) {
    return { data: [], has_more: false };
  }

  return {};
}
