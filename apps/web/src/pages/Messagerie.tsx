import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Send, Paperclip, Search } from 'lucide-react';

interface Conversation {
  id: string;
  partner: {
    id: string;
    nom: string;
    prenom: string;
    specialites: string[];
  };
  lastMessage: {
    contenu: string;
    createdAt: string;
  };
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  contenu: string;
  createdAt: string;
  sender: {
    nom: string;
    prenom: string;
  };
}

export const Messagerie: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API calls
  const conversations: Conversation[] = [];
  const messages: Message[] = [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // TODO: Send message via API
    setMessageText('');
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r border-primary-200 flex flex-col">
          <div className="p-4 border-b border-primary-200">
            <h2 className="text-lg font-semibold text-primary-900 mb-3">
              Messagerie
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-primary-600">
                <p>Aucune conversation</p>
                <p className="text-sm mt-2">
                  Commencez une conversation depuis l'annuaire ou un adressage
                </p>
              </div>
            ) : (
              <div className="divide-y divide-primary-100">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.partner.id)}
                    className={`w-full p-4 text-left hover:bg-primary-50 transition-colors ${
                      selectedConversation === conversation.partner.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-primary-900">
                        Dr {conversation.partner.prenom} {conversation.partner.nom}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-primary-600 mb-1">
                      {conversation.partner.specialites.join(', ')}
                    </p>
                    <p className="text-sm text-primary-700 truncate">
                      {conversation.lastMessage.contenu}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-primary-50">
          {selectedConversation ? (
            <>
              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-primary-600 mt-8">
                    Aucun message dans cette conversation
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'current-user-id' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'current-user-id'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-primary-900'
                        }`}
                      >
                        <p className="text-sm">{message.contenu}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.createdAt).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-primary-200">
                <div className="flex items-end space-x-2">
                  <button className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Tapez votre message..."
                    className="flex-1 px-4 py-2 border border-primary-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="btn btn-primary px-4 py-2"
                    disabled={!messageText.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-primary-600">
              <div className="text-center">
                <p className="text-lg">Sélectionnez une conversation</p>
                <p className="text-sm mt-2">
                  Choisissez une conversation dans la liste pour commencer à échanger
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
