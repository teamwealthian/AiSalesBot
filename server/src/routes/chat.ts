import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getAIProvider } from '../services/ai/provider';
import { buildSystemPrompt } from '../services/ai/prompts';
import { parseActions, determineStage, calculateLeadScore } from '../services/sales-engine';
import { saveConversation, getConversation } from '../services/firebase';
import { ChatRequest, ChatResponse, ConversationState } from '../types';

const router = Router();

// In-memory store as fallback when Firebase isn't configured
const conversations = new Map<string, ConversationState>();

function getOrCreateConversation(id?: string): ConversationState {
  const conversationId = id || uuidv4();
  const existing = conversations.get(conversationId);
  if (existing) return existing;

  const state: ConversationState = {
    id: conversationId,
    messages: [],
    stage: 'greeting',
    leadScore: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  conversations.set(conversationId, state);
  return state;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, conversationId } = req.body as ChatRequest;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Get or create conversation
    let state = getOrCreateConversation(conversationId);

    // Try to load from Firebase if we have an ID
    if (conversationId) {
      const fbState = await getConversation(conversationId);
      if (fbState) {
        state = fbState;
        conversations.set(conversationId, state);
      }
    }

    // Add user message
    state.messages.push({ role: 'user', content: message });

    // Determine conversation stage
    state.stage = determineStage(state.messages);

    // Build system prompt for current stage
    const systemPrompt = buildSystemPrompt(state.stage);

    // Get AI response
    const provider = getAIProvider();
    const rawResponse = await provider.generateResponse(state.messages, systemPrompt);

    // Parse actions from response
    const { cleanMessage, actions } = parseActions(rawResponse);

    // Add assistant message
    state.messages.push({ role: 'assistant', content: cleanMessage });

    // Update lead score
    state.leadScore = calculateLeadScore(state.messages);
    state.updatedAt = Date.now();

    // Persist to Firebase (async, don't block response)
    saveConversation(state).catch((err) =>
      console.error('Failed to save conversation:', err)
    );

    const response: ChatResponse = {
      message: cleanMessage,
      actions,
      conversationId: state.id,
      stage: state.stage,
    };

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const state = conversations.get(id) || (await getConversation(id));

  if (!state) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  res.json(state);
});

export default router;
