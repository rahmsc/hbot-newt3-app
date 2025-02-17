'use client';

import { useChat } from 'ai/react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ChatWindowProps {
  onClose: () => void;
}

function formatMessageContent(content: string) {
  // Regular expression to match [Study Title](STUDY_ID:number)
  const linkRegex = /\[(.*?)\]\(STUDY_ID:(\d+)\)/g;
  const parts = [];
  let lastIndex = 0;
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let match;

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    // Add the linked study
    parts.push(
      <Link
        key={match.index}
        href={`/research/${match[2]}`}
        className="text-emerald-600 hover:underline"
      >
        {match[1]}
      </Link>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.length ? parts : content;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    id: 'hbot-chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I can help you find information about HBOT studies. What would you like to know?'
      }
    ],
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      console.log('Chat finished:', message);
    },
  });

  const onSubmitWrapper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting message:', input);
    handleSubmit(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-96 rounded-lg bg-white shadow-xl"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-emerald-700 p-4">
        <h3 className="text-lg font-semibold text-white">HBOT AI Assistant</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-white hover:bg-emerald-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`rounded-lg p-3 ${
                  m.role === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {m.role === 'user' ? m.content : formatMessageContent(m.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-emerald-700">...</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={onSubmitWrapper} className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about HBOT..."
            className="flex-1 rounded-full border px-4 py-2 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
      {error && (
        <div className="p-4 text-red-500">
          Error: {error.message}
        </div>
      )}
    </motion.div>
  );
} 