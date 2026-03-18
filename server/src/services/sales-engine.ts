import { ConversationStage, ChatAction, ChatMessage } from '../types';

const ACTION_PATTERNS: { pattern: RegExp; type: ChatAction['type']; label: string }[] = [
  { pattern: /\[ACTION:book_demo\]/i, type: 'book_demo', label: 'Book a Counselling Call' },
  { pattern: /\[ACTION:capture_lead\]/i, type: 'capture_lead', label: 'Talk to Our Team' },
  { pattern: /\[ACTION:checkout\]/i, type: 'checkout', label: 'Enroll Now' },
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

  cleanMessage = cleanMessage.replace(/\s{2,}/g, ' ').trim();
  return { cleanMessage, actions };
}

export function determineStage(messages: ChatMessage[]): ConversationStage {
  const messageCount = messages.length;
  if (messageCount <= 1) return 'greeting';

  const recentMessages = messages.slice(-8);
  const recentText = recentMessages.map((m) => m.content.toLowerCase()).join(' ');
  const userMessages = messages.filter((m) => m.role === 'user');
  const userText = userMessages.map((m) => m.content.toLowerCase()).join(' ');

  // Post-sale signals
  if (
    recentText.includes('enroll') && recentText.includes('proceed') ||
    recentText.includes('payment') ||
    recentText.includes('joined') ||
    recentText.includes('onboarding')
  ) {
    return 'post_sale';
  }

  // Closing signals — user shows high intent
  if (
    userText.includes('how do i join') ||
    userText.includes('how to enroll') ||
    userText.includes('how to join') ||
    userText.includes('ready to start') ||
    userText.includes('i want to join') ||
    userText.includes('sign me up') ||
    userText.includes('let\'s do it') ||
    userText.includes('i\'m interested') ||
    userText.includes('want to enroll') ||
    userText.includes('registration') ||
    userText.includes('payment link')
  ) {
    return 'closing';
  }

  // Objection signals
  if (
    userText.includes('expensive') ||
    userText.includes('mehenga') ||
    userText.includes('costly') ||
    userText.includes('fee') ||
    userText.includes('price') ||
    userText.includes('guarantee') ||
    userText.includes('profit guarantee') ||
    userText.includes('tips') ||
    userText.includes('signals') ||
    userText.includes('no time') ||
    userText.includes('already bought') ||
    userText.includes('not sure') ||
    userText.includes('will this work') ||
    userText.includes('don\'t have capital') ||
    userText.includes('just exploring')
  ) {
    return 'objection_handling';
  }

  // Natural progression based on conversation depth
  if (messageCount <= 4) return 'discovery';
  if (messageCount <= 8) return 'pitch';
  return 'closing';
}

export function calculateLeadScore(messages: ChatMessage[]): number {
  let score = 0;
  const userMessages = messages.filter((m) => m.role === 'user');
  const text = userMessages.map((m) => m.content.toLowerCase()).join(' ');

  // Positive signals (from Document 6)
  // Already trading → +2
  if (text.includes('trading') || text.includes('trader') || text.includes('i trade')) score += 2;

  // Faced losses → +2
  if (text.includes('loss') || text.includes('lost money') || text.includes('negative')) score += 2;

  // Wants structured learning → +3
  if (
    text.includes('structured') ||
    text.includes('mentorship') ||
    text.includes('learn properly') ||
    text.includes('serious') ||
    text.includes('discipline') ||
    text.includes('improve')
  ) score += 3;

  // Asks thoughtful questions → +2
  if (
    text.includes('how does') ||
    text.includes('what is the approach') ||
    text.includes('how is this different') ||
    text.includes('what will i learn') ||
    text.includes('tell me more')
  ) score += 2;

  // Serious commitment signals → +2
  if (
    text.includes('want to join') ||
    text.includes('enroll') ||
    text.includes('ready') ||
    text.includes('invest in myself') ||
    text.includes('long term')
  ) score += 2;

  // Mentions consistency/discipline → +2
  if (text.includes('consistency') || text.includes('consistent') || text.includes('discipline')) score += 2;

  // Engagement depth bonus
  score += Math.min(userMessages.length, 5);

  // Negative signals (from Document 6)
  // Wants tips/signals → -3
  if (
    text.includes('tips') ||
    text.includes('signals') ||
    text.includes('best stock') ||
    text.includes('sure shot') ||
    text.includes('intraday tips')
  ) score -= 3;

  // Wants guarantee → -4
  if (text.includes('guarantee') || text.includes('guaranteed') || text.includes('sure profit')) score -= 4;

  // Only exploring casually → -2
  if (text.includes('just exploring') || text.includes('just looking') || text.includes('just browsing')) score -= 2;

  // Avoids questions → -1
  if (userMessages.length <= 2 && messages.length > 6) score -= 1;

  return Math.max(0, Math.min(100, score));
}
