import { useState, useCallback } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Landing/Hero';
import ChatWindow from './components/Chat/ChatWindow';
import LeadCaptureModal from './components/Actions/LeadCaptureModal';
import BookDemoModal from './components/Actions/BookDemoModal';
import { useChat } from './hooks/useChat';
import { submitLead, bookDemo } from './services/api';

type ModalType = 'none' | 'lead' | 'demo' | 'checkout_success';

export default function App() {
  const { messages, isLoading, error, conversationId, send } = useChat();
  const [modal, setModal] = useState<ModalType>('none');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAction = useCallback((type: string) => {
    switch (type) {
      case 'book_demo':
        setModal('demo');
        break;
      case 'capture_lead':
        setModal('lead');
        break;
      case 'checkout':
        setModal('lead'); // For now, use lead capture as checkout step
        break;
    }
  }, []);

  const handleLeadSubmit = async (data: { name: string; email: string; phone: string }) => {
    try {
      await submitLead({ ...data, conversationId: conversationId || undefined });
      setModal('none');
      setSuccessMessage('Thanks! We\'ll be in touch soon.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch {
      setSuccessMessage('Something went wrong. Please try again.');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleDemoSubmit = async (data: { name: string; email: string; preferredDate: string }) => {
    try {
      await bookDemo({ ...data, conversationId: conversationId || undefined });
      setModal('none');
      setSuccessMessage('Demo requested! We\'ll confirm within 24 hours.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch {
      setSuccessMessage('Something went wrong. Please try again.');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero */}
            <Hero />

            {/* Right: Chat */}
            <div className="relative">
              {successMessage && (
                <div className="absolute -top-12 left-0 right-0 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm text-center z-10">
                  {successMessage}
                </div>
              )}
              <ChatWindow
                messages={messages}
                isLoading={isLoading}
                error={error}
                onSend={send}
                onAction={handleAction}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {modal === 'lead' && (
        <LeadCaptureModal onSubmit={handleLeadSubmit} onClose={() => setModal('none')} />
      )}
      {modal === 'demo' && (
        <BookDemoModal onSubmit={handleDemoSubmit} onClose={() => setModal('none')} />
      )}
    </div>
  );
}
