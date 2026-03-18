import { ChatMessage } from '../../types';
import ActionButton from '../Actions/ActionButton';

interface Props {
  message: ChatMessage;
  onAction?: (type: string) => void;
}

export default function MessageBubble({ message, onAction }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 px-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">A</span>
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'ml-auto' : ''}`}>
        {/* Message */}
        <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((action, i) => (
              <ActionButton
                key={i}
                action={action}
                onClick={() => onAction?.(action.type)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
