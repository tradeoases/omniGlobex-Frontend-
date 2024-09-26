import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMessages, sendMessage } from '../service/chatService';
import '../styles/chatbot.css';
import robotIcon from './robot-icon.svg'; 

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);  

  const quickReplies = ["What is your refund policy?", "How do I contact support?", "What services do you offer?"];

  const { data: fetchedMessages, isLoading: isMessagesLoading, error: fetchError } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    enabled: isOpen,
  });

  const { mutate: sendMessage, status: messageStatus } = useMutation({
    mutationFn: async (message: string) => {
      const { data } = await axios.post('https://api.chatbot.com/query', { message }, {
        headers: {
          Authorization: 'Bearer Bsk5nUn5qhSww0l07obNUyYG_KaafSVF',
          'Content-Type': 'application/json',
        },
      });
      return data.response;
    },
    onSuccess: (botResponse) => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'bot', text: botResponse },
      ]);
      setInput('');  
      setIsTyping(false);  
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Failed to send message. Please try again.' }
      ]);
      setIsTyping(false);  
    }
  });

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Please enter a message.' },
      ]);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
          <MessageCircle size={24} color="white" />
        </div>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <img src={AvatarIcon} alt="Chatbot Avatar" />
            <h4>Omni - Your Professional Assistant</h4>
            <button onClick={() => setIsOpen(false)}><X size={24} /></button>
          </div>

          <div className="chat-body">
            {!conversationStarted ? (
              <button className="start-conversation" onClick={startConversation}>
                Start Conversation
              </button>
            ) : (
              <>
                {isMessagesLoading && <p className="loading">Loading conversation...</p>}
                {fetchError && <p className="error">Failed to load messages. Please try again.</p>}

                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    {msg.sender === 'bot' && (
                      <img src={AvatarIcon} alt="Bot Avatar" className="bot-avatar" />
                    )}
                    <div className="message-content">{msg.text}</div>
                  </div>
                ))}

            {messageStatus === 'pending' && <div className="loading">Loading...</div>}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend} disabled={messageStatus === 'pending'}>
              {messageStatus === 'pending' ? 'Sending...' : 'Send'}
            </button>
          </div>

          {conversationStarted && (
            <div className="feedback">
              <button onClick={() => handleFeedback('up')}>
                <ThumbsUp />
              </button>
              <button onClick={() => handleFeedback('down')}>
                <ThumbsDown />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;