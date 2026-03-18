import { config } from '../../config';
import { AIProvider } from '../../types';
import { ClaudeProvider } from './claude';
import { OpenAIProvider } from './openai';

let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (provider) return provider;

  switch (config.aiProvider) {
    case 'claude':
      provider = new ClaudeProvider();
      break;
    case 'openai':
      provider = new OpenAIProvider();
      break;
    default:
      throw new Error(`Unknown AI provider: ${config.aiProvider}`);
  }

  console.log(`AI Provider: ${config.aiProvider}`);
  return provider;
}
