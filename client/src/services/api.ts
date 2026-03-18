import { ChatResponse, LeadData } from '../types';

const API_BASE = '/api';

export async function sendMessage(
  message: string,
  conversationId?: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationId }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function submitLead(lead: LeadData): Promise<{ success: boolean; leadId: string }> {
  const response = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed: ${response.statusText}`);
  }

  return response.json();
}

export async function bookDemo(data: {
  name: string;
  email: string;
  preferredDate?: string;
  conversationId?: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/actions/book-demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Demo booking failed: ${response.statusText}`);
  }

  return response.json();
}

export async function startCheckout(data: {
  plan?: string;
  email?: string;
  conversationId?: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/actions/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Checkout failed: ${response.statusText}`);
  }

  return response.json();
}
