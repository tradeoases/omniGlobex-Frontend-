import React, { useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/chatbot.css';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const { mutate: sendMessage, status }: UseMutationResult<string, Error, string, unknown> = useMutation({
    mutationFn: async (message: string) => {
      try {
        const { data } = await axios.post('https://api.chatbot.com/query', { message }, {
          headers: {
            Authorization: 'Bearer Bsk5nUn5qhSww0l07obNUyYG_KaafSVF',
            'Content-Type': 'application/json',
          },
        });
        return data.response;
      } catch (error) {
        throw new Error('Error sending message');
      }
    },
    onSuccess: (botResponse) => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'bot', text: botResponse },
      ]);
      setInput('');
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    },
  });

  const toggleChat = () => setIsOpen(!isOpen);

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
      <div className="chatbot-toggle" onClick={toggleChat}>
        <img src="/chat-icon.svg" alt="Chat" className="chat-icon" />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with Us</h4>
            <button onClick={toggleChat}>&times;</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {status === 'pending' && <div className="loading">Loading...</div>}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
