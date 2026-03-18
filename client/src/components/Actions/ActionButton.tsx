import { ChatAction } from '../../types';

interface Props {
  action: ChatAction;
  onClick: () => void;
}

const ACTION_STYLES: Record<string, { bg: string; icon: string }> = {
  book_demo: { bg: 'bg-emerald-500 hover:bg-emerald-600', icon: '📞' },
  capture_lead: { bg: 'bg-blue-500 hover:bg-blue-600', icon: '💬' },
  checkout: { bg: 'bg-purple-500 hover:bg-purple-600', icon: '🎓' },
  link: { bg: 'bg-gray-600 hover:bg-gray-700', icon: '🔗' },
};

export default function ActionButton({ action, onClick }: Props) {
  const style = ACTION_STYLES[action.type] || ACTION_STYLES.link;

  return (
    <button
      onClick={onClick}
      className={`${style.bg} text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors
                  flex items-center gap-2 shadow-sm`}
    >
      <span>{style.icon}</span>
      <span>{action.label}</span>
    </button>
  );
}
