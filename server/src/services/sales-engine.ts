import { ConversationStage, ChatAction, ChatMessage } from '../types';

const ACTION_PATTERNS: { pattern: RegExp; type: ChatAction['type']; label: string }[] = [
  { pattern: /\[ACTION:book_demo\]/i, type: 'book_demo', label: 'Book a Demo' },
  { pattern: /\[ACTION:capture_lead\]/i, type: 'capture_lead', label: 'Share My Info' },
  { pattern: /\[ACTION:checkout\]/i, type: 'checkout', label: 'Get Started' },
];

export function parseActions(aiResponse: string): { cleanMessage: string; actions: ChatAction[] } {
  let cleanMessage = aiResponse;
  const actions: ChatAction[] = [];

  for (const { pattern, type, label } of ACTION_PATTERNS) {
    if (pattern.test(cleanMessage)) {
      actions.push({ type, label });
      cleanMessage = cleanMessage.replace(pattern, '').trim();
    }
  }

  // Clean up any double spaces or trailing whitespace from removed markers
  cleanMessage = cleanMessage.replace(/\s{2,}/g, ' ').trim();

  return { cleanMessage, actions };
}

export function determineStage(messages: ChatMessage[]): ConversationStage {
  const messageCount = messages.length;

  if (messageCount <= 1) return 'greeting';

  // Analyze recent messages for stage signals
  const recentMessages = messages.slice(-6);
  const recentText = recentMessages.map((m) => m.content.toLowerCase()).join(' ');

  // Check for post-sale signals
  if (
    recentText.includes('thank you for purchasing') ||
    recentText.includes('welcome aboard') ||
    recentText.includes('your order')
  ) {
    return 'post_sale';
  }

  // Check for closing signals
  if (
    recentText.includes('ready to start') ||
    recentText.includes('sign up') ||
    recentText.includes('how do i buy') ||
    recentText.includes('what are the next steps') ||
    recentText.includes('i want to try') ||
    recentText.includes("let's do it") ||
    recentText.includes('i\'m interested')
  ) {
    return 'closing';
  }

  // Check for objection signals
  if (
    recentText.includes('too expensive') ||
    recentText.includes('not sure') ||
    recentText.includes('competitor') ||
    recentText.includes('concern') ||
    recentText.includes('worried') ||
    recentText.includes('but what about') ||
    recentText.includes('don\'t know if') ||
    recentText.includes('need to think')
  ) {
    return 'objection_handling';
  }

  // Progress naturally through stages based on conversation length
  if (messageCount <= 4) return 'discovery';
  if (messageCount <= 8) return 'pitch';
  return 'closing';
}

export function calculateLeadScore(messages: ChatMessage[]): number {
  let score = 0;
  const text = messages.map((m) => m.content.toLowerCase()).join(' ');

  // Engagement signals
  score += Math.min(messages.filter((m) => m.role === 'user').length * 5, 25);

  // Intent signals
  if (text.includes('pricing') || text.includes('cost') || text.includes('price')) score += 15;
  if (text.includes('demo') || text.includes('trial')) score += 20;
  if (text.includes('buy') || text.includes('purchase') || text.includes('subscribe')) score += 30;
  if (text.includes('when') || text.includes('timeline') || text.includes('urgent')) score += 10;
  if (text.includes('team') || text.includes('company') || text.includes('organization')) score += 10;

  // Negative signals
  if (text.includes('just browsing') || text.includes('just looking')) score -= 10;
  if (text.includes('no thanks') || text.includes('not interested')) score -= 20;

  return Math.max(0, Math.min(100, score));
}
