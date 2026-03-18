export type MessageRole = 'user' | 'assistant';

export type ConversationStage =
  | 'greeting'
  | 'discovery'
  | 'pitch'
  | 'objection_handling'
  | 'closing'
  | 'post_sale';

export type ActionType = 'book_demo' | 'capture_lead' | 'checkout' | 'link';

export interface ChatAction {
  type: ActionType;
  label: string;
  data?: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  actions?: ChatAction[];
  timestamp: number;
}

export interface ChatResponse {
  message: string;
  actions: ChatAction[];
  conversationId: string;
  stage: ConversationStage;
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
  conversationId?: string;
}
